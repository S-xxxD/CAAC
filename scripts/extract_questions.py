from __future__ import annotations

import argparse
import hashlib
import json
import re
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path

from docx import Document


QUESTION_RE = re.compile(r"^(\d+)[.．、](.*)$")
OPTION_RE = re.compile(r"^([A-C])[.．、](.*)$", re.IGNORECASE)
ANSWER_RE = re.compile(r"^参考答案\s*[：:]\s*([A-C])\s*$", re.IGNORECASE)


@dataclass(frozen=True)
class SourceSpec:
    filename: str
    bank: str
    chapter_id: str
    chapter: str
    chapter_order: int
    section: str


SOURCES = (
    SourceSpec("第一章 概述.docx", "theory", "overview", "第一章 概述", 1, "第一章 概述"),
    SourceSpec(
        "第二章 系统组成及介绍.docx",
        "theory",
        "systems",
        "第二章 系统组成及介绍",
        2,
        "第二章 系统组成及介绍",
    ),
    SourceSpec(
        "第三章 飞行原理与性能.docx",
        "theory",
        "principles",
        "第三章 飞行原理与性能",
        3,
        "第三章 飞行原理与性能",
    ),
    SourceSpec("第四章 气象（一）.docx", "theory", "weather", "第四章 气象", 4, "气象（一）"),
    SourceSpec("第四章 气象（二）.docx", "theory", "weather", "第四章 气象", 4, "气象（二）"),
    SourceSpec(
        "第五章 空中交通管制.docx",
        "theory",
        "atc",
        "第五章 空中交通管制",
        5,
        "第五章 空中交通管制",
    ),
    SourceSpec("第六章 法律法规.docx", "theory", "regulations", "第六章 法律法规", 6, "第六章 法律法规"),
    SourceSpec("第七章 起降操纵.docx", "theory", "operations", "第七章 起降操纵", 7, "第七章 起降操纵"),
    SourceSpec("第八章 多旋翼.docx", "theory", "multirotor", "第八章 多旋翼", 8, "第八章 多旋翼"),
    SourceSpec("第九章 飞行手册.docx", "theory", "manual", "第九章 飞行手册", 9, "第九章 飞行手册"),
    SourceSpec(
        "机长综合问答题库.docx",
        "comprehensive",
        "comprehensive",
        "综合问答",
        10,
        "机长综合问答题库",
    ),
)


def compact(text: str) -> str:
    return "".join(text.split()).lower()


def digest(*parts: str, length: int = 16) -> str:
    payload = "\x1f".join(compact(part) for part in parts)
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()[:length]


def parse_source(source_dir: Path, spec: SourceSpec) -> list[dict]:
    path = source_dir / spec.filename
    if not path.exists():
        raise FileNotFoundError(f"Missing source document: {path}")

    lines = [paragraph.text.strip() for paragraph in Document(path).paragraphs if paragraph.text.strip()]
    if not lines:
        raise ValueError(f"Empty source document: {path}")

    body = lines[1:]
    if len(body) % 5 != 0:
        raise ValueError(f"{spec.filename}: expected groups of 5 lines, got {len(body)} lines")

    questions: list[dict] = []
    for offset in range(0, len(body), 5):
        stem_line, *tail = body[offset : offset + 5]
        option_lines = tail[:3]
        answer_line = tail[3]

        stem_match = QUESTION_RE.match(stem_line)
        option_matches = [OPTION_RE.match(line) for line in option_lines]
        answer_match = ANSWER_RE.match(answer_line)

        if not stem_match or any(match is None for match in option_matches) or not answer_match:
            block = " | ".join(body[offset : offset + 5])
            raise ValueError(f"{spec.filename} line {offset + 2}: malformed question block: {block}")

        source_number = int(stem_match.group(1))
        stem = stem_match.group(2).strip()
        options = {
            match.group(1).upper(): match.group(2).strip()
            for match in option_matches
            if match is not None
        }
        answer = answer_match.group(1).upper()
        content_fingerprint = digest(stem, *(options[key] for key in ("A", "B", "C")))
        question_id = f"q-{digest(spec.filename, str(source_number), stem, length=18)}"

        questions.append(
            {
                "id": question_id,
                "bank": spec.bank,
                "chapterId": spec.chapter_id,
                "chapter": spec.chapter,
                "chapterOrder": spec.chapter_order,
                "section": spec.section,
                "sourceFile": spec.filename,
                "sourceNumber": source_number,
                "stem": stem,
                "options": options,
                "answer": answer,
                "explanation": None,
                "fingerprint": content_fingerprint,
            }
        )

    expected_numbers = list(range(1, len(questions) + 1))
    actual_numbers = [question["sourceNumber"] for question in questions]
    if actual_numbers != expected_numbers:
        raise ValueError(f"{spec.filename}: question numbering is not sequential")

    return questions


def build_report(questions: list[dict]) -> dict:
    chapter_counts = Counter(question["chapter"] for question in questions)
    source_counts = Counter(question["sourceFile"] for question in questions)
    answer_counts = Counter(question["answer"] for question in questions)

    by_stem: dict[str, list[dict]] = defaultdict(list)
    by_fingerprint: dict[str, list[dict]] = defaultdict(list)
    for question in questions:
        by_stem[compact(question["stem"])].append(question)
        by_fingerprint[question["fingerprint"]].append(question)

    repeated_stems = [group for group in by_stem.values() if len(group) > 1]
    variant_stems = [
        group
        for group in repeated_stems
        if len({question["fingerprint"] for question in group}) > 1
    ]
    exact_content_duplicates = [group for group in by_fingerprint.values() if len(group) > 1]

    return {
        "valid": True,
        "totals": {
            "all": len(questions),
            "theory": sum(question["bank"] == "theory" for question in questions),
            "comprehensive": sum(question["bank"] == "comprehensive" for question in questions),
        },
        "chapterCounts": dict(chapter_counts),
        "sourceCounts": dict(source_counts),
        "answerCounts": dict(answer_counts),
        "quality": {
            "questionsWithThreeOptions": sum(len(question["options"]) == 3 for question in questions),
            "questionsWithValidAnswer": sum(question["answer"] in question["options"] for question in questions),
            "repeatedStemGroups": len(repeated_stems),
            "variantStemGroups": len(variant_stems),
            "exactContentDuplicateGroups": len(exact_content_duplicates),
        },
        "variantStemExamples": [
            {
                "stem": group[0]["stem"],
                "records": [
                    {
                        "id": question["id"],
                        "sourceFile": question["sourceFile"],
                        "sourceNumber": question["sourceNumber"],
                        "answer": question["answer"],
                    }
                    for question in group
                ],
            }
            for group in variant_stems
        ],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract CAAC questions from the source DOCX files.")
    project_dir = Path(__file__).resolve().parents[1]
    default_source = project_dir.parent / "743机长理论+综合问答"
    parser.add_argument("--source", type=Path, default=default_source)
    parser.add_argument("--out", type=Path, default=project_dir / "data" / "questions.json")
    parser.add_argument("--report", type=Path, default=project_dir / "data" / "validation-report.json")
    args = parser.parse_args()

    questions: list[dict] = []
    for spec in SOURCES:
        questions.extend(parse_source(args.source, spec))

    report = build_report(questions)
    expected = {"all": 922, "theory": 743, "comprehensive": 179}
    if report["totals"] != expected:
        raise ValueError(f"Unexpected totals: {report['totals']} (expected {expected})")

    payload = {
        "meta": {
            "title": "CAAC 视距内无人机题库",
            "version": "2026.07",
            "total": report["totals"]["all"],
            "theoryTotal": report["totals"]["theory"],
            "comprehensiveTotal": report["totals"]["comprehensive"],
            "optionKeys": ["A", "B", "C"],
        },
        "questions": questions,
    }

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.report.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(report["totals"], ensure_ascii=False))
    print(f"Wrote {args.out}")
    print(f"Wrote {args.report}")


if __name__ == "__main__":
    main()

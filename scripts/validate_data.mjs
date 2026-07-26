import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const payload = JSON.parse(await readFile(path.join(projectDir, "data", "questions.json"), "utf8"));
const questions = payload.questions;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(payload.meta.total === 922, `Expected meta total 922, got ${payload.meta.total}`);
assert(questions.length === 922, `Expected 922 questions, got ${questions.length}`);
assert(questions.filter((question) => question.bank === "theory").length === 743, "Theory total mismatch");
assert(questions.filter((question) => question.bank === "comprehensive").length === 179, "Comprehensive total mismatch");
assert(new Set(questions.map((question) => question.id)).size === questions.length, "Question IDs are not unique");
assert(questions.every((question) => Object.keys(question.options).join("") === "ABC"), "Invalid option set");
assert(questions.every((question) => question.answer in question.options), "Invalid answer key");
assert(questions.every((question) => question.stem && question.sourceFile && question.sourceNumber), "Missing question metadata");

const expectedChapters = new Map([
  ["overview", 50],
  ["systems", 75],
  ["principles", 145],
  ["weather", 169],
  ["atc", 24],
  ["regulations", 46],
  ["operations", 111],
  ["multirotor", 92],
  ["manual", 31],
  ["comprehensive", 179],
]);

for (const [chapterId, expected] of expectedChapters) {
  const actual = questions.filter((question) => question.chapterId === chapterId).length;
  assert(actual === expected, `${chapterId}: expected ${expected}, got ${actual}`);
}

console.log(`Validated ${questions.length} questions across ${expectedChapters.size} sections.`);

const DATA_URL = "./data/questions.json";
const STORAGE_KEY = "caac-trainer-state-v1";
const STATE_VERSION = 1;

const ICONS = {
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  "book-open": '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>',
  "clipboard-check": '<rect width="14" height="18" x="5" y="3" rx="2"/><path d="M9 3V1h6v2"/><path d="m9 13 2 2 4-4"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>',
  settings: '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.55V21h-4v-.08A1.7 1.7 0 0 0 8.97 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.52-1.03H3v-4h.08A1.7 1.7 0 0 0 4.6 8.94a1.7 1.7 0 0 0-.34-1.88L4.2 7l2.83-2.83.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 10 3.05V3h4v.08a1.7 1.7 0 0 0 1.03 1.52 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 7l-.06.06a1.7 1.7 0 0 0-.34 1.88A1.7 1.7 0 0 0 20.92 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/>',
  download: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/>',
  upload: '<path d="M12 21V9"/><path d="m7 14 5-5 5 5"/><path d="M5 3h14"/>',
  play: '<path d="m7 4 13 8-13 8z"/>',
  shuffle: '<path d="M16 3h5v5"/><path d="M4 20 21 3"/><path d="M21 16v5h-5"/><path d="m15 15 6 6"/><path d="m4 4 5 5"/>',
  arrowLeft: '<path d="m15 18-6-6 6-6"/>',
  arrowRight: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="m6 6 12 12"/><path d="m18 6-12 12"/>',
  star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"/>',
  starFill: '<path fill="currentColor" d="m12 2 3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V3h8v3"/><path d="m19 6-1 15H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  rotate: '<path d="M20 11a8 8 0 1 0-2.34 5.66"/><path d="M20 4v7h-7"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v2"/><path d="M21 12h-2"/><path d="M12 21v-2"/><path d="M3 12h2"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  flag: '<path d="M5 21V4"/><path d="M5 4h11l-1 4 1 4H5"/>',
  award: '<circle cx="12" cy="8" r="5"/><path d="M8.6 12 7 22l5-3 5 3-1.6-10"/>',
  alert: '<path d="M10.3 3.6 2.4 18a2 2 0 0 0 1.75 3h15.7a2 2 0 0 0 1.75-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
};

function icon(name, label = "") {
  const title = label ? `<title>${escapeHtml(label)}</title>` : "";
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${title}${ICONS[name] || ""}</svg>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    element.innerHTML = icon(element.dataset.icon);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function defaultState() {
  return {
    version: STATE_VERSION,
    progress: {},
    mistakes: {},
    favorites: [],
    daily: {},
    history: [],
    examHistory: [],
    currentSession: null,
    settings: {
      autoNextCorrect: false,
    },
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      progress: parsed.progress || {},
      mistakes: parsed.mistakes || {},
      favorites: Array.isArray(parsed.favorites) ? parsed.favorites : [],
      daily: parsed.daily || {},
      history: Array.isArray(parsed.history) ? parsed.history : [],
      examHistory: Array.isArray(parsed.examHistory) ? parsed.examHistory : [],
      settings: { ...defaultState().settings, ...(parsed.settings || {}) },
    };
  } catch (error) {
    console.error("Failed to load state", error);
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
}

function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function percent(value, total) {
  return total ? Math.round((value / total) * 100) : 0;
}

function formatNumber(value) {
  return new Intl.NumberFormat("zh-CN").format(value || 0);
}

function getFavoriteSet() {
  return new Set(userState.favorites);
}

let data = null;
let questions = [];
let byId = new Map();
let chapters = [];
let userState = loadState();
let activeView = "home";
let reviewTab = "mistakes";
let reviewQuery = "";
let lastPracticeResult = null;
let lastExamResult = null;
let examTimer = null;
let deferredInstallPrompt = null;
let toastTimer = null;
let pendingPractice = null;
let pendingExamConfig = null;

const viewRoot = document.querySelector("#view-root");
const dialog = document.querySelector("#app-dialog");
const dialogContent = document.querySelector("#dialog-content");
const importInput = document.querySelector("#import-file");

function deriveChapters() {
  const chapterMap = new Map();
  for (const question of questions) {
    if (!chapterMap.has(question.chapterId)) {
      chapterMap.set(question.chapterId, {
        id: question.chapterId,
        name: question.chapter,
        order: question.chapterOrder,
        bank: question.bank,
        questions: [],
      });
    }
    chapterMap.get(question.chapterId).questions.push(question);
  }
  chapters = [...chapterMap.values()].sort((a, b) => a.order - b.order);
}

function progressFor(questionIds) {
  let attempted = 0;
  let attempts = 0;
  let correct = 0;
  for (const id of questionIds) {
    const record = userState.progress[id];
    if (!record) continue;
    attempted += 1;
    attempts += record.attempts || 0;
    correct += record.correct || 0;
  }
  return {
    attempted,
    attempts,
    correct,
    accuracy: percent(correct, attempts),
  };
}

function overallStats() {
  return progressFor(questions.map((question) => question.id));
}

function computeStreak() {
  let streak = 0;
  const cursor = new Date();
  while (true) {
    const day = userState.daily[todayKey(cursor)];
    if (!day || !day.answered) break;
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function recordAnswer(question, selected, context) {
  const isCorrect = selected === question.answer;
  const current = userState.progress[question.id] || {
    attempts: 0,
    correct: 0,
    wrong: 0,
  };
  current.attempts += 1;
  current.correct += isCorrect ? 1 : 0;
  current.wrong += isCorrect ? 0 : 1;
  current.lastSelected = selected;
  current.lastAt = new Date().toISOString();
  userState.progress[question.id] = current;

  if (!isCorrect) {
    const mistake = userState.mistakes[question.id] || { count: 0 };
    mistake.count += 1;
    mistake.lastSelected = selected;
    mistake.lastAt = current.lastAt;
    userState.mistakes[question.id] = mistake;
  } else if (context === "mistakes") {
    delete userState.mistakes[question.id];
  }

  const dayKey = todayKey();
  const day = userState.daily[dayKey] || { answered: 0, correct: 0 };
  day.answered += 1;
  day.correct += isCorrect ? 1 : 0;
  userState.daily[dayKey] = day;
  userState.history.push({ id: question.id, correct: isCorrect, at: current.lastAt, context });
  userState.history = userState.history.slice(-2000);
  return isCorrect;
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function closeDialog() {
  if (dialog.open) dialog.close();
}

function showConfirm({ title, body, action, actionLabel, danger = false }) {
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <div class="dialog-head">
        <h2>${escapeHtml(title)}</h2>
        <button class="small-icon-button" type="button" data-action="close-dialog" aria-label="关闭" title="关闭">${icon("x")}</button>
      </div>
      <p>${escapeHtml(body)}</p>
      <div class="button-row">
        <button class="secondary-button" type="button" data-action="close-dialog">取消</button>
        <button class="${danger ? "danger-button" : "primary-button"}" type="button" data-action="${escapeHtml(action)}">${escapeHtml(actionLabel)}</button>
      </div>
    </div>`;
  dialog.showModal();
}

function setActiveNav(view) {
  const mainView = ["home", "practice", "exam", "review", "stats", "settings"].includes(view)
    ? view
    : "home";
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === mainView);
  });
}

function navigate(view, updateHash = true) {
  activeView = view;
  setActiveNav(view);
  if (updateHash) history.replaceState(null, "", `#${view}`);
  renderView();
  window.scrollTo({ top: 0, behavior: "instant" });
  requestAnimationFrame(() => viewRoot.focus({ preventScroll: true }));
}

function renderView() {
  clearInterval(examTimer);
  examTimer = null;
  if (!data) return;

  switch (activeView) {
    case "practice":
      if (userState.currentSession?.type === "practice") renderPracticeQuestion();
      else if (lastPracticeResult) renderPracticeResult();
      else renderPracticeCatalog();
      break;
    case "exam":
      if (userState.currentSession?.type === "exam") renderExamQuestion();
      else if (lastExamResult) renderExamResult();
      else renderExamSetup();
      break;
    case "review":
      renderReview();
      break;
    case "stats":
      renderStats();
      break;
    case "settings":
      renderSettings();
      break;
    default:
      renderHome();
  }
}

function chapterCard(chapter, compact = false) {
  const ids = chapter.questions.map((question) => question.id);
  const stats = progressFor(ids);
  const completion = percent(stats.attempted, ids.length);
  const indexLabel = chapter.bank === "comprehensive" ? "综合" : String(chapter.order).padStart(2, "0");
  return `
    <article class="chapter-card">
      <div class="chapter-index ${chapter.bank === "comprehensive" ? "is-comprehensive" : ""}">${indexLabel}</div>
      <div class="chapter-copy">
        <h3>${escapeHtml(chapter.name)}</h3>
        <div class="chapter-meta"><span>${stats.attempted}/${ids.length} 已练</span><span>${stats.accuracy}% 正确率</span></div>
        <div class="progress-track" aria-label="完成度 ${completion}%"><div class="progress-fill" style="width:${completion}%"></div></div>
      </div>
      <div class="chapter-actions">
        <button class="small-icon-button" type="button" data-action="start-chapter" data-chapter="${chapter.id}" data-random="true" aria-label="随机练习 ${escapeHtml(chapter.name)}" title="随机练习">${icon("shuffle")}</button>
        <button class="small-icon-button" type="button" data-action="start-chapter" data-chapter="${chapter.id}" aria-label="开始 ${escapeHtml(chapter.name)}" title="开始练习">${icon("play")}</button>
      </div>
    </article>`;
}

function renderHome() {
  const stats = overallStats();
  const today = userState.daily[todayKey()] || { answered: 0, correct: 0 };
  const streak = computeStreak();
  const mistakeCount = Object.keys(userState.mistakes).length;
  const current = userState.currentSession;
  const continueLabel = current ? (current.type === "exam" ? "继续考试" : "继续练习") : "开始章节练习";
  const continueAction = current ? "continue-session" : "open-practice";

  viewRoot.innerHTML = `
    <div class="page-shell">
      <section class="overview-band" aria-labelledby="home-title">
        <div class="overview-copy">
          <span class="eyebrow">题库版本 ${escapeHtml(data.meta.version)} · 本地保存</span>
          <h1 id="home-title">今天再飞一组，把薄弱项压下去</h1>
          <p>共 ${formatNumber(data.meta.total)} 道题，当前已覆盖 ${stats.attempted} 道。</p>
          <div class="hero-actions">
            <button class="primary-button" type="button" data-action="${continueAction}">${icon("play")}<span>${continueLabel}</span></button>
            ${mistakeCount ? `<button class="secondary-button" type="button" data-action="start-mistake-review">${icon("rotate")}<span>复习 ${mistakeCount} 道错题</span></button>` : ""}
          </div>
        </div>
      </section>

      <section class="metric-strip" aria-label="学习概况">
        <article class="metric-card"><span>题库进度</span><strong>${percent(stats.attempted, questions.length)}%</strong><small>${stats.attempted} / ${questions.length} 道</small></article>
        <article class="metric-card"><span>累计正确率</span><strong>${stats.accuracy}%</strong><small>${stats.attempts} 次作答</small></article>
        <article class="metric-card"><span>今日完成</span><strong>${today.answered}</strong><small>${today.correct} 次答对</small></article>
        <article class="metric-card"><span>连续学习</span><strong>${streak}</strong><small>天</small></article>
      </section>

      <section>
        <div class="section-heading">
          <div><h2>章节进度</h2><p>理论题与综合问答分开记录</p></div>
          <button class="quiet-button" type="button" data-action="open-practice">全部练习 ${icon("arrowRight")}</button>
        </div>
        <div class="chapter-grid">${chapters.map((chapter) => chapterCard(chapter)).join("")}</div>
      </section>
    </div>`;
}

function renderPracticeCatalog() {
  const theoryQuestions = questions.filter((question) => question.bank === "theory");
  const comprehensive = questions.filter((question) => question.bank === "comprehensive");
  const mistakeCount = Object.keys(userState.mistakes).length;
  const favoriteCount = userState.favorites.length;

  viewRoot.innerHTML = `
    <div class="page-shell">
      <div class="page-heading">
        <div><h1>章节练习</h1><p>理论 ${theoryQuestions.length} 道 · 综合问答 ${comprehensive.length} 道</p></div>
      </div>
      <section class="practice-catalog" aria-label="快捷练习">
        <article class="practice-card">
          <span class="catalog-icon">${icon("target")}</span>
          <h2>理论题随机练习</h2><p>${theoryQuestions.length} 道</p>
          <div class="button-row"><button class="primary-button" type="button" data-action="start-theory-random">${icon("shuffle")}随机开始</button></div>
        </article>
        <article class="practice-card">
          <span class="catalog-icon">${icon("book-open")}</span>
          <h2>综合问答</h2><p>${comprehensive.length} 道</p>
          <div class="button-row"><button class="primary-button" type="button" data-action="start-comprehensive">${icon("play")}顺序开始</button></div>
        </article>
        <article class="practice-card">
          <span class="catalog-icon">${icon("rotate")}</span>
          <h2>错题强化</h2><p>${mistakeCount} 道待复习 · ${favoriteCount} 道收藏</p>
          <div class="button-row"><button class="secondary-button" type="button" data-action="start-mistake-review" ${mistakeCount ? "" : "disabled"}>${icon("rotate")}开始复习</button></div>
        </article>
      </section>

      <section style="margin-top:34px">
        <div class="section-heading"><div><h2>按章节练习</h2><p>从第一道未完成题开始</p></div></div>
        <div class="chapter-grid">${chapters.map((chapter) => chapterCard(chapter, true)).join("")}</div>
      </section>
    </div>`;
}

function startPractice(questionList, title, { random = false, context = "practice", force = false } = {}) {
  if (!questionList.length) {
    showToast("当前没有可练习的题目");
    return;
  }
  if (userState.currentSession?.type === "exam" && !force) {
    pendingPractice = {
      ids: questionList.map((question) => question.id),
      title,
      random,
      context,
    };
    showConfirm({
      title: "结束当前考试",
      body: "开始新的练习将结束尚未提交的模拟考试。",
      action: "confirm-practice-over-exam",
      actionLabel: "结束并开始练习",
      danger: true,
    });
    return;
  }
  const pool = random ? shuffle(questionList) : [...questionList];
  let startIndex = 0;
  if (!random && context === "practice") {
    const firstUnseen = pool.findIndex((question) => !userState.progress[question.id]);
    startIndex = firstUnseen >= 0 ? firstUnseen : 0;
  }
  userState.currentSession = {
    type: "practice",
    title,
    poolIds: pool.map((question) => question.id),
    index: startIndex,
    answers: {},
    context,
    random,
    startedAt: new Date().toISOString(),
  };
  lastPracticeResult = null;
  saveState();
  navigate("practice");
}

function currentQuestion() {
  const session = userState.currentSession;
  if (!session) return null;
  return byId.get(session.poolIds[session.index]);
}

function renderPracticeQuestion() {
  const session = userState.currentSession;
  const question = currentQuestion();
  if (!session || !question) {
    userState.currentSession = null;
    saveState();
    renderPracticeCatalog();
    return;
  }

  const answerRecord = session.answers[question.id];
  const selected = answerRecord?.selected;
  const isAnswered = Boolean(answerRecord);
  const isFavorite = getFavoriteSet().has(question.id);
  const progressValue = percent(session.index + 1, session.poolIds.length);
  const options = ["A", "B", "C"].map((key) => {
    let stateClass = "";
    let stateIcon = "";
    if (isAnswered && key === question.answer) {
      stateClass = "is-correct";
      stateIcon = icon("check");
    } else if (isAnswered && key === selected && selected !== question.answer) {
      stateClass = "is-wrong";
      stateIcon = icon("x");
    }
    return `
      <button class="option-button ${stateClass}" type="button" data-action="choose-option" data-option="${key}" ${isAnswered ? "disabled" : ""}>
        <span class="option-key">${key}</span>
        <span class="option-text">${escapeHtml(question.options[key])}</span>
        <span class="option-state">${stateIcon}</span>
      </button>`;
  }).join("");

  const sourceLabel = question.section === question.chapter ? question.sourceFile : `${question.sourceFile} · ${question.section}`;
  const answerPanel = isAnswered
    ? `<div class="answer-panel ${answerRecord.correct ? "" : "is-wrong"}">
        <strong>${answerRecord.correct ? "回答正确" : `正确答案：${question.answer}`}</strong>
        <p>${escapeHtml(sourceLabel)} · 原题 ${question.sourceNumber}</p>
      </div>`
    : "";

  viewRoot.innerHTML = `
    <div class="narrow-shell question-shell">
      <div class="question-topline">
        <button class="icon-button" type="button" data-action="exit-session" aria-label="退出练习" title="退出练习">${icon("arrowLeft")}</button>
        <div class="question-topline-copy"><strong>${escapeHtml(session.title)}</strong><span>${session.index + 1} / ${session.poolIds.length}</span></div>
        <button class="icon-button" type="button" data-action="toggle-favorite" aria-label="${isFavorite ? "取消收藏" : "收藏题目"}" title="${isFavorite ? "取消收藏" : "收藏题目"}">${icon(isFavorite ? "starFill" : "star")}</button>
      </div>
      <div class="question-progress" aria-label="练习进度 ${progressValue}%"><span style="width:${progressValue}%"></span></div>
      <article class="question-panel">
        <div class="question-labels"><span class="question-tag">${escapeHtml(question.chapter)}</span><span class="question-number">题号 ${question.sourceNumber}</span></div>
        <h1 class="question-title">${escapeHtml(question.stem)}</h1>
        <div class="option-list">${options}</div>
        ${answerPanel}
      </article>
      <footer class="question-footer">
        <small>${isAnswered ? "已保存本次作答" : "选择后显示答案"}</small>
        <div class="question-actions">
          <button class="secondary-button" type="button" data-action="previous-question" ${session.index === 0 ? "disabled" : ""}>${icon("arrowLeft")}上一题</button>
          <button class="primary-button" type="button" data-action="next-question">${session.index === session.poolIds.length - 1 ? "完成" : "下一题"}${icon("arrowRight")}</button>
        </div>
      </footer>
    </div>`;
}

function choosePracticeOption(option) {
  const session = userState.currentSession;
  const question = currentQuestion();
  if (!session || !question || session.answers[question.id]) return;
  const correct = recordAnswer(question, option, session.context);
  session.answers[question.id] = { selected: option, correct };
  saveState();
  renderPracticeQuestion();
  if (correct && userState.settings.autoNextCorrect && session.index < session.poolIds.length - 1) {
    setTimeout(() => {
      if (userState.currentSession?.poolIds?.[userState.currentSession.index] === question.id) nextPracticeQuestion();
    }, 750);
  }
}

function previousPracticeQuestion() {
  const session = userState.currentSession;
  if (!session || session.index <= 0) return;
  session.index -= 1;
  saveState();
  renderPracticeQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function nextPracticeQuestion() {
  const session = userState.currentSession;
  if (!session) return;
  if (session.index < session.poolIds.length - 1) {
    session.index += 1;
    saveState();
    renderPracticeQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  lastPracticeResult = session;
  userState.currentSession = null;
  saveState();
  renderPracticeResult();
}

function renderPracticeResult() {
  const result = lastPracticeResult;
  if (!result) {
    renderPracticeCatalog();
    return;
  }
  const answerRecords = Object.values(result.answers || {});
  const correct = answerRecords.filter((record) => record.correct).length;
  const answered = answerRecords.length;
  const score = percent(correct, answered);
  viewRoot.innerHTML = `
    <div class="narrow-shell">
      <section class="exam-summary">
        <div class="score-ring" style="--score-angle:${score * 3.6}deg"><div class="score-ring-inner"><div><strong>${score}%</strong><small>本组正确率</small></div></div></div>
        <div class="summary-copy">
          <h1>本组练习完成</h1>
          <p>${escapeHtml(result.title)}</p>
          <div class="summary-metrics">
            <div><span>题目</span><strong>${result.poolIds.length}</strong></div>
            <div><span>作答</span><strong>${answered}</strong></div>
            <div><span>答对</span><strong>${correct}</strong></div>
          </div>
          <div class="button-row">
            <button class="primary-button" type="button" data-action="repeat-practice">${icon("rotate")}再练一组</button>
            <button class="secondary-button" type="button" data-action="close-practice-result">返回章节</button>
          </div>
        </div>
      </section>
    </div>`;
}

function renderExamSetup() {
  viewRoot.innerHTML = `
    <div class="narrow-shell">
      <div class="page-heading"><div><h1>模拟考试</h1><p>答题过程中不显示正确答案</p></div></div>
      <div class="setup-grid">
        <section class="setup-section">
          <h2>组卷范围</h2><p>当前题库版本 ${escapeHtml(data.meta.version)}</p>
          <div class="field-group">
            <label class="field-label" for="exam-bank">题库</label>
            <select class="select-control" id="exam-bank">
              <option value="theory">理论题库（743）</option>
              <option value="comprehensive">综合问答（179）</option>
              <option value="all">全部题库（922）</option>
            </select>
          </div>
          <div class="field-group">
            <label class="field-label" for="exam-count">题量</label>
            <select class="select-control" id="exam-count">
              <option value="20">20 道</option>
              <option value="50" selected>50 道</option>
              <option value="100">100 道</option>
            </select>
          </div>
        </section>
        <section class="setup-section">
          <h2>考试设置</h2><p>时间结束后自动交卷</p>
          <div class="field-group">
            <label class="field-label" for="exam-minutes">答题时间</label>
            <select class="select-control" id="exam-minutes">
              <option value="30">30 分钟</option>
              <option value="60" selected>60 分钟</option>
              <option value="90">90 分钟</option>
            </select>
          </div>
          <div class="button-row" style="margin-top:28px">
            <button class="primary-button" type="button" data-action="start-exam">${icon("play")}开始考试</button>
          </div>
        </section>
      </div>
    </div>`;
}

function startExam(config = null, force = false) {
  const resolvedConfig = config || {
    bank: document.querySelector("#exam-bank")?.value || "theory",
    requestedCount: Number(document.querySelector("#exam-count")?.value || 50),
    minutes: Number(document.querySelector("#exam-minutes")?.value || 60),
  };
  if (userState.currentSession?.type === "practice" && !force) {
    pendingExamConfig = resolvedConfig;
    showConfirm({
      title: "结束当前练习",
      body: "开始模拟考试将结束当前练习组，已保存的作答记录不会丢失。",
      action: "confirm-exam-over-practice",
      actionLabel: "结束并开始考试",
    });
    return;
  }
  const { bank, requestedCount, minutes } = resolvedConfig;
  const source = questions.filter((question) => bank === "all" || question.bank === bank);
  const pool = shuffle(source).slice(0, Math.min(requestedCount, source.length));
  const title = bank === "theory" ? "理论模拟考试" : bank === "comprehensive" ? "综合问答模拟" : "全题库模拟";
  userState.currentSession = {
    type: "exam",
    title,
    poolIds: pool.map((question) => question.id),
    index: 0,
    answers: {},
    startedAt: new Date().toISOString(),
    deadline: Date.now() + minutes * 60 * 1000,
    minutes,
  };
  lastExamResult = null;
  saveState();
  renderExamQuestion();
}

function formatTime(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateExamTimer() {
  const session = userState.currentSession;
  if (!session || session.type !== "exam") return;
  const remaining = session.deadline - Date.now();
  document.querySelectorAll("[data-exam-timer]").forEach((element) => {
    element.textContent = formatTime(remaining);
  });
  if (remaining <= 0) {
    clearInterval(examTimer);
    finishExam(true);
  }
}

function answerGrid(session, dialogMode = false) {
  return `<div class="answer-grid ${dialogMode ? "dialog-answer-grid" : ""}">${session.poolIds.map((id, index) => {
    const answered = Boolean(session.answers[id]);
    return `<button class="answer-number ${answered ? "answered" : ""} ${index === session.index ? "current" : ""}" type="button" data-action="exam-jump" data-index="${index}">${index + 1}</button>`;
  }).join("")}</div>`;
}

function renderExamQuestion() {
  const session = userState.currentSession;
  const question = currentQuestion();
  if (!session || session.type !== "exam" || !question) {
    userState.currentSession = null;
    saveState();
    renderExamSetup();
    return;
  }
  const selected = session.answers[question.id]?.selected;
  const answeredCount = Object.keys(session.answers).length;
  const progressValue = percent(session.index + 1, session.poolIds.length);
  const options = ["A", "B", "C"].map((key) => `
    <button class="option-button ${selected === key ? "is-selected" : ""}" type="button" data-action="exam-option" data-option="${key}">
      <span class="option-key">${key}</span><span class="option-text">${escapeHtml(question.options[key])}</span><span class="option-state">${selected === key ? icon("check") : ""}</span>
    </button>`).join("");

  viewRoot.innerHTML = `
    <div class="page-shell exam-layout">
      <div class="question-shell">
        <div class="question-topline">
          <button class="icon-button" type="button" data-action="exit-exam" aria-label="退出考试" title="退出考试">${icon("arrowLeft")}</button>
          <div class="question-topline-copy"><strong>${escapeHtml(session.title)}</strong><span>${answeredCount} / ${session.poolIds.length} 已作答</span></div>
          <span class="exam-timer" style="margin:0;padding:0;border:0;font-size:16px">${icon("clock")}<span data-exam-timer>${formatTime(session.deadline - Date.now())}</span></span>
          <button class="icon-button" type="button" data-action="open-answer-sheet" aria-label="打开答题卡" title="答题卡">${icon("grid")}</button>
        </div>
        <div class="question-progress"><span style="width:${progressValue}%"></span></div>
        <article class="question-panel">
          <div class="question-labels"><span class="question-tag">${escapeHtml(question.chapter)}</span><span class="question-number">第 ${session.index + 1} 题</span></div>
          <h1 class="question-title">${escapeHtml(question.stem)}</h1>
          <div class="option-list">${options}</div>
        </article>
        <footer class="question-footer">
          <small>答案可在交卷前修改</small>
          <div class="question-actions">
            <button class="secondary-button" type="button" data-action="exam-previous" ${session.index === 0 ? "disabled" : ""}>${icon("arrowLeft")}上一题</button>
            <button class="primary-button" type="button" data-action="exam-next">${session.index === session.poolIds.length - 1 ? "打开答题卡" : "下一题"}${icon(session.index === session.poolIds.length - 1 ? "grid" : "arrowRight")}</button>
          </div>
        </footer>
      </div>
      <aside class="exam-sidebar">
        <h3>答题卡</h3>
        <div class="exam-timer">${icon("clock")}<span data-exam-timer>${formatTime(session.deadline - Date.now())}</span></div>
        ${answerGrid(session)}
        <button class="primary-button" type="button" data-action="request-submit-exam">提交试卷</button>
      </aside>
    </div>`;
  updateExamTimer();
  examTimer = setInterval(updateExamTimer, 1000);
}

function chooseExamOption(option) {
  const session = userState.currentSession;
  const question = currentQuestion();
  if (!session || session.type !== "exam" || !question) return;
  session.answers[question.id] = { selected: option };
  saveState();
  renderExamQuestion();
}

function moveExam(delta) {
  const session = userState.currentSession;
  if (!session || session.type !== "exam") return;
  const nextIndex = Math.max(0, Math.min(session.poolIds.length - 1, session.index + delta));
  if (delta > 0 && session.index === session.poolIds.length - 1) {
    openAnswerSheet();
    return;
  }
  session.index = nextIndex;
  saveState();
  renderExamQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function jumpExam(index) {
  const session = userState.currentSession;
  if (!session || session.type !== "exam") return;
  session.index = Math.max(0, Math.min(session.poolIds.length - 1, Number(index)));
  saveState();
  closeDialog();
  renderExamQuestion();
}

function openAnswerSheet() {
  const session = userState.currentSession;
  if (!session || session.type !== "exam") return;
  const unanswered = session.poolIds.length - Object.keys(session.answers).length;
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <div class="dialog-head"><h2>答题卡</h2><button class="small-icon-button" type="button" data-action="close-dialog" aria-label="关闭">${icon("x")}</button></div>
      <p>${unanswered ? `还有 ${unanswered} 道未作答` : "全部题目已作答"}</p>
      ${answerGrid(session, true)}
      <div class="button-row" style="margin-top:20px"><button class="primary-button" type="button" data-action="request-submit-exam">提交试卷</button></div>
    </div>`;
  dialog.showModal();
}

function requestSubmitExam() {
  const session = userState.currentSession;
  if (!session || session.type !== "exam") return;
  const unanswered = session.poolIds.length - Object.keys(session.answers).length;
  showConfirm({
    title: "提交试卷",
    body: unanswered ? `仍有 ${unanswered} 道未作答，提交后将按错误计入。` : "全部题目已作答，确认提交试卷？",
    action: "confirm-submit-exam",
    actionLabel: "确认提交",
  });
}

function finishExam(autoSubmitted = false) {
  const session = userState.currentSession;
  if (!session || session.type !== "exam") return;
  let correct = 0;
  const wrongIds = [];
  for (const id of session.poolIds) {
    const question = byId.get(id);
    const selected = session.answers[id]?.selected || null;
    const isCorrect = recordAnswer(question, selected, "exam");
    if (isCorrect) correct += 1;
    else wrongIds.push(id);
  }
  const total = session.poolIds.length;
  const result = {
    title: session.title,
    total,
    correct,
    wrong: total - correct,
    unanswered: session.poolIds.filter((id) => !session.answers[id]).length,
    score: percent(correct, total),
    wrongIds,
    poolIds: session.poolIds,
    answers: session.answers,
    autoSubmitted,
    finishedAt: new Date().toISOString(),
  };
  lastExamResult = result;
  userState.examHistory.push({
    title: result.title,
    total: result.total,
    correct: result.correct,
    score: result.score,
    finishedAt: result.finishedAt,
  });
  userState.examHistory = userState.examHistory.slice(-30);
  userState.currentSession = null;
  saveState();
  closeDialog();
  renderExamResult();
}

function renderExamResult() {
  const result = lastExamResult;
  if (!result) {
    renderExamSetup();
    return;
  }
  viewRoot.innerHTML = `
    <div class="narrow-shell">
      <section class="exam-summary">
        <div class="score-ring" style="--score-angle:${result.score * 3.6}deg"><div class="score-ring-inner"><div><strong>${result.score}</strong><small>得分</small></div></div></div>
        <div class="summary-copy">
          <h1>${result.autoSubmitted ? "考试已自动交卷" : "考试完成"}</h1>
          <p>${escapeHtml(result.title)}</p>
          <div class="summary-metrics">
            <div><span>答对</span><strong>${result.correct}</strong></div>
            <div><span>答错</span><strong>${result.wrong}</strong></div>
            <div><span>未答</span><strong>${result.unanswered}</strong></div>
          </div>
          <div class="button-row">
            <button class="primary-button" type="button" data-action="review-exam-wrong" ${result.wrongIds.length ? "" : "disabled"}>${icon("rotate")}复盘错题</button>
            <button class="secondary-button" type="button" data-action="new-exam">重新组卷</button>
          </div>
        </div>
      </section>
    </div>`;
}

function renderReviewList() {
  const container = document.querySelector("#review-list-wrap");
  if (!container) return;
  const ids = reviewTab === "mistakes" ? Object.keys(userState.mistakes) : userState.favorites;
  const query = reviewQuery.trim().toLowerCase();
  const list = ids
    .map((id) => byId.get(id))
    .filter(Boolean)
    .filter((question) => !query || `${question.stem}${question.chapter}${question.sourceFile}`.toLowerCase().includes(query));

  if (!list.length) {
    container.innerHTML = `<div class="empty-state"><div>${icon(reviewTab === "mistakes" ? "check" : "star")}<strong>${query ? "没有匹配的题目" : reviewTab === "mistakes" ? "错题已清空" : "还没有收藏题目"}</strong><p>${query ? "换一个关键词继续查找。" : reviewTab === "mistakes" ? "后续答错的题目会自动加入这里。" : "在练习页点击星标即可收藏。"}</p></div></div>`;
    return;
  }

  container.innerHTML = `<div class="review-list">${list.map((question, index) => `
    <article class="review-row">
      <div class="review-row-index">${index + 1}</div>
      <div class="review-row-copy"><strong>${escapeHtml(question.stem)}</strong><span>${escapeHtml(question.chapter)} · 原题 ${question.sourceNumber}</span></div>
      <div class="chapter-actions">
        ${reviewTab === "mistakes" ? `<button class="small-icon-button" type="button" data-action="remove-mistake" data-id="${question.id}" aria-label="移出错题" title="移出错题">${icon("check")}</button>` : ""}
        <button class="small-icon-button" type="button" data-action="open-review-question" data-id="${question.id}" aria-label="练习此题" title="练习此题">${icon("play")}</button>
      </div>
    </article>`).join("")}</div>`;
}

function renderReview() {
  const mistakeCount = Object.keys(userState.mistakes).length;
  const favoriteCount = userState.favorites.length;
  viewRoot.innerHTML = `
    <div class="page-shell">
      <div class="page-heading"><div><h1>错题收藏</h1><p>${mistakeCount} 道错题 · ${favoriteCount} 道收藏</p></div></div>
      <div class="review-toolbar">
        <div class="segmented-control">
          <button class="segment-button ${reviewTab === "mistakes" ? "active" : ""}" type="button" data-action="review-tab" data-tab="mistakes">错题 ${mistakeCount}</button>
          <button class="segment-button ${reviewTab === "favorites" ? "active" : ""}" type="button" data-action="review-tab" data-tab="favorites">收藏 ${favoriteCount}</button>
          <button class="segment-button" type="button" data-action="start-current-review">开始复习</button>
        </div>
        <input class="text-control" id="review-search" type="search" placeholder="搜索题干或章节" value="${escapeHtml(reviewQuery)}" aria-label="搜索题目" />
        <button class="secondary-button" type="button" data-action="start-current-review" ${reviewTab === "mistakes" && !mistakeCount || reviewTab === "favorites" && !favoriteCount ? "disabled" : ""}>${icon("play")}开始复习</button>
      </div>
      <div id="review-list-wrap"></div>
    </div>`;
  renderReviewList();
}

function lastSevenDays() {
  const days = [];
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - offset);
    const key = todayKey(date);
    days.push({ key, label: `${date.getMonth() + 1}/${date.getDate()}`, ...(userState.daily[key] || { answered: 0, correct: 0 }) });
  }
  return days;
}

function renderStats() {
  const stats = overallStats();
  const mistakeCount = Object.keys(userState.mistakes).length;
  const examCount = userState.examHistory.length;
  const latestExam = userState.examHistory.at(-1);
  const chapterStats = chapters.map((chapter) => {
    const result = progressFor(chapter.questions.map((question) => question.id));
    return { ...chapter, ...result, completion: percent(result.attempted, chapter.questions.length) };
  });
  const attemptedChapters = chapterStats.filter((chapter) => chapter.attempts > 0);
  const weakest = attemptedChapters.sort((a, b) => a.accuracy - b.accuracy)[0];
  const days = lastSevenDays();
  const maxAnswered = Math.max(1, ...days.map((day) => day.answered));

  viewRoot.innerHTML = `
    <div class="page-shell">
      <div class="page-heading"><div><h1>学习统计</h1><p>数据来自当前设备</p></div></div>
      <section class="stats-grid" aria-label="核心指标">
        <article class="stat-panel"><span>累计作答</span><strong>${formatNumber(stats.attempts)}</strong><p>${stats.attempted} 道不同题目</p></article>
        <article class="stat-panel"><span>累计正确率</span><strong>${stats.accuracy}%</strong><p>${stats.correct} 次答对</p></article>
        <article class="stat-panel"><span>薄弱章节</span><strong style="font-size:18px;line-height:1.35">${escapeHtml(weakest?.name || "尚未形成")}</strong><p>${weakest ? `${weakest.accuracy}% 正确率` : "完成一组练习后显示"}</p></article>
        <article class="stat-panel"><span>待复习错题</span><strong>${mistakeCount}</strong><p>答对后可移出</p></article>
        <article class="stat-panel"><span>模拟考试</span><strong>${examCount}</strong><p>${latestExam ? `最近 ${latestExam.score} 分` : "尚无记录"}</p></article>
        <article class="stat-panel"><span>连续学习</span><strong>${computeStreak()} 天</strong><p>按自然日统计</p></article>
      </section>
      <div class="stats-layout">
        <section class="stats-section">
          <h2>章节掌握度</h2>
          <div class="chapter-stat-list">${chapterStats.map((chapter) => `
            <div><div class="chapter-stat-head"><span>${escapeHtml(chapter.name)}</span><span>${chapter.attempted}/${chapter.questions.length} · ${chapter.accuracy}%</span></div><div class="progress-track"><div class="progress-fill" style="width:${chapter.completion}%"></div></div></div>`).join("")}</div>
        </section>
        <section class="stats-section">
          <h2>近 7 日作答</h2>
          <div class="activity-chart">${days.map((day) => `
            <div class="activity-day"><div class="activity-bar-wrap"><div class="activity-bar" style="height:${Math.max(4, percent(day.answered, maxAnswered))}%" title="${day.answered} 道"></div></div><span>${day.label}</span></div>`).join("")}</div>
        </section>
      </div>
    </div>`;
}

function renderSettings() {
  const canInstall = Boolean(deferredInstallPrompt);
  viewRoot.innerHTML = `
    <div class="narrow-shell">
      <div class="page-heading"><div><h1>设置</h1><p>题库版本 ${escapeHtml(data.meta.version)}</p></div></div>
      <div class="settings-list">
        <section class="settings-section">
          <h2>练习偏好</h2>
          <div class="setting-row">
            <div><strong>答对后自动下一题</strong><small>答错时仍保留答案反馈</small></div>
            <label class="toggle"><input type="checkbox" data-setting="autoNextCorrect" ${userState.settings.autoNextCorrect ? "checked" : ""} /><span></span></label>
          </div>
        </section>
        <section class="settings-section">
          <h2>离线应用</h2>
          <div class="setting-row">
            <div><strong>安装到设备</strong><small>${canInstall ? "当前浏览器支持安装" : "已安装或等待浏览器提供安装入口"}</small></div>
            <button class="secondary-button" type="button" data-action="install-app" ${canInstall ? "" : "disabled"}>${icon("download")}安装</button>
          </div>
        </section>
        <section class="settings-section">
          <h2>学习数据</h2>
          <p>备份包含作答记录、错题、收藏和考试成绩。</p>
          <div class="setting-row">
            <div><strong>备份与恢复</strong><small>JSON 文件仅保存在你选择的位置</small></div>
            <div class="setting-actions">
              <button class="secondary-button" type="button" data-action="export-data">${icon("download")}导出</button>
              <button class="secondary-button" type="button" data-action="import-data">${icon("upload")}导入</button>
            </div>
          </div>
          <div class="setting-row">
            <div><strong>清空全部学习记录</strong><small>题库文件不会被删除</small></div>
            <button class="danger-button" type="button" data-action="request-reset">${icon("trash")}清空记录</button>
          </div>
        </section>
      </div>
    </div>`;
}

function toggleFavorite(questionId) {
  const favorites = getFavoriteSet();
  if (favorites.has(questionId)) favorites.delete(questionId);
  else favorites.add(questionId);
  userState.favorites = [...favorites];
  saveState();
  showToast(favorites.has(questionId) ? "已加入收藏" : "已取消收藏");
  renderView();
}

function exportData() {
  const payload = {
    app: "CAAC 训练舱",
    exportedAt: new Date().toISOString(),
    state: userState,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `caac-progress-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("学习数据已导出");
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      const imported = payload.state || payload;
      if (!imported || typeof imported !== "object" || !imported.progress) throw new Error("Invalid backup");
      userState = {
        ...defaultState(),
        ...imported,
        settings: { ...defaultState().settings, ...(imported.settings || {}) },
      };
      saveState();
      showToast("学习数据已恢复");
      renderView();
    } catch (error) {
      console.error(error);
      showToast("无法识别此备份文件");
    }
  };
  reader.readAsText(file, "utf-8");
}

function updateNetworkState() {
  const state = document.querySelector("#network-state");
  if (!state) return;
  state.classList.toggle("is-offline", !navigator.onLine);
  state.querySelector("span:last-child").textContent = navigator.onLine ? "已就绪" : "离线可用";
}

async function installApp() {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  document.querySelectorAll(".install-trigger").forEach((button) => button.classList.add("hidden"));
  renderView();
}

function handleAction(button) {
  const action = button.dataset.action;
  switch (action) {
    case "open-practice":
      lastPracticeResult = null;
      navigate("practice");
      break;
    case "continue-session":
      navigate(userState.currentSession?.type === "exam" ? "exam" : "practice");
      break;
    case "start-chapter": {
      const chapter = chapters.find((item) => item.id === button.dataset.chapter);
      if (chapter) startPractice(chapter.questions, chapter.name, { random: button.dataset.random === "true" });
      break;
    }
    case "start-theory-random":
      startPractice(questions.filter((question) => question.bank === "theory"), "理论题随机练习", { random: true });
      break;
    case "start-comprehensive":
      startPractice(questions.filter((question) => question.bank === "comprehensive"), "综合问答", {});
      break;
    case "start-mistake-review":
      startPractice(Object.keys(userState.mistakes).map((id) => byId.get(id)).filter(Boolean), "错题强化", { random: true, context: "mistakes" });
      break;
    case "choose-option":
      choosePracticeOption(button.dataset.option);
      break;
    case "previous-question":
      previousPracticeQuestion();
      break;
    case "next-question":
      nextPracticeQuestion();
      break;
    case "toggle-favorite":
      if (currentQuestion()) toggleFavorite(currentQuestion().id);
      break;
    case "exit-session":
      navigate("home");
      break;
    case "repeat-practice": {
      const result = lastPracticeResult;
      if (result) startPractice(result.poolIds.map((id) => byId.get(id)).filter(Boolean), result.title, { random: true, context: result.context });
      break;
    }
    case "close-practice-result":
      lastPracticeResult = null;
      renderPracticeCatalog();
      break;
    case "start-exam":
      startExam();
      break;
    case "exam-option":
      chooseExamOption(button.dataset.option);
      break;
    case "exam-previous":
      moveExam(-1);
      break;
    case "exam-next":
      moveExam(1);
      break;
    case "exam-jump":
      jumpExam(button.dataset.index);
      break;
    case "open-answer-sheet":
      openAnswerSheet();
      break;
    case "request-submit-exam":
      requestSubmitExam();
      break;
    case "confirm-submit-exam":
      finishExam(false);
      break;
    case "confirm-practice-over-exam": {
      const next = pendingPractice;
      pendingPractice = null;
      userState.currentSession = null;
      closeDialog();
      if (next) startPractice(next.ids.map((id) => byId.get(id)).filter(Boolean), next.title, { random: next.random, context: next.context, force: true });
      break;
    }
    case "confirm-exam-over-practice": {
      const next = pendingExamConfig;
      pendingExamConfig = null;
      userState.currentSession = null;
      closeDialog();
      if (next) startExam(next, true);
      break;
    }
    case "exit-exam":
      navigate("home");
      break;
    case "new-exam":
      lastExamResult = null;
      renderExamSetup();
      break;
    case "review-exam-wrong":
      startPractice(lastExamResult.wrongIds.map((id) => byId.get(id)).filter(Boolean), "考试错题复盘", { random: false, context: "mistakes" });
      break;
    case "review-tab":
      reviewTab = button.dataset.tab;
      reviewQuery = "";
      renderReview();
      break;
    case "start-current-review": {
      const ids = reviewTab === "mistakes" ? Object.keys(userState.mistakes) : userState.favorites;
      startPractice(ids.map((id) => byId.get(id)).filter(Boolean), reviewTab === "mistakes" ? "错题强化" : "收藏练习", { random: true, context: reviewTab });
      break;
    }
    case "open-review-question":
      startPractice([byId.get(button.dataset.id)].filter(Boolean), "单题复习", { context: reviewTab });
      break;
    case "remove-mistake":
      delete userState.mistakes[button.dataset.id];
      saveState();
      renderReview();
      showToast("已移出错题");
      break;
    case "export-data":
      exportData();
      break;
    case "import-data":
      importInput.click();
      break;
    case "request-reset":
      showConfirm({ title: "清空学习记录", body: "作答记录、错题、收藏和考试成绩都将被清空。题库不会受影响。", action: "confirm-reset", actionLabel: "确认清空", danger: true });
      break;
    case "confirm-reset":
      userState = defaultState();
      saveState();
      lastPracticeResult = null;
      lastExamResult = null;
      closeDialog();
      showToast("学习记录已清空");
      navigate("home");
      break;
    case "install-app":
      installApp();
      break;
    case "close-dialog":
      closeDialog();
      break;
    default:
      break;
  }
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) {
    navigate(viewButton.dataset.view);
    return;
  }
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) handleAction(actionButton);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "review-search") {
    reviewQuery = event.target.value;
    renderReviewList();
  }
});

document.addEventListener("change", (event) => {
  const setting = event.target.dataset.setting;
  if (setting) {
    userState.settings[setting] = event.target.checked;
    saveState();
    showToast("设置已保存");
  }
});

document.addEventListener("keydown", (event) => {
  if (["INPUT", "SELECT", "TEXTAREA"].includes(document.activeElement?.tagName) || dialog.open) return;
  const session = userState.currentSession;
  if (!session) return;
  if (["1", "2", "3"].includes(event.key)) {
    const option = ["A", "B", "C"][Number(event.key) - 1];
    if (session.type === "practice") choosePracticeOption(option);
    else chooseExamOption(option);
  } else if (event.key === "ArrowRight") {
    session.type === "practice" ? nextPracticeQuestion() : moveExam(1);
  } else if (event.key === "ArrowLeft") {
    session.type === "practice" ? previousPracticeQuestion() : moveExam(-1);
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});

importInput.addEventListener("change", () => {
  const [file] = importInput.files;
  if (file) importData(file);
  importInput.value = "";
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  document.querySelectorAll(".install-trigger").forEach((button) => button.classList.remove("hidden"));
  if (activeView === "settings") renderSettings();
});

window.addEventListener("online", updateNetworkState);
window.addEventListener("offline", updateNetworkState);

async function initialize() {
  hydrateIcons();
  updateNetworkState();
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`题库请求失败：${response.status}`);
    data = await response.json();
    questions = data.questions;
    byId = new Map(questions.map((question) => [question.id, question]));
    deriveChapters();

    if (userState.currentSession) {
      userState.currentSession.poolIds = userState.currentSession.poolIds.filter((id) => byId.has(id));
      if (!userState.currentSession.poolIds.length) userState.currentSession = null;
      saveState();
    }

    const hashView = location.hash.replace("#", "");
    activeView = ["home", "practice", "exam", "review", "stats", "settings"].includes(hashView) ? hashView : "home";
    setActiveNav(activeView);
    renderView();

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch((error) => console.warn("Service worker registration failed", error));
    }
  } catch (error) {
    console.error(error);
    viewRoot.innerHTML = `<div class="error-state">${icon("alert")}<strong>题库无法载入</strong><span>请通过本地服务器打开此网站。</span></div>`;
  }
}

initialize();

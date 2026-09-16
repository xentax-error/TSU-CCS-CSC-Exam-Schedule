(function () {
  "use strict";

  const THEME_KEY = "ccs-theme-preference";
  const root = document.documentElement;
  const themeLightBtn = document.getElementById("themeLightBtn");
  const themeDarkBtn = document.getElementById("themeDarkBtn");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeLightBtn.setAttribute("aria-pressed", String(theme === "light"));
    themeDarkBtn.setAttribute("aria-pressed", String(theme === "dark"));
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
    } else {
      applyTheme(systemPrefersDark.matches ? "dark" : "light");
    }
  }

  themeLightBtn.addEventListener("click", function () {
    applyTheme("light");
    storeTheme("light");
  });

  themeDarkBtn.addEventListener("click", function () {
    applyTheme("dark");
    storeTheme("dark");
  });

  systemPrefersDark.addEventListener("change", function (e) {
    if (!getStoredTheme()) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  initTheme();

  const state = {
    program: "all",
    year: "all",
    day: "all"
  };

  const programSelect = document.getElementById("programSelect");
  const yearSelect = document.getElementById("yearSelect");
  const dayPills = Array.from(document.querySelectorAll(".day-pill"));
  const clearFiltersBtn = document.getElementById("clearFilters");
  const scheduleDaysEl = document.getElementById("scheduleDays");
  const scheduleStatusEl = document.getElementById("scheduleStatus");
  const statusTitleEl = document.getElementById("statusTitle");
  const statusBodyEl = document.getElementById("statusBody");
  const statusResetBtn = document.getElementById("statusReset");

  function subjectsAllowedFor(program, year) {
    if (program === "all" && year === "all") return null;

    if (program !== "all" && year === "all") {
      const programMap = YEAR_LEVEL_MAP[program];
      if (!programMap) return "unavailable";
      const union = new Set();
      Object.keys(programMap).forEach(function (y) {
        programMap[y].forEach(function (s) { union.add(s); });
      });
      return Array.from(union);
    }

    if (program === "all" && year !== "all") {
      const union = new Set();
      let anyProgramHasYear = false;
      Object.keys(YEAR_LEVEL_MAP).forEach(function (p) {
        if (YEAR_LEVEL_MAP[p][year]) {
          anyProgramHasYear = true;
          YEAR_LEVEL_MAP[p][year].forEach(function (s) { union.add(s); });
        }
      });
      return anyProgramHasYear ? Array.from(union) : "unavailable";
    }

    const programMap = YEAR_LEVEL_MAP[program];
    if (!programMap || !programMap[year]) return "unavailable";
    return programMap[year];
  }

  function describeFilter(program, year) {
    const programLabel = PROGRAM_LABELS[program] || "this program";
    if (program !== "all" && year !== "all") return programLabel + ", year " + year;
    if (program !== "all") return programLabel;
    return "year " + year;
  }

  function render() {
    const allowedSubjects = subjectsAllowedFor(state.program, state.year);

    if (allowedSubjects === "unavailable") {
      scheduleStatusEl.hidden = false;
      scheduleDaysEl.hidden = true;
      statusTitleEl.textContent = "Schedule not posted yet";
      statusBodyEl.textContent =
        "The council hasn't received a " + describeFilter(state.program, state.year) +
        " subject list yet. Check back soon, or view the full schedule below.";
      return;
    }

    scheduleStatusEl.hidden = true;
    scheduleDaysEl.hidden = false;

    const days = state.day === "all"
      ? EXAM_DAYS
      : EXAM_DAYS.filter(function (d) { return String(d.id) === state.day; });

    let totalRows = 0;
    scheduleDaysEl.innerHTML = "";

    days.forEach(function (day) {
      let rows = MASTER_SCHEDULE.filter(function (row) { return row.day === day.id; });

      if (allowedSubjects) {
        rows = rows.filter(function (row) { return allowedSubjects.indexOf(row.subject) !== -1; });
      }

      if (rows.length === 0) return;
      totalRows += rows.length;

      const section = document.createElement("section");
      section.className = "day-block";
      section.setAttribute("aria-labelledby", "day-heading-" + day.id);

      const heading = document.createElement("h2");
      heading.className = "day-heading";
      heading.id = "day-heading-" + day.id;
      heading.innerHTML =
        '<span class="day-heading-index">Day ' + day.id + '</span>' +
        '<span class="day-heading-date">' + day.label + '</span>';
      section.appendChild(heading);

      const table = document.createElement("table");
      table.className = "schedule-table";

      const thead = document.createElement("thead");
      thead.innerHTML = "<tr><th scope=\"col\">Time</th><th scope=\"col\">Subject</th></tr>";
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      let lastTime = null;
      let stripeIndex = 0;

      rows.forEach(function (row) {
        if (row.time !== lastTime) {
          stripeIndex = (stripeIndex % 4) + 1;
          lastTime = row.time;
        }

        const tr = document.createElement("tr");
        tr.setAttribute("data-stripe", String(stripeIndex));

        const timeTd = document.createElement("td");
        timeTd.className = "cell-time";
        timeTd.textContent = row.time;

        const subjectTd = document.createElement("td");
        subjectTd.className = "cell-subject";

        const code = SUBJECT_CODES[row.subject];
        const codeSpan = document.createElement("span");
        codeSpan.className = code ? "subject-code" : "subject-code is-unknown";
        codeSpan.textContent = code || "—";
        subjectTd.appendChild(codeSpan);

        const divider = document.createElement("span");
        divider.className = "subject-divider";
        divider.setAttribute("aria-hidden", "true");
        subjectTd.appendChild(divider);

        const titleSpan = document.createElement("span");
        titleSpan.className = "subject-title";
        titleSpan.textContent = row.subject;
        subjectTd.appendChild(titleSpan);

        tr.appendChild(timeTd);
        tr.appendChild(subjectTd);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);

      section.appendChild(table);
      scheduleDaysEl.appendChild(section);
    });

    if (totalRows === 0) {
      scheduleStatusEl.hidden = false;
      scheduleDaysEl.hidden = true;
      statusTitleEl.textContent = "No exams match these filters";
      statusBodyEl.textContent = "Try a different day, or clear your filters to see the full schedule.";
    }
  }

  programSelect.addEventListener("change", function () {
    state.program = programSelect.value;
    render();
  });

  yearSelect.addEventListener("change", function () {
    state.year = yearSelect.value;
    render();
  });

  dayPills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      dayPills.forEach(function (p) { p.classList.remove("is-active"); });
      pill.classList.add("is-active");
      state.day = pill.getAttribute("data-day");
      render();
    });
  });

  clearFiltersBtn.addEventListener("click", resetFilters);
  statusResetBtn.addEventListener("click", resetFilters);

  function resetFilters() {
    state.program = "all";
    state.year = "all";
    state.day = "all";
    programSelect.value = "all";
    yearSelect.value = "all";
    dayPills.forEach(function (p) { p.classList.remove("is-active"); });
    dayPills[0].classList.add("is-active");
    render();
  }

  render();

  const CELEBRATED_KEY = "ccs-celebrated-milestones";

  function getCelebrated() {
    try {
      return JSON.parse(localStorage.getItem(CELEBRATED_KEY) || "[]");
    } catch (e) {
      return [];
    }
  }

  function markCelebrated(id) {
    try {
      const done = getCelebrated();
      if (done.indexOf(id) === -1) {
        done.push(id);
        localStorage.setItem(CELEBRATED_KEY, JSON.stringify(done));
      }
    } catch (e) {

    }
  }

  const overlay = document.getElementById("celebrationOverlay");
  const card = document.getElementById("celebrationCard");
  const emojiEl = document.getElementById("celebrationEmoji");
  const titleEl = document.getElementById("celebrationTitle");
  const bodyEl = document.getElementById("celebrationBody");
  const closeBtn = document.getElementById("celebrationClose");

  function showCelebration(opts) {
    emojiEl.textContent = opts.emoji;
    titleEl.textContent = opts.title;
    bodyEl.textContent = opts.body;
    card.classList.toggle("is-finale", !!opts.finale);
    overlay.hidden = false;
    launchConfetti(opts.finale ? 5200 : 2600);
  }

  closeBtn.addEventListener("click", function () {
    overlay.hidden = true;
  });
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) overlay.hidden = true;
  });

  const dayNameById = {};
  EXAM_DAYS.forEach(function (d) { dayNameById[d.id] = d.label.split(", ")[1] || d.label; });

  function checkMilestones() {
    const now = new Date();
    const celebrated = getCelebrated();
    const lastDay = EXAM_DAYS[EXAM_DAYS.length - 1];

    EXAM_DAYS.forEach(function (day) {
      const endsAt = new Date(day.date + "T" + day.endTime + ":00");
      if (now < endsAt) return;

      const isLastDay = day.id === lastDay.id;
      const milestoneId = isLastDay ? "final" : "day-" + day.id;
      if (celebrated.indexOf(milestoneId) !== -1) return;

      if (isLastDay) {
        showCelebration({
          emoji: "🎓",
          title: "That's every exam, done!",
          body: "The last exam of the last day just wrapped up. Congratulations, CCS \u2014 enjoy the break!",
          finale: true
        });
      } else {
        showCelebration({
          emoji: "🎉",
          title: "Exams done for " + dayNameById[day.id] + "!",
          body: "That's the last block for today. Rest up and get ready for the next day's exams.",
          finale: false
        });
      }
      markCelebrated(milestoneId);
    });
  }

  const params = new URLSearchParams(window.location.search);
  const preview = params.get("preview");
  if (preview === "day") {
    showCelebration({
      emoji: "🎉",
      title: "Exams done for today! (preview)",
      body: "That's the last block for today. Rest up and get ready for the next day's exams.",
      finale: false
    });
  } else if (preview === "final") {
    showCelebration({
      emoji: "🎓",
      title: "That's every exam, done! (preview)",
      body: "The last exam of the last day just wrapped up. Congratulations, CCS \u2014 enjoy the break!",
      finale: true
    });
  } else {
    checkMilestones();
    setInterval(checkMilestones, 60 * 1000);
  }

  const canvas = document.getElementById("confettiCanvas");
  const ctx2d = canvas.getContext("2d");
  const confettiColors = ["#61151a", "#171f2e", "#cbb59e", "#9a2e35"];
  let confettiPieces = [];
  let confettiRunning = false;
  let confettiStopAt = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function launchConfetti(durationMs) {
    confettiStopAt = Date.now() + durationMs;
    const count = Math.min(160, Math.floor(window.innerWidth / 6));
    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height * 0.5,
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 10,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        speedY: 2 + Math.random() * 3,
        speedX: -1.5 + Math.random() * 3,
        rotation: Math.random() * 360,
        spin: -8 + Math.random() * 16
      });
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(tickConfetti);
    }
  }

  function tickConfetti() {
    ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    const stillFalling = [];
    const pastDuration = Date.now() > confettiStopAt;

    confettiPieces.forEach(function (p) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.spin;

      ctx2d.save();
      ctx2d.translate(p.x, p.y);
      ctx2d.rotate((p.rotation * Math.PI) / 180);
      ctx2d.fillStyle = p.color;
      ctx2d.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx2d.restore();

      if (p.y < canvas.height + 30 && !(pastDuration && p.y > canvas.height * 0.4)) {
        stillFalling.push(p);
      }
    });

    confettiPieces = stillFalling;

    if (confettiPieces.length > 0) {
      requestAnimationFrame(tickConfetti);
    } else {
      confettiRunning = false;
      ctx2d.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
})();

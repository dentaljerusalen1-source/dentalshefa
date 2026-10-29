(function () {
  "use strict";

  var CFG = window.SITE_CONFIG;
  var T = window.I18N;
  var lang = "es";

  /* ---------- Idioma ---------- */
  function detectLang() {
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") return saved;
    } catch (e) {}
    var nav = (navigator.language || "es").toLowerCase();
    return nav.indexOf("es") === 0 ? "es" : "en";
  }

  function t(key) {
    return (T[lang] && T[lang][key]) || T.es[key] || key;
  }

  function applyLang(next) {
    lang = next;
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("#langToggle [data-lang]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-lang") === lang);
    });

    document.title = lang === "es"
      ? "Clínica Dental Jerusalén Shefa | Turismo Dental en San Salvador"
      : "Jerusalén Shefa Dental Clinic | Dental Tourism in San Salvador, El Salvador";

    updateWaLinks();
    renderCalc();
  }

  function waUrl(text) {
    return "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(text);
  }

  function updateWaLinks() {
    document.querySelectorAll(".js-wa").forEach(function (a) {
      a.href = waUrl(t("wa.msg"));
    });
    document.querySelectorAll(".js-wa-trip").forEach(function (a) {
      a.href = waUrl(t("wa.trip"));
    });
  }

  document.getElementById("langToggle").addEventListener("click", function () {
    applyLang(lang === "es" ? "en" : "es");
  });

  /* ---------- Header y menú móvil ---------- */
  var header = document.getElementById("header");
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  function onScroll() {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Animaciones de entrada ---------- */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { revealObs.observe(el); });

  /* ---------- Imágenes de respaldo ---------- */
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () { img.classList.add("is-broken"); });
    img.addEventListener("load", function () { img.classList.remove("is-broken"); });
    if (img.complete && img.getAttribute("src") && img.naturalWidth === 0) img.classList.add("is-broken");
  });

  /* ---------- Antes / Después ---------- */
  var ba = document.getElementById("ba");
  var baRange = document.getElementById("baRange");
  var baBefore = document.getElementById("baBefore");
  var baAfter = document.getElementById("baAfter");

  function setCase(i) {
    var c = CFG.beforeAfter[i];
    if (!c) return;
    baBefore.classList.remove("is-broken");
    baAfter.classList.remove("is-broken");
    baBefore.src = c.before;
    baAfter.src = c.after;
    ba.classList.toggle("is-simulated", !!c.simulate);
    document.querySelectorAll(".ba-tab").forEach(function (b) {
      b.classList.toggle("is-active", +b.getAttribute("data-case") === i);
    });
  }

  baRange.addEventListener("input", function () {
    ba.style.setProperty("--pos", baRange.value + "%");
  });
  document.querySelectorAll(".ba-tab").forEach(function (b) {
    b.addEventListener("click", function () { setCase(+b.getAttribute("data-case")); });
  });
  setCase(0);

  /* ---------- Calculadora ---------- */
  var qty = { implant: 2, veneer: 6 };
  var list = document.getElementById("calcList");
  var travelChk = document.getElementById("calcTravel");

  function money(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function renderCalc() {
    list.innerHTML = "";
    var head = document.createElement("div");
    head.className = "calc__row calc__row--head";
    head.innerHTML = "<span></span><span>" + t("calc.colUS") + "</span><span>" + t("calc.colClinic") + "</span><span></span>";
    list.appendChild(head);

    CFG.treatments.forEach(function (tr) {
      var q = qty[tr.id] || 0;
      var row = document.createElement("div");
      row.className = "calc__row" + (q > 0 ? " is-on" : "");
      row.innerHTML =
        '<span class="calc__name">' + tr[lang] + "</span>" +
        '<span class="calc__us" data-label="' + t("calc.colUS") + '">' + money(tr.us) + "</span>" +
        '<span class="calc__clinic" data-label="' + t("calc.colClinic") + '">' + money(tr.clinic) + "</span>" +
        '<span class="stepper">' +
          '<button type="button" data-act="-" aria-label="' + t("calc.less") + '">−</button>' +
          "<output>" + q + "</output>" +
          '<button type="button" data-act="+" aria-label="' + t("calc.more") + '">+</button>' +
        "</span>";
      row.querySelectorAll("button").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var cur = qty[tr.id] || 0;
          cur += btn.getAttribute("data-act") === "+" ? 1 : -1;
          qty[tr.id] = Math.max(0, Math.min(tr.max, cur));
          renderCalc();
        });
      });
      list.appendChild(row);
    });
    updateTotals();
  }

  function updateTotals() {
    var us = 0, clinic = 0, items = [];
    CFG.treatments.forEach(function (tr) {
      var q = qty[tr.id] || 0;
      us += tr.us * q;
      clinic += tr.clinic * q;
      if (q) items.push(q + " × " + tr[lang]);
    });
    var travel = travelChk.checked && clinic > 0 ? CFG.travelEstimate : 0;
    var save = Math.max(0, us - clinic - travel);
    var pct = us > 0 ? Math.round((save / us) * 100) : 0;

    document.getElementById("totUS").textContent = money(us);
    document.getElementById("totClinic").textContent = money(clinic);
    document.getElementById("totTravel").textContent = money(travel);
    document.getElementById("travelRow").style.display = travelChk.checked ? "" : "none";
    document.getElementById("totSave").textContent = money(save);
    document.getElementById("saveBar").style.width = pct + "%";
    document.getElementById("savePct").textContent = pct + "% " + t("calc.saveSuffix");

    var msg = t("wa.quote") + (items.length ? "\n- " + items.join("\n- ") : "");
    document.querySelectorAll(".js-wa-quote").forEach(function (a) { a.href = waUrl(msg); });
  }
  travelChk.addEventListener("change", updateTotals);

  /* ---------- Tu viaje de sonrisa (scroll) ---------- */
  var steps = document.querySelectorAll(".jstep");
  var imgs = document.querySelectorAll(".journey__img");
  var bar = document.getElementById("journeyBar");
  var num = document.getElementById("journeyNum");

  function activateStep(i) {
    steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); });
    imgs.forEach(function (im, k) { im.classList.toggle("is-active", k === i); });
    bar.style.width = ((i + 1) / steps.length) * 100 + "%";
    num.textContent = "0" + (i + 1);
  }

  var stepObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) activateStep(+e.target.getAttribute("data-step"));
    });
  }, { rootMargin: window.innerWidth <= 860 ? "-62% 0px -28% 0px" : "-45% 0px -45% 0px" });
  steps.forEach(function (s) { stepObs.observe(s); });

  /* ---------- Inicio ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  applyLang(detectLang());
})();

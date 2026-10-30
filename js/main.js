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
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
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

  var progress = document.getElementById("scrollBar");
  var waFloat = document.querySelector(".wa-float");
  var stepsBox = document.querySelector(".journey__steps");
  var jLine = document.getElementById("journeyLine");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("is-scrolled", y > 30);
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (waFloat && y > 320) waFloat.classList.add("is-shown");
    if (stepsBox && jLine) {
      var r = stepsBox.getBoundingClientRect();
      var p = (window.innerHeight * 0.5 - r.top) / r.height;
      jLine.style.height = Math.max(0, Math.min(1, p)) * 100 + "%";
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();
  setTimeout(function () { if (waFloat) waFloat.classList.add("is-shown"); }, 2500);

  /* ---------- Menú: resaltar la sección visible ---------- */
  var navLinks = nav.querySelectorAll('a[href^="#"]');
  var spyObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      navLinks.forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("href") === "#" + e.target.id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach(function (a) {
    var sec = document.querySelector(a.getAttribute("href"));
    if (sec) spyObs.observe(sec);
  });

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
  document.querySelectorAll(".reveal").forEach(function (el) {
    // Escalonar elementos hermanos para que aparezcan uno tras otro
    var sibs = Array.prototype.filter.call(el.parentNode.children, function (c) { return c.classList.contains("reveal"); });
    var i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty("--d", Math.min(i, 6) * 0.08 + "s");
    revealObs.observe(el);
  });

  /* ---------- Luz que sigue al cursor en las tarjetas ---------- */
  document.querySelectorAll(".service").forEach(function (card) {
    card.addEventListener("pointermove", function (ev) {
      var r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ev.clientX - r.left + "px");
      card.style.setProperty("--my", ev.clientY - r.top + "px");
    });
  });

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

  var baTabs = document.getElementById("baTabs");
  var baDesc = document.getElementById("baDesc");
  var baCase = 0;
  CFG.beforeAfter.forEach(function (c, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "ba-tab"; b.setAttribute("role", "tab");
    b.setAttribute("data-case", i); b.textContent = c.name || ("Caso " + (i + 1));
    b.addEventListener("click", function () { setCase(i); });
    baTabs.appendChild(b);
  });

  function setCase(i) {
    var c = CFG.beforeAfter[i];
    if (!c) return;
    baCase = i;
    baBefore.classList.remove("is-broken");
    baAfter.classList.remove("is-broken");
    baBefore.src = c.before;
    baAfter.src = c.after;
    baBefore.alt = "Antes: " + (c.name || "");
    baAfter.alt = "Después: " + (c.name || "");
    ba.classList.toggle("is-simulated", !!c.simulate);
    if (baDesc) baDesc.textContent = c.desc || "";
    document.getElementById("baFull").hidden = !c.full;
    baTabs.querySelectorAll(".ba-tab").forEach(function (b) {
      var on = +b.getAttribute("data-case") === i;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on);
    });
  }
  // El marco toma la proporción real de cada foto
  baAfter.addEventListener("load", function () {
    if (!baAfter.naturalWidth) return;
    // no más ancho que 2.3:1 para que las fotos panorámicas no queden muy delgadas
    var r = Math.min(baAfter.naturalWidth / baAfter.naturalHeight, 2.3);
    ba.style.aspectRatio = r.toFixed(3);
  });

  function setPos(v) {
    baRange.value = v;
    ba.style.setProperty("--pos", v + "%");
  }
  var demoDone = false;
  baRange.addEventListener("input", function () {
    demoDone = true;
    ba.style.setProperty("--pos", baRange.value + "%");
  });
  // Pequeña demostración al aparecer: el deslizador se mueve solo una vez
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var baObs = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || demoDone || reduceMotion) return;
    baObs.disconnect();
    var keys = [[0, 50], [700, 22], [1500, 78], [2200, 50]];
    var start = null;
    function frame(ts) {
      if (demoDone) return;
      if (!start) start = ts;
      var t = ts - start, k = 1;
      while (k < keys.length - 1 && t > keys[k][0]) k++;
      var a = keys[k - 1], b = keys[k];
      var f = Math.min(1, Math.max(0, (t - a[0]) / (b[0] - a[0])));
      f = f < .5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;
      setPos(a[1] + (b[1] - a[1]) * f);
      if (t < keys[keys.length - 1][0]) requestAnimationFrame(frame); else setPos(50);
    }
    setTimeout(function () { requestAnimationFrame(frame); }, 400);
  }, { threshold: 0.6 });
  baObs.observe(ba);
  setCase(0);

  /* ---------- Calculadora ---------- */
  var qty = { implant: 2, veneer: 6 };
  var list = document.getElementById("calcList");
  var travelChk = document.getElementById("calcTravel");

  function money(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  // Animar números de la calculadora
  function tween(el, to) {
    var from = el._v || 0;
    el._v = to;
    if (from === to) { el.textContent = money(to); return; }
    var t0 = null, dur = 650;
    function step(ts) {
      if (el._v !== to) return;
      if (!t0) t0 = ts;
      var f = Math.min(1, (ts - t0) / dur);
      f = 1 - Math.pow(1 - f, 3);
      el.textContent = money(from + (to - from) * f);
      if (f < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
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

    tween(document.getElementById("totUS"), us);
    tween(document.getElementById("totClinic"), clinic);
    tween(document.getElementById("totTravel"), travel);
    document.getElementById("travelRow").style.display = travelChk.checked ? "" : "none";
    tween(document.getElementById("totSave"), save);
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

  /* ---------- Visor de fotos (clínica) ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbItems = Array.prototype.slice.call(document.querySelectorAll("[data-lb]"));
  var clinicList = lbItems.map(function (it) {
    var im = it.querySelector("img");
    return { src: it.getAttribute("data-lb"), alt: im ? im.alt : "" };
  });
  var caseList = CFG.beforeAfter.filter(function (c) { return c.full; })
    .map(function (c) { return { src: c.full, alt: c.name || "" }; });
  var lbList = [], lbIndex = 0, lbLast = null;

  function lbShow(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    lbImg.src = lbList[lbIndex].src;
    lbImg.alt = lbList[lbIndex].alt;
  }
  function lbOpen(list, i) {
    lbList = list;
    lbLast = document.activeElement;
    lb.classList.toggle("is-single", list.length < 2);
    lbShow(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { lb.classList.add("is-open"); });
    lb.querySelector(".lightbox__close").focus();
  }
  function lbClose() {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; }, 300);
    if (lbLast) lbLast.focus();
  }
  lbItems.forEach(function (it, i) { it.addEventListener("click", function () { lbOpen(clinicList, i); }); });
  document.getElementById("baFull").addEventListener("click", function () {
    var src = CFG.beforeAfter[baCase].full;
    var k = caseList.findIndex(function (c) { return c.src === src; });
    lbOpen(caseList, Math.max(0, k));
  });
  lb.querySelector(".lightbox__close").addEventListener("click", lbClose);
  lb.querySelector(".lightbox__nav--prev").addEventListener("click", function () { lbShow(lbIndex - 1); });
  lb.querySelector(".lightbox__nav--next").addEventListener("click", function () { lbShow(lbIndex + 1); });
  lb.addEventListener("click", function (ev) { if (ev.target === lb) lbClose(); });
  document.addEventListener("keydown", function (ev) {
    if (lb.hidden) return;
    if (ev.key === "Escape") lbClose();
    if (ev.key === "ArrowLeft") lbShow(lbIndex - 1);
    if (ev.key === "ArrowRight") lbShow(lbIndex + 1);
  });
  // Deslizar con el dedo en el visor
  var tx = null;
  lb.addEventListener("touchstart", function (ev) { tx = ev.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", function (ev) {
    if (tx === null) return;
    var dx = ev.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) lbShow(lbIndex + (dx < 0 ? 1 : -1));
    tx = null;
  });

  /* ---------- Video del escáner intraoral ---------- */
  (function () {
    var src = (CFG.scannerVideo || "").trim();
    var slot = document.getElementById("scannerVideo");
    if (!src || !slot) return;
    var yt = src.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/);
    if (yt) {
      slot.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + yt[1] +
        '" title="Escáner intraoral" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    } else {
      var v = document.createElement("video");
      v.src = src; v.controls = true; v.playsInline = true; v.preload = "metadata";
      v.setAttribute("aria-label", "Video del escáner intraoral");
      if (CFG.scannerPoster) v.poster = CFG.scannerPoster;
      // Video vertical (grabado con celular): ajustar el marco
      v.addEventListener("loadedmetadata", function () {
        slot.classList.toggle("is-vertical", v.videoHeight > v.videoWidth);
      });
      if (/vertical|escaner-intraoral/.test(src)) slot.classList.add("is-vertical");
      slot.innerHTML = ""; slot.appendChild(v);
    }
  })();

  /* ---------- Inicio ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
  applyLang(detectLang());
})();

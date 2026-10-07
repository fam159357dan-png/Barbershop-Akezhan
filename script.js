(() => {
  "use strict";

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const fmtPrice = (n) => n.toLocaleString("ru-RU").replace(/ /g, " ") + " ₸";
  const waLink = (text) => `https://wa.me/${S.phone}?text=${encodeURIComponent(text)}`;

  // Local time in Petropavlovsk (UTC+5) regardless of visitor timezone.
  const shopNow = () => {
    const d = new Date();
    return new Date(d.getTime() + d.getTimezoneOffset() * 60000 + S.hours.utcOffset * 3600000);
  };

  /* ---------- render content ---------- */
  document.body.classList.add("is-loading");
  $("[data-year]").textContent = new Date().getFullYear();

  $("[data-services]").innerHTML = S.services.map((s) => `
    <div class="price reveal" data-pick-service="${s.id}" tabindex="0" role="button" aria-label="Записаться: ${esc(s.name)}">
      <span class="price__name">${esc(s.name)}</span>
      <span class="price__desc">${esc(s.desc)}</span>
      <span class="price__value">${s.price ? `${s.from ? "от " : ""}${fmtPrice(s.price)}` : `<span class="ask">уточняйте</span>`}<small>записаться →</small></span>
    </div>`).join("");

  $("[data-team]").innerHTML = S.team.map((m, i) => `
    <article class="member reveal" style="--d:${i * 0.08}s">
      <div class="member__art">${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}" loading="lazy">` : `<span class="member__initial" aria-hidden="true">${esc(m.name[0])}</span>`}</div>
      <h3>${esc(m.name)}</h3>
      <p>${esc(m.role)}${m.instagram ? ` · <a href="https://www.instagram.com/${esc(m.instagram)}/" target="_blank" rel="noopener">@${esc(m.instagram)}</a>` : ""}</p>
      <button class="member__book" data-pick-master="${esc(m.name)}">Записаться к ${esc(m.name)} →</button>
    </article>`).join("");

  // Gallery: real photos/videos from data.js, padded with brand tiles.
  const gallery = S.gallery || [];
  const media = gallery.map((g, i) => {
    const cls = g.video || i % 5 === 0 ? "tile--tall" : i % 7 === 3 ? "tile--wide" : "";
    const inner = g.video
      ? `<video src="${esc(g.video)}" ${g.poster ? `poster="${esc(g.poster)}"` : ""} muted loop playsinline preload="metadata" aria-label="${esc(g.caption || "")}"></video>`
      : `<img src="${esc(g.src)}" alt="${esc(g.caption || "Работа мастера Akezhan")}" loading="lazy">`;
    return `<figure class="tile ${cls} reveal" data-lb-index="${i}" style="--d:${(i % 4) * 0.06}s">${inner}${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ""}</figure>`;
  });
  const brandTiles = [
    `<a class="tile tile--cta tile--gold tile--wide reveal" href="https://2gis.kz/petropavlovsk/firm/70000001061069937/tab/photos" target="_blank" rel="noopener">
       <h3>Фото барбершопа в 2GIS</h3><p>Интерьер и работы мастеров</p><span class="arrow">→</span></a>`,
    `<div class="tile tile--art tile--tall reveal" aria-hidden="true"><span class="pole"></span></div>`,
    `<div class="tile tile--quote reveal"><blockquote>«Чёткий барбершоп, уютно, мастера знают своё дело»</blockquote><cite>Расул, 2GIS</cite></div>`,
    `<a class="tile tile--cta reveal" href="https://www.instagram.com/akezhan_barbershop/" target="_blank" rel="noopener">
       <h3>Instagram</h3><p>Свежие ролики: @akezhan_barbershop</p><span class="arrow">→</span></a>`,
    `<div class="tile tile--quote reveal"><blockquote>«Хожу сюда уже 4 года»</blockquote><cite>Диас, 2GIS</cite></div>`,
    `<a class="tile tile--cta reveal" href="#booking"><h3>Ваша стрижка следующая</h3><p>Запись в WhatsApp за минуту</p><span class="arrow">→</span></a>`
  ];
  $("[data-gallery]").innerHTML = media.length ? media.concat([brandTiles[0], brandTiles[3], brandTiles[2]]).join("") : brandTiles.join("");

  $("[data-reviews]").innerHTML = S.reviews.map((r) => `
    <article class="review">
      <div class="review__mark" aria-hidden="true">“</div>
      <p>${esc(r.text)}</p>
      <footer><div class="review__avatar" aria-hidden="true">${esc([...r.author][0])}</div><div><b>${esc(r.author)}</b><span>★★★★★</span></div></footer>
    </article>`).join("");

  /* ---------- open / closed status ---------- */
  const updateStatus = () => {
    const now = shopNow();
    const h = now.getHours() + now.getMinutes() / 60;
    const open = h >= S.hours.open && h < S.hours.close;
    const text = open ? `Открыто до ${S.hours.close}:00` : `Откроемся в ${S.hours.open}:00`;
    $$("[data-open-status]").forEach((el) => { el.classList.toggle("open", open); $("b", el).textContent = text; });
  };
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- smooth scroll (Lenis if available) ---------- */
  let lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
  const header = $(".header");
  const burger = $(".burger");
  const menu = $(".mobile-menu");
  const scrollToTarget = (target) => {
    const el = typeof target === "string" ? (target === "#top" ? document.body : $(target)) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: el === document.body ? 0 : -70 });
    else window.scrollTo({ top: el === document.body ? 0 : el.getBoundingClientRect().top + scrollY - 70, behavior: reduceMotion ? "auto" : "smooth" });
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2) return;
    e.preventDefault();
    closeMenu();
    scrollToTarget(id);
  });

  /* ---------- header, progress, active nav, fab ---------- */
  const progress = $(".progress");
  const fab = $(".fab");
  const sections = $$("main section[id]");
  const navLinks = $$(".nav a");
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("scrolled", y > 40);
    header.classList.toggle("hide", y > 400 && y > lastY && !menu.classList.contains("open"));
    fab.classList.toggle("show", y > innerHeight * 0.7);
    lastY = y;
    let current = "";
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
    parallax(y);
  };
  const scissors = $(".hero__scissors");
  const glow = $(".hero__glow");
  const parallax = (y) => {
    if (reduceMotion || y > innerHeight * 1.2) return;
    scissors.style.translate = `0 ${y * 0.25}px`;
    glow.style.translate = `0 ${y * 0.15}px`;
  };
  addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  function closeMenu() {
    if (!menu.classList.contains("open")) return;
    menu.classList.remove("open");
    menu.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("lock");
    lenis && lenis.start();
  }
  burger.addEventListener("click", () => {
    if (menu.classList.contains("open")) return closeMenu();
    menu.classList.add("open");
    menu.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("lock");
    lenis && lenis.stop();
  });

  /* ---------- reveal on scroll ---------- */
  $$(".split").forEach((el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(part); return; }
            const w = document.createElement("span");
            w.className = "w";
            w.innerHTML = `<span style="--d:${i++ * 0.06}s">${esc(part)}</span>`;
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const observeReveals = () => $$(".reveal:not(.in), .split:not(.in)").forEach((el) => io.observe(el));

  /* ---------- counters ---------- */
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      counterIO.unobserve(en.target);
      const el = en.target;
      const end = +el.dataset.count;
      const dec = +(el.dataset.decimals || 0);
      const dur = reduceMotion ? 1 : 1800;
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const v = end * (1 - Math.pow(1 - p, 4));
        el.textContent = v.toFixed(dec).replace(".", ",");
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  /* ---------- custom cursor, magnetic buttons, tilt ---------- */
  if (finePointer && !reduceMotion) {
    const cursor = $(".cursor");
    let cx = -100, cy = -100, tx = -100, ty = -100;
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; cursor.classList.add("on"); }, { passive: true });
    document.addEventListener("mouseleave", () => cursor.classList.remove("on"));
    const loop = () => {
      cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
      cursor.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", (e) => cursor.classList.toggle("hover", !!e.target.closest("a, button, .price, .tile, input, textarea")));

    $$(".magnetic").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
        el.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
      });
      el.addEventListener("mouseleave", () => { el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px"); });
    });

    $$(".tilt").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    $$(".member").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--py", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }

  /* ---------- reviews slider ---------- */
  const slider = $("[data-slider]");
  const track = $("[data-reviews]");
  const cards = $$(".review", track);
  const dotsWrap = $("[data-dots]");
  let index = 0;
  dotsWrap.innerHTML = cards.map((_, i) => `<button aria-label="Отзыв ${i + 1}"></button>`).join("");
  const dots = $$("button", dotsWrap);
  const step = () => cards[0].getBoundingClientRect().width + 20;
  const maxIndex = () => {
    const visible = Math.max(1, Math.floor((slider.clientWidth - 20) / step()));
    return Math.max(0, cards.length - visible);
  };
  const go = (i) => {
    index = Math.max(0, Math.min(maxIndex(), i));
    track.style.transform = `translateX(${-index * step()}px)`;
    cards.forEach((c, k) => c.classList.toggle("is-active", k === index));
    dots.forEach((d, k) => d.classList.toggle("on", k === index));
  };
  $("[data-prev]").addEventListener("click", () => { go(index - 1); restartAuto(); });
  $("[data-next]").addEventListener("click", () => { go(index >= maxIndex() ? 0 : index + 1); restartAuto(); });
  dots.forEach((d, k) => d.addEventListener("click", () => { go(k); restartAuto(); }));
  addEventListener("resize", () => go(index));

  let startX = 0, dx = 0, dragging = false;
  slider.addEventListener("pointerdown", (e) => { dragging = true; startX = e.clientX; dx = 0; slider.classList.add("drag"); slider.setPointerCapture(e.pointerId); stopAuto(); });
  slider.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    track.style.transform = `translateX(${-index * step() + dx}px)`;
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    slider.classList.remove("drag");
    if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1)); else go(index);
    restartAuto();
  };
  slider.addEventListener("pointerup", endDrag);
  slider.addEventListener("pointercancel", endDrag);

  let auto = null;
  const stopAuto = () => clearInterval(auto);
  const restartAuto = () => {
    stopAuto();
    if (!reduceMotion) auto = setInterval(() => go(index >= maxIndex() ? 0 : index + 1), 5000);
  };

  /* ---------- lightbox ---------- */
  const lb = $("[data-lightbox]");
  const lbImg = $("[data-lb-img]");
  const lbCap = $("[data-lb-cap]");
  const photos = gallery.filter((g) => g.src);
  let lbIndex = 0;
  const showLb = (i) => {
    lbIndex = (i + photos.length) % photos.length;
    lbImg.src = photos[lbIndex].src;
    lbImg.alt = photos[lbIndex].caption || "";
    lbCap.textContent = photos[lbIndex].caption || "";
  };
  const openLb = (i) => { showLb(i); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.classList.add("lock"); lenis && lenis.stop(); };
  const closeLb = () => { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); lenis && lenis.start(); };
  $$("[data-lb-index]").forEach((t) => {
    const g = gallery[+t.dataset.lbIndex];
    if (g.video) {
      const v = $("video", t);
      // играем только то, что на экране
      new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())), { threshold: 0.4 }).observe(t);
      t.addEventListener("click", () => (v.paused ? v.play() : v.pause()));
    } else {
      t.addEventListener("click", () => openLb(photos.indexOf(g)));
    }
  });
  $("[data-lb-close]").addEventListener("click", closeLb);
  $("[data-lb-prev]").addEventListener("click", () => showLb(lbIndex - 1));
  $("[data-lb-next]").addEventListener("click", () => showLb(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLb(); closeMenu(); }
    if (!lb.classList.contains("open")) return;
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
  });

  /* ---------- booking form ---------- */
  const form = $("[data-booking]");
  const state = { service: S.services[0].id, master: "Любой", day: null, time: null };
  const radioGroup = (wrap, items, key, cls = "chip") => {
    wrap.innerHTML = items.map((it) => `<button type="button" class="${cls}" role="radio" aria-checked="${it.value === state[key]}" data-value="${esc(it.value)}" ${it.disabled ? "disabled" : ""}>${it.label}</button>`).join("");
    wrap.onclick = (e) => {
      const b = e.target.closest("button");
      if (!b || b.disabled) return;
      state[key] = b.dataset.value;
      $$("button", wrap).forEach((x) => x.setAttribute("aria-checked", x === b ? "true" : "false"));
      if (key === "day") renderTimes();
      $("[data-form-error]").textContent = "";
    };
  };
  const setChoice = (key, value) => {
    state[key] = value;
    const wrap = key === "service" ? $("[data-service-chips]") : $("[data-master-chips]");
    $$("button", wrap).forEach((x) => x.setAttribute("aria-checked", x.dataset.value === value ? "true" : "false"));
  };

  radioGroup($("[data-service-chips]"), S.services.map((s) => ({ value: s.id, label: esc(s.name) })), "service");
  radioGroup($("[data-master-chips]"), [{ value: "Любой", label: "Любой мастер" }].concat(S.team.map((m) => ({ value: m.name, label: esc(m.name) }))), "master");

  const wd = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const days = [];
  const now = shopNow();
  const lastSlot = S.hours.close - S.slotMinutes / 60;
  for (let i = 0; days.length < 14; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    if (i === 0 && now.getHours() + now.getMinutes() / 60 >= lastSlot) continue;
    days.push(d);
  }
  const dayKey = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  state.day = dayKey(days[0]);
  radioGroup($("[data-days]"), days.map((d, i) => ({
    value: dayKey(d),
    label: `<small>${i === 0 && d.getDate() === now.getDate() ? "Сег" : wd[d.getDay()]}</small><b>${d.getDate()}</b>`
  })), "day", "day");

  function renderTimes() {
    const d = days.find((x) => dayKey(x) === state.day);
    const n = shopNow();
    const isToday = d.getDate() === n.getDate() && d.getMonth() === n.getMonth();
    const slots = [];
    for (let m = S.hours.open * 60; m <= lastSlot * 60; m += S.slotMinutes) {
      const label = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
      slots.push({ value: label, label, disabled: isToday && m <= n.getHours() * 60 + n.getMinutes() + 30 });
    }
    if (slots.find((s) => s.value === state.time && s.disabled) || !slots.find((s) => s.value === state.time)) state.time = null;
    radioGroup($("[data-times]"), slots, "time", "time");
  }
  renderTimes();

  document.addEventListener("click", (e) => {
    const svc = e.target.closest("[data-pick-service]");
    const mst = e.target.closest("[data-pick-master]");
    if (svc) { setChoice("service", svc.dataset.pickService); scrollToTarget("#booking"); }
    if (mst) { setChoice("master", mst.dataset.pickMaster); scrollToTarget("#booking"); }
  });
  $$("[data-pick-service]").forEach((el) => el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); } }));

  const toast = (msg) => {
    const t = $("[data-toast]");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => t.classList.remove("show"), 3200);
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const err = $("[data-form-error]");
    form.name.classList.toggle("invalid", !name);
    let msg = "";
    if (!name) msg = "Пожалуйста, укажите имя.";
    else if (!state.time) msg = "Выберите удобное время.";
    if (msg) {
      err.textContent = msg;
      form.classList.remove("shake"); void form.offsetWidth; form.classList.add("shake");
      return;
    }
    const svc = S.services.find((s) => s.id === state.service);
    const d = days.find((x) => dayKey(x) === state.day);
    const lines = [
      "Здравствуйте! Хочу записаться в Akezhan Barbershop.",
      `Имя: ${name}`,
      `Услуга: ${svc.name}`,
      `Мастер: ${state.master}`,
      `Дата: ${wd[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}, ${state.time}`
    ];
    const comment = form.comment.value.trim();
    if (comment) lines.push(`Комментарий: ${comment}`);
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
    toast("Открываем WhatsApp, отправьте сообщение мастеру");
  });
  form.name.addEventListener("input", () => form.name.classList.remove("invalid"));

  /* ---------- start ---------- */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    document.body.classList.remove("is-loading");
    $(".preloader").classList.add("done");
    document.body.classList.add("is-ready");
    observeReveals();
    $$("[data-count]").forEach((el) => counterIO.observe(el));
    go(0);
    restartAuto();
    onScroll();
  };
  const minDelay = reduceMotion ? 0 : 1300;
  const t0 = performance.now();
  const ready = () => setTimeout(start, Math.max(0, minDelay - (performance.now() - t0)));
  if (document.readyState === "complete") ready(); else addEventListener("load", ready);
  setTimeout(start, 4000);
})();

(() => {
  const B = {
    wa: "201111965482", n: "01111965482",
    tt: "https://www.tiktok.com/@mohamedtaiyara",
    items: [
      { n: "تيشيرت إسبانيا", d: "أبيض بحواف عنابي", img: "jersey-spain", k: "تيشيرت منتخب اسبانيا ابيض" },
      { n: "تيشيرت الأهلي", d: "أحمر", img: "shirt-ahly", k: "تيشيرت الاهلي احمر نادي" },
      { n: "ترتان أزرق", d: "أحذية ملاعب", img: "cleats-blue", k: "ترتان حذاء جزمة ازرق" },
      { n: "تيشيرت أبيض", d: "بحواف خضرا", img: "jersey-real", k: "تيشيرت ابيض نادي" },
      { n: "بنطلون تدريب", d: "أسود بخطوط بيضا", img: "pants", k: "بنطلون تدريب اسود طقم" },
      { n: "تيشيرت الأرجنتين", d: "أبيض وسماوي", img: "shirt-arg", k: "تيشيرت منتخب الارجنتين" },
      { n: "تيشيرت أحمر", d: "نادي", img: "jersey-red", k: "تيشيرت احمر نادي" },
    ],
    faqs: [
      ["إزاي أطلب؟", "ابعتلنا المنتج والمقاس على واتساب 01111965482، وهنرد عليك بالمتاح والسعر."],
      ["المحل فين؟", "في الف مسكن، القاهرة. ابعت على واتساب لو عايز توصل بالظبط."],
      ["الترتان عليه ضمان؟", "حسب فيديوهات المحل: الترتان عليه ضمان شهرين، ومعاه شراب هدية."],
      ["مقاسات الترتان؟", "الترتان الفيتنامي من ٣٦ لحد ٤٥ زي ما اتقال في الفيديو. اسأل على المقاس اللي محتاجه."],
      ["الأسعار ثابتة؟", "الأسعار اللي في الموقع من فيديوهات تيك توك، وممكن تتغير. اتأكد على واتساب."],
    ],
  };
  const $ = (s) => document.querySelector(s), $$ = (s) => [...document.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wa = (t) => `https://wa.me/${B.wa}?text=${encodeURIComponent(t)}`;
  const hello = "أهلاً أ/ محمد، عايز أسأل عن المنتجات";
  const open = (t) => window.open(wa(t), "_blank", "noopener");

  ["#uWa", "#bagWa"].forEach((s) => ($(s).href = wa(hello)));
  $("#dealWa").href = wa("أهلاً، عايز أسأل عن الترتان المتاح والمقاسات");
  ["#uTt", "#fTt", "#mTt"].forEach((s) => ($(s).href = B.tt));
  $("#fWa").href = wa(hello); $("#fWa").textContent = B.n;

  // tiles
  $$(".tile").forEach((t, i) => { t.style.setProperty("--d", `${(i % 2) * 0.08}s`); t.addEventListener("click", () => open(`أهلاً، عايز أسأل عن ${t.dataset.ask}`)); });

  // carousel
  const rail = $("#rail");
  rail.innerHTML = B.items.map((it, i) => `<article class="card" data-i="${i}"><div class="ci"><img src="img/${it.img}.jpg" alt="${it.n}" loading="lazy"><span class="name">${it.n}</span></div><p><b>${it.d}</b> · اسأل عن السعر</p></article>`).join("");
  rail.addEventListener("click", (e) => { const c = e.target.closest(".card"); if (!c) return; const it = B.items[+c.dataset.i]; open(`أهلاً، عايز أسأل عن السعر: ${it.n} (${it.d})\nالمقاس: `); });
  const step = () => rail.querySelector(".card:not([hidden])")?.offsetWidth + 12 || 300;
  // RTL: scrollLeft goes 0 → negative
  $("#next").onclick = () => rail.scrollBy({ left: -step() });
  $("#prev").onclick = () => rail.scrollBy({ left: step() });
  const arrows = () => { const max = rail.scrollWidth - rail.clientWidth; $("#prev").disabled = rail.scrollLeft >= -2; $("#next").disabled = -rail.scrollLeft >= max - 2; };
  rail.addEventListener("scroll", arrows, { passive: true }); arrows();

  // search filters the carousel
  const norm = (s) => s.replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").toLowerCase().trim();
  $("#q").addEventListener("input", (e) => {
    const q = norm(e.target.value); let shown = 0;
    $$(".card").forEach((c) => { const it = B.items[+c.dataset.i]; const ok = !q || norm(`${it.n} ${it.d} ${it.k}`).includes(q); c.hidden = !ok; shown += ok; });
    $("#empty").hidden = shown > 0; rail.scrollLeft = 0; arrows();
  });
  $("#q").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); $("#new").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); } });

  $("#faqList").innerHTML = B.faqs.map(([q, a]) => `<details class="rv"><summary>${q}</summary><p>${a}</p></details>`).join("");
  $("#orderForm").onsubmit = (e) => { e.preventDefault(); const v = $("#fItem").value.trim(); open(v ? `أهلاً أ/ محمد، عايز أطلب: ${v}` : hello); };

  // menu
  const menu = $("#menu"), bg = $("#burger");
  const setMenu = (o) => { if (o) menu.style.setProperty("--hh", Math.max(0, Math.round($(".nav").getBoundingClientRect().bottom)) + "px"); menu.classList.toggle("open", o); bg.setAttribute("aria-expanded", o); root.classList.toggle("lock", o); };
  bg.onclick = () => setMenu(!menu.classList.contains("open"));
  menu.addEventListener("click", (e) => e.target.closest("a") && setMenu(false));
  addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  // reveals
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((en) => en.forEach((x) => { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } }), { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
    $$(".rv").forEach((e) => io.observe(e));
  } else $$(".rv").forEach((e) => e.classList.add("in"));

  // loader
  let started = false;
  const start = () => { if (started) return; started = true; $("#loader").classList.add("gone"); root.classList.remove("loading"); root.classList.add("ready"); };
  if (reduce) start();
  else {
    const min = new Promise((r) => setTimeout(r, 1200));
    const loaded = new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r)));
    Promise.all([min, loaded]).then(start);
    setTimeout(start, 4000);
  }

  // parallax on the two dark photos
  const par = $$(".hero img, .deal-ph img");
  let raf = 0;
  const frame = () => { raf = 0; par.forEach((im) => { const r = im.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return; im.style.setProperty("--py", `${(r.top + r.height / 2 - innerHeight / 2) * -0.06}px`); }); };
  if (!reduce) { addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true }); frame(); }
})();

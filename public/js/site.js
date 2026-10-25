/* Augmain v3 : menu, calculateur, avant / après, formulaire vers WhatsApp et animations au défilement. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calme = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const WA = "https://wa.me/33604980726?text=";
  const euros = n => Math.round(n).toLocaleString("fr-FR").replace(/ | /g, " ");

  /* ---- En-tête : fond au défilement, menu téléphone, sous-menu ---- */
  const haut = $("#haut"), burger = $(".burger"), menu = $("#menu");
  const colle = () => haut.classList.toggle("colle", scrollY > 10);
  addEventListener("scroll", colle, { passive: true }); colle();
  burger?.addEventListener("click", () => {
    const o = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", o); menu.classList.toggle("ouvert", o);
    burger.setAttribute("aria-label", o ? "Fermer le menu" : "Ouvrir le menu");
  });
  $$(".deroulant > button").forEach(b => b.addEventListener("click", () => {
    const d = b.parentElement, o = !d.classList.contains("ouvert");
    d.classList.toggle("ouvert", o); b.setAttribute("aria-expanded", o);
  }));
  $$("#menu a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("ouvert"); burger?.setAttribute("aria-expanded", "false");
    $$(".deroulant").forEach(d => d.classList.remove("ouvert"));
  }));
  document.addEventListener("click", e => { if (!e.target.closest(".deroulant")) $$(".deroulant").forEach(d => { d.classList.remove("ouvert"); d.firstElementChild.setAttribute("aria-expanded", "false"); }); });

  /* ---- Barre de contact sur téléphone : apparaît après l'ouverture ---- */
  const barre = $(".barre-mobile");
  if (barre) {
    const ouverture = $(".ouverture");
    if (ouverture) new IntersectionObserver(e => barre.classList.toggle("visible", !e[0].isIntersecting), { threshold: 0.15 }).observe(ouverture);
    else barre.classList.add("visible");
  }

  /* ---- Le test : 5 questions auxquelles tout patron sait répondre en regardant sa fiche Google ---- */
  const QUESTIONS = [
    { q: "Quand on tape le nom de votre commerce sur Google, il apparaît avec le bon nom ?", a: "Pas de fiche, ou encore l'ancien nom ? C'est un « non ».",
      fix: "Mettre votre fiche Google à votre nom", google: true },
    { q: "Vos horaires sur Google sont justes, jours fériés compris ?", a: "Regardez votre fiche : un client qui trouve porte close ne revient pas.",
      fix: "Corriger vos horaires, jours fériés compris", google: true },
    { q: "Il y a des photos de moins d'un an sur votre fiche ?", a: "La devanture, la salle, ce que vous vendez.",
      fix: "Ajouter de vraies photos récentes", google: true },
    { q: "Vous avez reçu au moins un avis Google ce mois-ci ?", a: "Les clients regardent d'abord les avis les plus récents.",
      fix: "Récolter des avis chaque semaine (QR code au comptoir)", google: true },
    { q: "Vous avez un site ou une carte en ligne qui s'ouvre bien sur téléphone ?", a: "Une page Facebook abandonnée ne compte pas.",
      fix: "Avoir un site clair sur téléphone : carte, horaires, réservation", site: true }
  ];
  const quiz = $("#quiz");
  if (quiz) {
    let n = 0, reps = [];
    const montre = () => {
      $("#quiz-etape").textContent = `Question ${n + 1} sur ${QUESTIONS.length}`;
      $("#quiz-avance").style.width = (n / QUESTIONS.length * 100) + "%";
      $("#quiz-question").textContent = QUESTIONS[n].q;
      $("#quiz-aide").textContent = QUESTIONS[n].a;
      if (!calme) $("#quiz-corps").animate([{ opacity: 0, transform: "translateX(24px)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: "ease-out" });
    };
    const fin = () => {
      $("#quiz-avance").style.width = "100%";
      $("#quiz-etape").textContent = "Votre résultat";
      $("#quiz-corps").hidden = true; $("#quiz-fin").hidden = false;
      const note = reps.filter(r => r === "oui").length, rates = QUESTIONS.filter((_, i) => reps[i] !== "oui");
      $("#quiz-note").textContent = note;
      $("#quiz-verdict").textContent = note === 5 ? "Bravo : votre commerce est bien présenté. On peut vous aider à le garder à jour."
        : note >= 3 ? "Pas mal, mais des clients vous ratent encore. Voici quoi corriger :"
        : "Aujourd'hui, beaucoup de clients ne vous trouvent pas, ou passent au voisin. Voici quoi corriger :";
      $("#quiz-a-faire").innerHTML = rates.map(x => `<li>${x.fix}</li>`).join("");
      const g = rates.some(x => x.google), s = rates.some(x => x.site);
      const offre = g && s ? ["Fiche Google à jour + site internet", "290 € + 690 €", "Une seule fois. Ou le pack tout compris, dès 1 500 €."]
        : g ? ["Votre fiche Google à jour", "290 €", "Une seule fois. Prête en une semaine."]
        : s ? ["Votre site internet", "690 €", "Une seule fois. En ligne en 2 à 3 semaines."]
        : ["Le suivi mensuel", "29 €/mois", "On garde tout à jour pour vous, sans engagement."];
      $("#quiz-offre").innerHTML = `<span>Pour vous</span><b>${offre[0]}</b><strong>${offre[1]}</strong><em>${offre[2]}</em>`;
      const resume = QUESTIONS.map((x, i) => `${i + 1}. ${reps[i] === "oui" ? "oui" : reps[i] === "non" ? "non" : "je ne sais pas"}`).join(", ");
      $("#quiz-cta").href = WA + encodeURIComponent(`Bonjour Augmain, j'ai fait le test : ${note}/5 (${resume}). Je voudrais mon plan gratuit. Mon commerce : `);
      if (!calme) $("#quiz-fin").animate([{ opacity: 0, transform: "scale(.96)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: "cubic-bezier(.3,1.3,.5,1)" });
      try { window.va && window.va("event", { name: "test", data: { note } }); } catch (e) {}
    };
    $$(".quiz-choix button").forEach(b => b.addEventListener("click", () => { reps[n] = b.dataset.rep; n++; n < QUESTIONS.length ? montre() : fin(); }));
    $("#quiz-refaire").addEventListener("click", () => { n = 0; reps = []; $("#quiz-fin").hidden = true; $("#quiz-corps").hidden = false; montre(); });
    montre();
  }

  /* ---- Avant / après ---- */
  const aa = $("#aa-curseur");
  if (aa) {
    const avant = $("#aa-avant"), poignee = $(".aa-poignee");
    const place = v => { avant.style.clipPath = `inset(0 ${100 - v}% 0 0)`; poignee.style.left = v + "%"; };
    aa.addEventListener("input", () => place(aa.value));
    place(aa.value);
    /* petit balancement la première fois qu'on la voit, pour montrer qu'on peut la faire glisser */
    if (!calme) new IntersectionObserver((e, o) => {
      if (!e[0].isIntersecting) return; o.disconnect();
      const t0 = performance.now();
      const pas = now => { const k = (now - t0) / 1600; if (k > 1) { place(50); aa.value = 50; return; } place(50 + Math.sin(k * Math.PI * 2) * 22 * (1 - k)); requestAnimationFrame(pas); };
      requestAnimationFrame(pas);
    }, { threshold: 0.5 }).observe(aa);
  }

  /* ---- Formulaire : le message part dans WhatsApp ---- */
  const form = $("#formulaire");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form), prenom = String(d.get("prenom") || "").trim(), commerce = String(d.get("commerce") || "").trim();
    const aide = $("#form-aide");
    if (!prenom || !commerce) { aide.textContent = "Il manque votre prénom ou le nom de votre commerce."; aide.classList.add("erreur"); (prenom ? form.commerce : form.prenom).focus(); return; }
    aide.classList.remove("erreur"); aide.textContent = "WhatsApp s'ouvre avec votre message.";
    open(WA + encodeURIComponent(`Bonjour Augmain, je suis ${prenom} (${commerce}). Ce qui m'intéresse : ${d.get("besoin")}.`), "_blank", "noopener");
  });

  /* ---- Offres : le menu « Services » met en avant l'offre choisie ---- */
  $$("[data-service]").forEach(a => a.addEventListener("click", () => {
    const o = $("#offre-" + a.dataset.service); if (!o || calme) return;
    setTimeout(() => o.animate([{ boxShadow: "0 0 0 0 rgba(255,200,61,.9)" }, { boxShadow: "0 0 0 14px rgba(255,200,61,0)" }], { duration: 900, iterations: 2 }), 500);
  }));

  /* ---- Cartes d'offres qui s'inclinent sous la souris ---- */
  if (!calme && matchMedia("(hover:hover)").matches) $$(".offre").forEach(o => {
    o.addEventListener("mousemove", e => { const r = o.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; o.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`; });
    o.addEventListener("mouseleave", () => { o.style.transform = ""; });
  });

  /* ---- Mesure des clics sur les appels à l'action (Vercel Web Analytics) ---- */
  $$("[data-cta]").forEach(a => a.addEventListener("click", () => { try { window.va && window.va("event", { name: "cta", data: { ou: a.dataset.cta } }); } catch (e) {} }));

  /* ---- Animations au défilement (GSAP) ---- */
  const go = () => {
    if (calme || !window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add("anime");

    /* ouverture : le titre ligne par ligne, puis la rue s'éloigne en douceur au défilement */
    gsap.from(".ouverture h1 .ligne", { yPercent: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" });
    gsap.from([".ouverture .lieu", ".ouverture .chapo", ".ouverture .actions", ".ouverture .preuves"], { y: 20, opacity: 0, duration: 0.7, stagger: 0.08, delay: 0.35, ease: "power2.out" });
    gsap.from("#rue", { scale: 0.9, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.15 });
    gsap.to("#rue .scene", { scale: 1.12, yPercent: -6, ease: "none", scrollTrigger: { trigger: ".ouverture", start: "top top", end: "bottom top", scrub: true } });

    /* la carte d'Augmain : l'ardoise se pose, puis les lignes s'écrivent une à une */
    gsap.from(".ardoise", { y: 60, rotate: -1.5, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".la-carte", start: "top 80%" } });
    gsap.from(".plats li", { x: -30, opacity: 0, duration: 0.55, stagger: 0.14, delay: 0.25, ease: "power2.out", scrollTrigger: { trigger: ".la-carte", start: "top 80%" } });
    gsap.from(".plat-ligne i", { scaleX: 0, transformOrigin: "left", duration: 0.6, stagger: 0.14, delay: 0.45, ease: "power2.out", scrollTrigger: { trigger: ".la-carte", start: "top 80%" } });

    /* problème : les cartes arrivent en éventail, le nom barré se raye */
    gsap.from(".carte-pb", { y: 60, rotate: i => [-4, 0, 4][i % 3], opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.4)", scrollTrigger: { trigger: ".trois", start: "top 80%" } });
    $$(".barre-nom").forEach(b => { b.style.setProperty("--barre", 0); ScrollTrigger.create({ trigger: b, start: "top 80%", onEnter: () => b.style.setProperty("--barre", 1) }); });

    /* le test : la carte de questions se pose */
    gsap.from(".quiz", { y: 50, opacity: 0, rotate: 2, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".test", start: "top 70%" } });

    /* offres : les prix tombent comme un tampon */
    gsap.from(".offre", { y: 70, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: ".offres", start: "top 80%" } });
    gsap.from(".offre .prix b", { scale: 1.8, rotate: -8, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "back.out(2.2)", scrollTrigger: { trigger: ".offres", start: "top 80%" } });

    /* réalisations : l'écran du site glisse sur la photo */
    gsap.fromTo(".cas-ecran", { yPercent: 25 }, { yPercent: -10, ease: "none", scrollTrigger: { trigger: ".cas", start: "top bottom", end: "bottom top", scrub: true } });

    /* méthode : le chemin se trace et le petit bonhomme avance avec le défilement */
    const zone = $(".trajet-zone");
    if (zone) {
      ScrollTrigger.create({ trigger: zone, start: "top 75%", end: "bottom 45%", scrub: true,
        onUpdate: s => zone.style.setProperty("--avance", s.progress.toFixed(3)) });
      zone.style.setProperty("--avance", 0);
      gsap.from(".etapes li", { y: 30, opacity: 0, stagger: 0.15, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: zone, start: "top 75%" } });
    }

    /* titres : un léger glissement, une seule fois */
    $$(".grand-titre").forEach(t => { if (t.closest(".ouverture")) return; gsap.from(t, { y: 36, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: t, start: "top 85%" } }); });
  };
  if (document.readyState === "complete") go(); else addEventListener("load", go);
})();

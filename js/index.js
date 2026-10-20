
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Toggle mobile navigation
menuToggle.addEventListener("click", () => {
    nav.classList.toggle("open");

    const isOpen = nav.classList.contains("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Close navigation after clicking a link
nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Reveal page content as it enters the viewport, when motion is welcome.
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealTargets = document.querySelectorAll(
        ".section-label, .two-column > *, .section-heading, .skill-card, .project-card, .cat-copy, .cat-widget, .education-content > *, .contact-layout > *"
    );

    revealTargets.forEach((element, index) => {
        element.classList.add("reveal-item");
        if (element.matches(".skill-card")) element.style.transitionDelay = `${(index % 3) * 70}ms`;
    });

    document.documentElement.classList.add("reveal-ready");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => revealObserver.observe(element));
}

// Tiny desk companion interactions
const pixelCat = document.getElementById("pixelCat");
const catMessage = document.getElementById("catMessage");
const catMood = document.getElementById("catMood");
const catBond = document.getElementById("catBond");
let bond = 0;
let actionCooldown = false;

const catResponses = {
    pet: ["Kira is purring. Best teammate ever.", "Kira leans into your hand.", "A happy little purr from Kira."],
    play: ["Kira chases the imaginary cursor!", "Kira does a tiny victory jump.", "Kira is ready for another round!"],
    snack: ["Crunch crunch. Kira says thanks!", "Treat accepted. You and Kira are now best friends.", "Kira has gained +1 snack energy."]
};

document.querySelectorAll("[data-cat-action]").forEach((button) => {
    button.addEventListener("click", () => {
        if (actionCooldown) return;

        const action = button.dataset.catAction;
        const responses = catResponses[action];
        catMessage.textContent = responses[Math.floor(Math.random() * responses.length)];
        catMood.textContent = action === "play" ? "Playful" : action === "snack" ? "Pleased" : "Content";
        bond += 1;
        catBond.textContent = bond;
        pixelCat.classList.remove("is-playing", "is-purring");
        void pixelCat.offsetWidth;
        pixelCat.classList.add(action === "play" ? "is-playing" : "is-purring");
        actionCooldown = true;
        window.setTimeout(() => { actionCooldown = false; }, 650);
    });
});

pixelCat.addEventListener("click", () => {
    document.querySelector('[data-cat-action="pet"]').click();
});

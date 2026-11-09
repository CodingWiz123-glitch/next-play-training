
// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    });
});

// Demo contact form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    alert("Thanks for your interest! This is a demonstration website, so your information has not been sent.");

    contactForm.reset();
});

// Scroll reveal animations
const revealElements = document.querySelectorAll(
    ".program-card, .benefit, .about-image, .about-content, .gallery-item"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
});
// Program popup information
const programData = {
    soccer: {
        eyebrow: "01 / FIELD",
        title: "Soccer Training",
        description: "Develop your soccer skills through focused practice and technical training.",
        features: [
            "Ball control and passing",
            "Footwork and coordination",
            "Speed and agility",
            "Game awareness"
        ]
    },

    basketball: {
        eyebrow: "02 / COURT",
        title: "Basketball Training",
        description: "Improve your skills on the court through focused basketball practice.",
        features: [
            "Shooting and finishing",
            "Ball handling",
            "Agility and court movement",
            "Teamwork and game awareness"
        ]
    },

    baseball: {
        eyebrow: "03 / DIAMOND",
        title: "Baseball Training",
        description: "Build your baseball fundamentals and become a more confident player.",
        features: [
            "Throwing and catching",
            "Batting technique",
            "Fielding skills",
            "Coordination and movement"
        ]
    },

    performance: {
        eyebrow: "04 / ALL SPORTS",
        title: "Performance Training",
        description: "Develop athletic skills that can help across multiple sports.",
        features: [
            "Balance and coordination",
            "Speed and movement skills",
            "Agility and footwork",
            "Mobility and body control"
        ]
    }
};

// Popup elements
const programModal = document.getElementById("program-modal");
const modalClose = document.getElementById("modal-close");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalEyebrow = document.getElementById("modal-eyebrow");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalFeatures = document.getElementById("modal-features");
let selectedProgram = "";

// Open popup when a program card is clicked
document.querySelectorAll(".program-open").forEach(card => {
    card.addEventListener("click", () => {
        const program = programData[card.dataset.program];
        selectedProgram = card.dataset.program;

        if (!program) return;

        modalEyebrow.textContent = program.eyebrow;
        modalTitle.textContent = program.title;
        modalDescription.textContent = program.description;

        modalFeatures.innerHTML = "";

        program.features.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        programModal.classList.add("active");
        programModal.setAttribute("aria-hidden", "false");

        modalClose.focus();
    });
});

// Close popup
function closeProgramModal() {
    programModal.classList.remove("active");
    programModal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeProgramModal);
modalBackdrop.addEventListener("click", closeProgramModal);

// Close popup with Escape key
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && programModal.classList.contains("active")) {
        closeProgramModal();
    }
});
// GET STARTED button
const modalStart = document.getElementById("modal-start");
const sportSelect = document.getElementById("sport-select");

modalStart.addEventListener("click", () => {
    const sportNames = {
        soccer: "Soccer",
        basketball: "Basketball",
        baseball: "Baseball",
        performance: "Performance Training"
    };

    // Automatically select the sport
    sportSelect.value = sportNames[selectedProgram];

    // Close the popup
    closeProgramModal();

    // Scroll to the contact form
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
});
// Highlight the navigation link for the current section
const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navigationLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.3
});

pageSections.forEach(section => {
    sectionObserver.observe(section);
});
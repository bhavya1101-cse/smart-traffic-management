/* ================================
MOBILE MENU
================================ */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
navMenu.classList.toggle("show");

const icon = menuBtn.querySelector("i");

if (navMenu.classList.contains("show")) {

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");

} else {

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

}

});

/* Close menu when clicking a link */

document.querySelectorAll("#navMenu a").forEach(link => {
link.addEventListener("click", () => {

    navMenu.classList.remove("show");

    const icon = menuBtn.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");

});

});

/* ================================
ACTIVE NAVIGATION
================================ */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar nav a");

window.addEventListener("scroll", () => {

let current = "";

sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
    ) {

        current = section.getAttribute("id");

    }

});

navLinks.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {

        link.classList.add("active");

    }

});

});

/* ================================
ANIMATED COUNTERS
================================ */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = Number(
                counter.getAttribute("data-target")
            );

            let current = 0;

            const increment = target / 80;

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.innerText =
                        Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target;

                }

            };

            updateCounter();

            observer.unobserve(counter);

        }

    });

},

{
    threshold: 0.7
}

);

counters.forEach(counter => {
observer.observe(counter);

});

/* ================================
REAL TRAFFIC DATA (from Flask backend)
================================ */

const API_URL = "http://127.0.0.1:5000/api/traffic-status";

const lights = document.querySelectorAll(".signal-light");
const vehicleCount = document.getElementById("vehicleCount");

function updateTrafficDashboard() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            vehicleCount.innerText = data.vehicle_count;

            const densityBadge = document.getElementById("densityBadge");
            densityBadge.innerText = data.density;
            densityBadge.className = "density-badge " + data.density.toLowerCase();

            lights.forEach(light => light.classList.remove("active-signal"));

            if (data.signal === "Green") {
                lights[2].classList.add("active-signal");
            } else if (data.signal === "Yellow") {
                lights[1].classList.add("active-signal");
            } else {
                lights[0].classList.add("active-signal");
            }
        })
        .catch(error => {
            console.error("Could not reach traffic backend:", error);
        });
}
// Run once immediately on page load, then repeat every 5 seconds.
updateTrafficDashboard();
setInterval(updateTrafficDashboard, 5000);

/* ================================
BACK TO TOP
================================ */

const backToTop =
document.getElementById("backToTop");

window.addEventListener("scroll", () => {
if (window.scrollY > 500) {

    backToTop.classList.add("show");

} else {

    backToTop.classList.remove("show");

}

});

backToTop.addEventListener("click", () => {
window.scrollTo({

    top: 0,

    behavior: "smooth"

});
});

/* ================================
SCROLL REVEAL ANIMATION
================================ */

const revealElements = document.querySelectorAll(
".module-card, .feature-item, .workflow-step, .gallery-item, .tech-item, .stat-card"
);

const revealObserver = new IntersectionObserver(
entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

},

{
    threshold: 0.15
}


);

revealElements.forEach(element => {
element.style.opacity = "0";
element.style.transform = "translateY(30px)";
element.style.transition =
    "opacity 0.7s ease, transform 0.7s ease";

revealObserver.observe(element);
});
/* ==========================================
   ETIOSA AUTOS & MECHANICAL ENGINEERING
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE NAVIGATION
    ========================== */

    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("show");

        });

    }

    /* ==========================
       STICKY NAVBAR
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            header.style.background = "rgba(0,0,0,.92)";
            header.style.transition = ".3s";

        } else {

            header.style.background = "rgba(0,0,0,.65)";

        }

    });

    /* ==========================
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

            navLinks.classList.remove("show");

        });

    });

    /* ==========================
       SCROLL REVEAL
    ========================== */

    const revealItems = document.querySelectorAll("section,.card,.stat");

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .15

    });

    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = ".8s ease";

        revealObserver.observe(item);

    });

    /* ==========================
       COUNTER ANIMATION
    ========================== */

    const stats = document.querySelectorAll(".stat h2");

    let counterStarted = false;

    function runCounters() {

        if (counterStarted) return;

        counterStarted = true;

        stats.forEach(counter => {

            const text = counter.innerText;

            const number = parseInt(text.replace(/\D/g, ""));

            const suffix = text.replace(/[0-9]/g, "");

            let current = 0;

            const increment = Math.max(1, Math.ceil(number / 80));

            const timer = setInterval(() => {

                current += increment;

                if (current >= number) {

                    current = number;

                    clearInterval(timer);

                }

                counter.innerText = current + suffix;

            }, 25);

        });

    }

    const statSection = document.querySelector(".stats");

    if (statSection) {

        const statObserver = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    runCounters();

                }

            });

        }, {

            threshold: .5

        });

        statObserver.observe(statSection);

    }

    /* ==========================
       ACTIVE NAVIGATION
    ========================== */

    const sections = document.querySelectorAll("section");

    const navItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.clientHeight;

            if (pageYOffset >= top) {

                current = section.getAttribute("id");

            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /* ==========================
       BACK TO TOP BUTTON
    ========================== */

    const topBtn = document.createElement("button");

    topBtn.innerHTML = "↑";

    topBtn.id = "backTop";

    document.body.appendChild(topBtn);

    Object.assign(topBtn.style, {

        position: "fixed",
        right: "25px",
        bottom: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        border: "none",
        background: "#e11d2e",
        color: "#fff",
        fontSize: "22px",
        cursor: "pointer",
        display: "none",
        zIndex: "9999",
        boxShadow: "0 10px 20px rgba(0,0,0,.35)"

    });

    window.addEventListener("scroll", () => {

        topBtn.style.display = window.scrollY > 500 ? "block" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

    /* ==========================
       GALLERY IMAGE ZOOM
    ========================== */

    document.querySelectorAll(".gallery img").forEach(img => {

        img.style.cursor = "zoom-in";

        img.addEventListener("click", () => {

            const overlay = document.createElement("div");

            overlay.style.position = "fixed";
            overlay.style.inset = "0";
            overlay.style.background = "rgba(0,0,0,.92)";
            overlay.style.display = "flex";
            overlay.style.justifyContent = "center";
            overlay.style.alignItems = "center";
            overlay.style.zIndex = "10000";

            const large = document.createElement("img");

            large.src = img.src;

            large.style.maxWidth = "90%";
            large.style.maxHeight = "90%";
            large.style.borderRadius = "12px";

            overlay.appendChild(large);

            overlay.addEventListener("click", () => {

                overlay.remove();

            });

            document.body.appendChild(overlay);

        });

    });

});
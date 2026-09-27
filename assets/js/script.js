/* ==========================================
   MOBILE MENU
========================================== */

const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

if (menuButton && mobileMenu) {

    // Pastikan menu selalu tertutup saat pertama kali halaman dibuka
    mobileMenu.classList.remove("show");

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.toggle("show");

        menuButton.classList.toggle("active");

        const expanded =
            menuButton.getAttribute("aria-expanded") === "true";

        menuButton.setAttribute(
            "aria-expanded",
            !expanded
        );

    });

}

/* ==========================================
   CLOSE AFTER CLICK
========================================== */

document.querySelectorAll("#mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});

/* ==========================================
   CLOSE WHEN RESIZE
========================================== */

window.addEventListener("resize", () => {

    if (window.innerWidth >= 1024) {

        mobileMenu.classList.remove("show");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});

window.addEventListener("DOMContentLoaded", () => {

    if (mobileMenu) {

        mobileMenu.classList.remove("show");

    }

});
// ==========================================
// PREMIUM CARD GLOW EFFECT
// ==========================================

// document.addEventListener("DOMContentLoaded", () => {

//     const cards = document.querySelectorAll(`
//         .service-card,
//         .project-card,
//         .experience-card,
//         .contact-card,
//         .progress-card,
//         .stat-card
//     `);

//     cards.forEach(card => {

//         card.style.position = "relative";
//         card.style.overflow = "hidden";

//         const glow = document.createElement("span");
//         glow.className = "mouse-glow";

//         card.appendChild(glow);

//         card.addEventListener("mousemove", (e) => {

//             const rect = card.getBoundingClientRect();

//             const x = e.clientX - rect.left;
//             const y = e.clientY - rect.top;

//             glow.style.left = `${x}px`;
//             glow.style.top = `${y}px`;

//         });

//     });

// });

// ==========================================
// PERFORMANCE CARD GLOW
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const cards =
            document.querySelectorAll(`
                .service-card,
                .project-card,
                .experience-card,
                .contact-card,
                .progress-card,
                .stat-card
            `);

        cards.forEach((card) => {

            card.style.position =
                "relative";

            card.style.overflow =
                "hidden";

            const glow =
                document.createElement("span");

            glow.className =
                "mouse-glow";

            card.appendChild(glow);

        });


        const finePointer =
            window.matchMedia(
                "(pointer: fine)"
            );

        if (!finePointer.matches) {
            return;
        }


        let activeCard = null;

        let glowX = 0;
        let glowY = 0;

        let glowFrame = null;


        document.addEventListener(
            "pointerover",
            (event) => {

                const card =
                    event.target.closest(
                        ".service-card, .project-card, .experience-card, .contact-card, .progress-card, .stat-card"
                    );

                activeCard = card || null;

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "pointerout",
            (event) => {

                if (
                    activeCard &&
                    !activeCard.contains(
                        event.relatedTarget
                    )
                ) {

                    activeCard = null;

                }

            },
            {
                passive: true
            }
        );


        document.addEventListener(
            "pointermove",
            (event) => {

                if (!activeCard) {
                    return;
                }

                const rect =
                    activeCard.getBoundingClientRect();

                glowX =
                    event.clientX -
                    rect.left;

                glowY =
                    event.clientY -
                    rect.top;


                if (
                    glowFrame === null
                ) {

                    glowFrame =
                        requestAnimationFrame(
                            () => {

                                const glow =
                                    activeCard.querySelector(
                                        ".mouse-glow"
                                    );

                                if (glow) {

                                    glow.style.transform =
                                        `translate3d(
                                            ${glowX}px,
                                            ${glowY}px,
                                            0
                                        ) translate(-50%, -50%)`;

                                }

                                glowFrame = null;

                            }
                        );

                }

            },
            {
                passive: true
            }
        );

    }
);
// ==========================================
// UNIFIED SCROLL FRAME
// Keeps navbar, progress and active navigation updates in one RAF.
// Native wheel/touch scrolling remains untouched for smooth browser momentum.
// ==========================================
// /* ==========================================
//    PERFORMANCE OPTIMIZED SCROLL UI
//    ========================================== */

//    const progressBar =
//    document.getElementById("scroll-progress");

// const scrollSections =
//    document.querySelectorAll("section[id]");

// const navLinks =
//    document.querySelectorAll(".nav-link");

// const backToTopButton =
//    document.getElementById("backToTop");

// const progressCircle =
//    document.querySelector(".progress-ring-circle");


// /* ==========================================
//   PROGRESS CIRCLE
//   ========================================== */

// const radius = 28;

// const circumference =
//    2 * Math.PI * radius;

// if (progressCircle) {

//    progressCircle.style.strokeDasharray =
//        circumference;

// }

// /* ==========================================
//   SCROLL STATE
//   ========================================== */

// let scrollFrame = null;

// /* ==========================================
//   UPDATE SCROLL UI
//   ========================================== */

// function updateScrollUI() {

//    const scrollTop =
//        window.scrollY;


//    const maxScroll =
//        Math.max(
//            1,
//            document.documentElement.scrollHeight -
//            window.innerHeight
//        );


//    const progress =
//        Math.min(
//            1,
//            Math.max(
//                0,
//                scrollTop / maxScroll
//            )
//        );


//    /* ----------------------------------------
//       SCROLL PROGRESS
//       ---------------------------------------- */

//    if (progressBar) {

//        progressBar.style.transform =
//            `scaleX(${progress})`;

//    }

//    /* ----------------------------------------
//       BACK TO TOP
//       ---------------------------------------- */

//    if (backToTopButton) {

//        backToTopButton.classList.toggle(
//            "show",
//            scrollTop > 350
//        );

//    }

//    /* ----------------------------------------
//       NAVBAR
//       ---------------------------------------- */

//    if (window.navbar) {

//        window.navbar.classList.toggle(
//            "scrolled",
//            scrollTop > 24
//        );

//    }

//    /* ----------------------------------------
//       ACTIVE NAVIGATION
//       ---------------------------------------- */

//    let currentId = "";


//    scrollSections.forEach((section) => {

//        const top =
//            section.offsetTop - 150;

//        const bottom =
//            top + section.offsetHeight;


//        if (
//            scrollTop >= top &&
//            scrollTop < bottom
//        ) {

//            currentId =
//                section.id;

//        }

//    });


//    navLinks.forEach((link) => {

//        const isActive =
//            currentId &&
//            link.getAttribute("href") ===
//            `#${currentId}`;


//        link.classList.toggle(
//            "active",
//            isActive
//        );

//    });


//    scrollFrame = null;

// }


// /* ==========================================
//   REQUEST ONE FRAME ONLY
//   ========================================== */

// function requestScrollUI() {

//    if (scrollFrame === null) {

//        scrollFrame =
//            requestAnimationFrame(
//                updateScrollUI
//            );

//    }

// }


// /* ==========================================
//   PASSIVE SCROLL LISTENER
//   ========================================== */

// window.addEventListener(
//    "scroll",
//    requestScrollUI,
//    {
//        passive: true
//    }
// );

// /* ==========================================
//   RESIZE
//   ========================================== */

// window.addEventListener(
//    "resize",
//    requestScrollUI,
//    {
//        passive: true
//    }
// );

/* ==========================================
  INITIAL STATE
  ========================================== */

// updateScrollUI();
/* =========================================================
   BACK TO TOP V7
   LIGHTWEIGHT + VERY SMOOTH
   DESKTOP + MOBILE
   ========================================================= */

   (() => {

    const button =
        document.getElementById("backToTop");

    if (!button) {
        return;
    }

    let animationFrame = null;

    let isScrolling = false;

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    function easeInOutCubic(progress) {

        return progress < 0.5

            ? 4 *
              progress *
              progress *
              progress

            : 1 -
              Math.pow(
                  -2 * progress + 2,
                  3
              ) / 2;
    }

    function scrollToTopSmooth() {

        /* Hentikan animasi sebelumnya */
        if (animationFrame !== null) {

            cancelAnimationFrame(
                animationFrame
            );

            animationFrame = null;
        }

        const startPosition =
            window.scrollY;

        if (startPosition <= 0) {
            return;
        }

        /* Reduced motion */
        if (prefersReducedMotion.matches) {

            window.scrollTo(
                0,
                0
            );

            return;
        }

        /*
         * FIXED DURATION
         *
         * 1500ms = 1.5 detik
         *
         * Tidak tergantung jarak.
         * Jadi terasa konsisten di mobile
         * maupun desktop.
         */
        const duration = 1500;

        const startTime =
            performance.now();

        isScrolling = true;

        function animate(currentTime) {

            const elapsed =
                currentTime -
                startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const eased =
                easeInOutCubic(
                    progress
                );

            const currentPosition =
                startPosition *
                (1 - eased);

            window.scrollTo(
                0,
                currentPosition
            );

            if (progress < 1) {

                animationFrame =
                    requestAnimationFrame(
                        animate
                    );

            } else {

                animationFrame = null;

                isScrolling = false;

                window.scrollTo(
                    0,
                    0
                );
            }
        }

        animationFrame =
            requestAnimationFrame(
                animate
            );
    }

    button.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            /*
             * Kalau sedang bergerak,
             * jangan membuat animasi kedua.
             */
            if (isScrolling) {
                return;
            }

            scrollToTopSmooth();
        }
    );

})();
/* ==========================================
   SCROLL UI — PERFORMANCE OPTIMIZED
   ========================================== */

   const progressBar =
   document.getElementById("scroll-progress");

const backToTopButton =
   document.getElementById("backToTop");

const progressCircle =
   document.querySelector(".progress-ring-circle");

const navLinks =
   document.querySelectorAll(".nav-link");

const scrollSections =
   document.querySelectorAll("section[id]");


/* ==========================================
  PROGRESS CIRCLE
  ========================================== */

const radius = 28;

const circumference =
   2 * Math.PI * radius;

if (progressCircle) {
   progressCircle.style.strokeDasharray =
       circumference;
}


/* ==========================================
  SCROLL UI
  Hanya menangani:
  - progress bar
  - back to top
  - navbar state

  Tidak lagi menghitung posisi section
  setiap frame.
  ========================================== */

let scrollFrame = null;

function updateScrollUI() {

   const scrollTop =
       window.scrollY;

   const maxScroll =
       Math.max(
           1,
           document.documentElement.scrollHeight -
           window.innerHeight
       );

   const progress =
       Math.min(
           1,
           Math.max(
               0,
               scrollTop / maxScroll
           )
       );


   /* Progress bar */

   if (progressBar) {

       progressBar.style.transform =
           `scaleX(${progress})`;

   }


   /* Back to top */

   if (backToTopButton) {

       backToTopButton.classList.toggle(
           "show",
           scrollTop > 350
       );

   }


   /* Navbar */

   if (window.navbar) {

       window.navbar.classList.toggle(
           "scrolled",
           scrollTop > 24
       );

   }


   scrollFrame = null;
}


/* ==========================================
  REQUEST SCROLL UPDATE
  ========================================== */

function requestScrollUI() {

   if (scrollFrame === null) {

       scrollFrame =
           requestAnimationFrame(
               updateScrollUI
           );

   }

}


window.addEventListener(
   "scroll",
   requestScrollUI,
   { passive: true }
);


window.addEventListener(
   "resize",
   requestScrollUI,
   { passive: true }
);


updateScrollUI();


/* ==========================================
  ACTIVE NAVIGATION
  IntersectionObserver

  Section tidak lagi dihitung
  setiap frame ketika scrolling.
  ========================================== */

const sectionObserver =
   new IntersectionObserver(
       (entries) => {

           const visibleSections =
               entries.filter(
                   (entry) =>
                       entry.isIntersecting
               );

           if (
               visibleSections.length === 0
           ) {
               return;
           }


           const activeSection =
               visibleSections.sort(
                   (a, b) =>
                       b.intersectionRatio -
                       a.intersectionRatio
               )[0];


           if (!activeSection) {
               return;
           }


           const currentId =
               activeSection.target.id;


           navLinks.forEach((link) => {

               const isActive =
                   link.getAttribute("href") ===
                   `#${currentId}`;

               link.classList.toggle(
                   "active",
                   isActive
               );

           });

       },
       {
           root: null,

           rootMargin:
               "-20% 0px -60% 0px",

           threshold: [
               0,
               0.1,
               0.25,
               0.5
           ]
       }
   );


scrollSections.forEach(
   (section) => {

       sectionObserver.observe(
           section
       );

   }
);
/* ==========================================
   SMOOTH NAVIGATION
   CUSTOM CONTROLLED DURATION
   ========================================== */

   (function () {

    const navbar =
        window.navbar ||
        document.getElementById("navbar");

    if (!navbar) {
        return;
    }


    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    if (!navigationLinks.length) {
        return;
    }


    /* ==========================================
       EASING
       ========================================== */

    function easeInOutCubic(progress) {

        return progress < 0.5
            ? 4 *
              progress *
              progress *
              progress
            : 1 -
              Math.pow(
                  -2 * progress + 2,
                  3
              ) / 2;

    }


    /* ==========================================
       SCROLL
       ========================================== */

       function smoothScrollTo(
        targetPosition,
        duration
    ) {
    
        const startPosition =
            window.scrollY;
    
        const distance =
            targetPosition -
            startPosition;
    
        const startTime =
            performance.now();
    
    
        document.documentElement.classList.add(
            "custom-smooth-scroll"
        );
    
    
        function animate(currentTime) {
    
            const elapsed =
                currentTime -
                startTime;
    
    
            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );
    
    
            const easedProgress =
                easeInOutCubic(
                    progress
                );
    
    
            const currentPosition =
                startPosition +
                (
                    distance *
                    easedProgress
                );
    
    
            window.scrollTo(
                0,
                currentPosition
            );
    
    
            if (progress < 1) {
    
                requestAnimationFrame(
                    animate
                );
    
            } else {
    
                window.scrollTo(
                    0,
                    targetPosition
                );
    
    
                document.documentElement.classList.remove(
                    "custom-smooth-scroll"
                );
    
            }
    
        }
    
    
        requestAnimationFrame(
            animate
        );
    
    }


    /* ==========================================
       NAVIGATION CLICK
       ========================================== */

    navigationLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    /* ==========================================
                       REDUCED MOTION
                       ========================================== */

                    const reduceMotion =
                        window.matchMedia(
                            "(prefers-reduced-motion: reduce)"
                        ).matches;


                    /* ==========================================
                       TARGET POSITION
                       ========================================== */

                    const navbarHeight =
                        navbar.offsetHeight;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        navbarHeight -
                        8;


                    const finalPosition =
                        Math.max(
                            0,
                            targetPosition
                        );


                    /* ==========================================
                       REDUCED MOTION
                       ========================================== */

                    if (reduceMotion) {

                        window.scrollTo(
                            0,
                            finalPosition
                        );

                    } else {

                        /* ==========================================
                           DISTANCE BASED DURATION

                           Dekat  → lebih cepat
                           Jauh   → lebih lambat
                           ========================================== */

                        const distance =
                            Math.abs(
                                finalPosition -
                                window.scrollY
                            );


                        const duration =
                            Math.min(
                                1800,
                                Math.max(
                                    750,
                                    750 +
                                    (
                                        distance /
                                        1800
                                    ) *
                                    1050
                                )
                            );


                        smoothScrollTo(
                            finalPosition,
                            duration
                        );

                    }


                    /* ==========================================
                       UPDATE URL
                       ========================================== */

                    if (
                        history.replaceState
                    ) {

                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    }

                }
            );

        }
    );

})();
/* =========================================
   HERO PROJECT & IT SHOWCASE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const showcaseImage =
        document.getElementById("showcase-image");

    const showcaseImageWrapper =
        document.getElementById("showcase-image-wrapper");

    const showcaseTitle =
        document.getElementById("showcase-title");

    const showcaseCategory =
        document.getElementById("showcase-category");

    const showcaseDescription =
        document.getElementById("showcase-description");

    const showcaseCounter =
        document.getElementById("showcase-counter");

    const showcaseIndicators =
        document.getElementById("showcase-indicators");

    const showcasePrev =
        document.getElementById("showcase-prev");

    const showcaseNext =
        document.getElementById("showcase-next");


    // =====================================================
    // STOP IF SHOWCASE DOES NOT EXIST
    // =====================================================

    if (
        !showcaseImage ||
        !showcaseImageWrapper
    ) {
        return;
    }


    // =====================================================
    // SHOWCASE DATA
    //
    // IMPORTANT:
    // Text now uses translation keys.
    // =====================================================

    const showcaseItems = [

        {
            image:
                "assets/images/showcase/ene.webp",

            categoryKey:
                "showcaseCategoryWeb",

            titleKey:
                "showcaseTitle1",

            descriptionKey:
                "showcaseDescription1"
        },

        {
            image:
                "assets/images/showcase/gb1.webp",

            categoryKey:
                "showcaseCategoryWeb",

            titleKey:
                "showcaseTitle2",

            descriptionKey:
                "showcaseDescription2"
        },

        {
            image:
                "assets/images/showcase/gb2.webp",

            categoryKey:
                "showcaseCategoryWeb",

            titleKey:
                "showcaseTitle3",

            descriptionKey:
                "showcaseDescription3"
        },

        {
            image:
                "assets/images/showcase/network1.webp",

            categoryKey:
                "showcaseCategoryNetwork",

            titleKey:
                "showcaseTitle4",

            descriptionKey:
                "showcaseDescription4"
        },

        {
            image:
                "assets/images/showcase/cctv1.webp",

            categoryKey:
                "showcaseCategoryCCTV",

            titleKey:
                "showcaseTitle5",

            descriptionKey:
                "showcaseDescription5"
        },

        {
            image:
                "assets/images/showcase/cctv2.webp",

            categoryKey:
                "showcaseCategoryCCTV",

            titleKey:
                "showcaseTitle6",

            descriptionKey:
                "showcaseDescription6"
        }

    ];


    // =====================================================
    // STATE
    // =====================================================

    let currentIndex = 0;

    let autoSlideTimer = null;

    let isAnimating = false;

    const AUTO_SLIDE_TIME = 4000;


    // =====================================================
    // CURRENT LANGUAGE
    // =====================================================

    function getCurrentLanguage() {

        return (
            document.documentElement.lang ||
            localStorage.getItem("language") ||
            "en"
        );

    }


    // =====================================================
    // GET TRANSLATION
    // =====================================================

    function translate(key) {

        const lang =
            getCurrentLanguage();

        if (
            typeof translations === "undefined"
        ) {
            return key;
        }

        return (
            translations[lang]?.[key] ??
            translations.en?.[key] ??
            key
        );

    }


    // =====================================================
    // INDICATORS
    // =====================================================

    if (showcaseIndicators) {

        showcaseIndicators.innerHTML = "";

        showcaseItems.forEach(
            (_, index) => {

                const dot =
                    document.createElement("button");

                dot.type = "button";

                dot.className =
                    "showcase-dot";

                dot.setAttribute(
                    "aria-label",
                    `Showcase ${index + 1}`
                );

                dot.addEventListener(
                    "click",
                    () => {

                        if (
                            index === currentIndex
                        ) {
                            return;
                        }

                        const direction =
                            index > currentIndex
                                ? "next"
                                : "prev";

                        showSlide(
                            index,
                            direction
                        );

                        restartAutoSlide();

                    }
                );

                showcaseIndicators.appendChild(
                    dot
                );

            }
        );

    }


    // =====================================================
    // UPDATE INDICATORS
    // =====================================================

    function updateIndicators() {

        if (!showcaseIndicators) {
            return;
        }

        const dots =
            showcaseIndicators.querySelectorAll(
                ".showcase-dot"
            );

        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === currentIndex
                );

            }
        );

    }


    // =====================================================
    // UPDATE ARIA LABEL
    // =====================================================

    function updateAriaLabels() {

        if (showcasePrev) {

            showcasePrev.setAttribute(
                "aria-label",
                translate("showcasePrevious")
            );

        }

        if (showcaseNext) {

            showcaseNext.setAttribute(
                "aria-label",
                translate("showcaseNext")
            );

        }

    }


    // =====================================================
    // UPDATE CONTENT
    // =====================================================

    function updateContent() {

        const item =
            showcaseItems[currentIndex];


        // -----------------------------------------------
        // Image
        // -----------------------------------------------

        showcaseImage.src =
            item.image;


        showcaseImage.alt =
            translate(item.titleKey);


        // -----------------------------------------------
        // Category
        // -----------------------------------------------

        if (showcaseCategory) {

            showcaseCategory.textContent =
                translate(
                    item.categoryKey
                );

        }


        // -----------------------------------------------
        // Title
        // -----------------------------------------------

        if (showcaseTitle) {

            showcaseTitle.textContent =
                translate(
                    item.titleKey
                );

        }


        // -----------------------------------------------
        // Description
        // -----------------------------------------------

        if (showcaseDescription) {

            showcaseDescription.textContent =
                translate(
                    item.descriptionKey
                );

        }


        // -----------------------------------------------
        // Counter
        // -----------------------------------------------

        if (showcaseCounter) {

            showcaseCounter.textContent =
                `${String(
                    currentIndex + 1
                ).padStart(2, "0")} / ${String(
                    showcaseItems.length
                ).padStart(2, "0")}`;

        }


        updateIndicators();

        updateAriaLabels();

    }


    // =====================================================
    // SMOOTH SLIDE
    // =====================================================

    function showSlide(
        index,
        direction = "next"
    ) {

        if (isAnimating) {
            return;
        }

        isAnimating = true;


        currentIndex =
            (
                index +
                showcaseItems.length
            ) %
            showcaseItems.length;


        // -----------------------------------------------
        // Slide Out
        // -----------------------------------------------

        showcaseImage.classList.remove(
            "showcase-slide-in-left",
            "showcase-slide-in-right"
        );


        showcaseImage.classList.add(
            direction === "next"
                ? "showcase-slide-out-left"
                : "showcase-slide-out-right"
        );


        setTimeout(
            () => {

                updateContent();


                // ---------------------------------------
                // Remove old animation
                // ---------------------------------------

                showcaseImage.classList.remove(
                    "showcase-slide-out-left",
                    "showcase-slide-out-right"
                );


                // ---------------------------------------
                // Start image from opposite side
                // ---------------------------------------

                showcaseImage.classList.add(
                    direction === "next"
                        ? "showcase-slide-in-right"
                        : "showcase-slide-in-left"
                );


                // ---------------------------------------
                // Force repaint
                // ---------------------------------------

                requestAnimationFrame(
                    () => {

                        requestAnimationFrame(
                            () => {

                                showcaseImage.classList.remove(
                                    "showcase-slide-in-right",
                                    "showcase-slide-in-left"
                                );

                            }
                        );

                    }
                );


                setTimeout(
                    () => {

                        isAnimating = false;

                    },
                    450
                );

            },
            220
        );

    }


    // =====================================================
    // NEXT
    // =====================================================

    function nextSlide() {

        showSlide(
            currentIndex + 1,
            "next"
        );

    }


    // =====================================================
    // PREVIOUS
    // =====================================================

    function previousSlide() {

        showSlide(
            currentIndex - 1,
            "prev"
        );

    }


    // =====================================================
    // BUTTONS
    // =====================================================

    if (showcaseNext) {

        showcaseNext.addEventListener(
            "click",
            () => {

                nextSlide();

                restartAutoSlide();

            }
        );

    }


    if (showcasePrev) {

        showcasePrev.addEventListener(
            "click",
            () => {

                previousSlide();

                restartAutoSlide();

            }
        );

    }


    // =====================================================
    // AUTO SLIDE
    // =====================================================

    function startAutoSlide() {

        stopAutoSlide();


        autoSlideTimer =
            setInterval(
                () => {

                    if (
                        !document.hidden
                    ) {

                        nextSlide();

                    }

                },
                AUTO_SLIDE_TIME
            );

    }


    function stopAutoSlide() {

        if (autoSlideTimer) {

            clearInterval(
                autoSlideTimer
            );

            autoSlideTimer = null;

        }

    }


    function restartAutoSlide() {

        stopAutoSlide();

        startAutoSlide();

    }


    // =====================================================
    // PAUSE ON HOVER
    // =====================================================

    showcaseImageWrapper.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    showcaseImageWrapper.addEventListener(
        "mouseleave",
        startAutoSlide
    );


    // =====================================================
    // TOUCH SWIPE
    // =====================================================

    let touchStartX = 0;

    let touchStartY = 0;

    let isTouching = false;


    showcaseImageWrapper.addEventListener(
        "touchstart",
        event => {

            const touch =
                event.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

            isTouching = true;

            stopAutoSlide();

        },
        {
            passive: true
        }
    );


    showcaseImageWrapper.addEventListener(
        "touchend",
        event => {

            if (!isTouching) {
                return;
            }

            isTouching = false;


            const touch =
                event.changedTouches[0];


            const touchEndX =
                touch.clientX;

            const touchEndY =
                touch.clientY;


            const diffX =
                touchStartX -
                touchEndX;

            const diffY =
                touchStartY -
                touchEndY;


            // Ignore vertical swipe
            if (
                Math.abs(diffY) >
                Math.abs(diffX)
            ) {

                restartAutoSlide();

                return;

            }


            // Ignore tiny swipe
            if (
                Math.abs(diffX) < 45
            ) {

                restartAutoSlide();

                return;

            }


            if (diffX > 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            restartAutoSlide();

        },
        {
            passive: true
        }
    );


    // =====================================================
    // MOUSE DRAG
    // =====================================================

    let mouseStartX = 0;

    let isDragging = false;


    showcaseImageWrapper.addEventListener(
        "mousedown",
        event => {

            mouseStartX =
                event.clientX;

            isDragging = true;

            stopAutoSlide();

        }
    );


    showcaseImageWrapper.addEventListener(
        "mouseup",
        event => {

            if (!isDragging) {
                return;
            }

            isDragging = false;


            const diff =
                mouseStartX -
                event.clientX;


            if (
                Math.abs(diff) < 45
            ) {

                restartAutoSlide();

                return;

            }


            if (diff > 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            restartAutoSlide();

        }
    );


    showcaseImageWrapper.addEventListener(
        "mouseleave",
        () => {

            isDragging = false;

            startAutoSlide();

        }
    );


    // =====================================================
    // LIGHTBOX ELEMENTS
    // =====================================================

    const lightbox =
        document.getElementById(
            "showcase-lightbox"
        );

    const lightboxImage =
        document.getElementById(
            "showcase-lightbox-image"
        );

    const lightboxTitle =
        document.getElementById(
            "showcase-lightbox-title"
        );

    const lightboxCategory =
        document.getElementById(
            "showcase-lightbox-category"
        );

    const lightboxClose =
        document.getElementById(
            "showcase-lightbox-close"
        );

    const lightboxPrev =
        document.getElementById(
            "showcase-lightbox-prev"
        );

    const lightboxNext =
        document.getElementById(
            "showcase-lightbox-next"
        );

    const lightboxBackdrop =
        document.getElementById(
            "showcase-lightbox-backdrop"
        );


    // =====================================================
    // UPDATE LIGHTBOX
    // =====================================================

    function updateLightbox() {

        if (!lightboxImage) {
            return;
        }


        const item =
            showcaseItems[currentIndex];


        lightboxImage.classList.add(
            "lightbox-image-changing"
        );


        setTimeout(
            () => {

                lightboxImage.src =
                    item.image;


                lightboxImage.alt =
                    translate(
                        item.titleKey
                    );


                if (lightboxTitle) {

                    lightboxTitle.textContent =
                        translate(
                            item.titleKey
                        );

                }


                if (lightboxCategory) {

                    lightboxCategory.textContent =
                        translate(
                            item.categoryKey
                        );

                }


                // Update lightbox aria
                if (lightboxClose) {

                    lightboxClose.setAttribute(
                        "aria-label",
                        translate(
                            "showcaseClose"
                        )
                    );

                }


                if (lightboxPrev) {

                    lightboxPrev.setAttribute(
                        "aria-label",
                        translate(
                            "showcasePrevious"
                        )
                    );

                }


                if (lightboxNext) {

                    lightboxNext.setAttribute(
                        "aria-label",
                        translate(
                            "showcaseNext"
                        )
                    );

                }


                lightboxImage.classList.remove(
                    "lightbox-image-changing"
                );

            },
            120
        );

    }


    // =====================================================
    // OPEN LIGHTBOX
    // =====================================================

    function openLightbox() {

        if (!lightbox) {
            return;
        }


        updateLightbox();


        lightbox.classList.add(
            "show"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "showcase-lightbox-open"
        );


        stopAutoSlide();

    }


    // =====================================================
    // CLOSE LIGHTBOX
    // =====================================================

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "show"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "showcase-lightbox-open"
        );


        startAutoSlide();

    }


    // =====================================================
    // IMAGE CLICK
    // =====================================================

    showcaseImage.addEventListener(
        "click",
        () => {

            if (isDragging) {
                return;
            }

            openLightbox();

        }
    );


    // =====================================================
    // LIGHTBOX CLOSE
    // =====================================================

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightboxBackdrop) {

        lightboxBackdrop.addEventListener(
            "click",
            closeLightbox
        );

    }


    // =====================================================
    // LIGHTBOX PREVIOUS
    // =====================================================

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            () => {

                previousSlide();

                setTimeout(
                    updateLightbox,
                    230
                );

            }
        );

    }


    // =====================================================
    // LIGHTBOX NEXT
    // =====================================================

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            () => {

                nextSlide();

                setTimeout(
                    updateLightbox,
                    230
                );

            }
        );

    }


    // =====================================================
    // LIGHTBOX SWIPE
    // =====================================================

    let lightboxTouchStartX = 0;

    let lightboxTouchStartY = 0;


    if (lightboxImage) {

        lightboxImage.addEventListener(
            "touchstart",
            event => {

                const touch =
                    event.changedTouches[0];

                lightboxTouchStartX =
                    touch.clientX;

                lightboxTouchStartY =
                    touch.clientY;

            },
            {
                passive: true
            }
        );


        lightboxImage.addEventListener(
            "touchend",
            event => {

                const touch =
                    event.changedTouches[0];


                const diffX =
                    lightboxTouchStartX -
                    touch.clientX;

                const diffY =
                    lightboxTouchStartY -
                    touch.clientY;


                if (
                    Math.abs(diffY) >
                    Math.abs(diffX)
                ) {

                    return;

                }


                if (
                    Math.abs(diffX) < 45
                ) {

                    return;

                }


                if (diffX > 0) {

                    nextSlide();

                } else {

                    previousSlide();

                }


                setTimeout(
                    updateLightbox,
                    230
                );

            },
            {
                passive: true
            }
        );

    }


    // =====================================================
    // KEYBOARD
    // =====================================================

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "show"
                )
            ) {

                return;

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousSlide();

                setTimeout(
                    updateLightbox,
                    230
                );

            }


            if (
                event.key === "ArrowRight"
            ) {

                nextSlide();

                setTimeout(
                    updateLightbox,
                    230
                );

            }

        }
    );


    // =====================================================
    // LANGUAGE CHANGE
    //
    // This is the important part.
    // When language.js changes language,
    // showcase automatically refreshes.
    // =====================================================

    document.addEventListener(
        "languageChanged",
        event => {

            const lang =
                event.detail?.language;

            if (!lang) {
                return;
            }


            // Refresh current showcase
            updateContent();


            // Refresh lightbox if open
            if (
                lightbox &&
                lightbox.classList.contains(
                    "show"
                )
            ) {

                updateLightbox();

            }

        }
    );


    // =====================================================
    // INITIALIZE
    // =====================================================

    updateContent();

    startAutoSlide();

});

/* ==========================================
   PORTFOLIO MODAL
========================================== */

const portfolioModal =
    document.getElementById("portfolioModal");

const portfolioModalClose =
    document.getElementById("portfolioModalClose");

const portfolioModalTitle =
    document.getElementById("portfolioModalTitle");

const portfolioModalCategory =
    document.getElementById("portfolioModalCategory");

const portfolioModalGallery =
    document.getElementById("portfolioModalGallery");

const portfolioProjects = {

    "kai": {
        title: "KAI",
        category: "Web Application",
    
        images: [
            "assets/images/projects/KAI/KAI01.webp",
            "assets/images/projects/KAI/KAI02.webp",
            "assets/images/projects/KAI/KAI03.webp",
            "assets/images/projects/KAI/KAI04.webp",
            "assets/images/projects/KAI/KAI05.webp"
        ]
    },

    "erinaldo": {
        title: "Erinaldo Nusa Energi",
        category: "Company Profile",
    
        images: [
            "assets/images/projects/ENE/ene1.webp",
            "assets/images/projects/ENE/ene2.webp",
            "assets/images/projects/ENE/ene3.webp",
            "assets/images/projects/ENE/ene4.webp"
        ]
    },

    "kebab": {
        title: "Kebab Abud's",
        category: "Website",
    
        images: [
            "assets/images/projects/kebab abud/kb01.webp",
            "assets/images/projects/kebab abud/kb02.webp",
            "assets/images/projects/kebab abud/kb03.webp",
            "assets/images/projects/kebab abud/kb04.webp",
            "assets/images/projects/kebab abud/kb05.webp",
            "assets/images/projects/kebab abud/kb06.webp"
        ]
    },

    "barokah": {
        title: "PT Barokah Coco Indonesia",
        category: "Company Profile",
    
        images: [
            "assets/images/projects/Baracoco/bc1.webp",
            "assets/images/projects/Baracoco/bc2.webp",
            "assets/images/projects/Baracoco/bc3.webp",
            "assets/images/projects/Baracoco/bc4.webp",
            "assets/images/projects/Baracoco/bc5.webp",
            "assets/images/projects/Baracoco/bc6.webp"
        ]
    },

    "project-05": {
        title: "Project 05",
        category: "Project",

        images: [
            "assets/images/projects/project-05-01.webp",
            "assets/images/projects/project-05-02.webp"
        ]
    },

    "project-06": {
        title: "Project 06",
        category: "Project",

        images: [
            "assets/images/projects/project-06-01.webp",
            "assets/images/projects/project-06-02.webp"
        ]
    }

};


/* OPEN MODAL */

document
    .querySelectorAll(".portfolio-simple-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const projectId =
                card.dataset.project;

            const project =
                portfolioProjects[projectId];

            if (!project) return;


            portfolioModalTitle.textContent =
                project.title;

            portfolioModalCategory.textContent =
                project.category;


            portfolioModalGallery.innerHTML = "";


            project.images.forEach((image, index) => {
                const img = document.createElement("img");
            
                img.src = image;
                img.alt = `${project.title} screenshot ${index + 1}`;
                img.decoding = "async";
            
                if (index === 0) {
                    img.loading = "eager";
                    img.fetchPriority = "high";
                } else {
                    img.loading = "lazy";
                    img.fetchPriority = "low";
                }
            
                portfolioModalGallery.appendChild(img);
            });

            portfolioModal.classList.add("active");

            portfolioModal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.style.overflow = "hidden";

        });

    });


/* CLOSE MODAL */

function closePortfolioModal() {

    portfolioModal.classList.remove("active");

    portfolioModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* CLOSE BUTTON */

portfolioModalClose?.addEventListener(
    "click",
    closePortfolioModal
);


/* CLICK BACKDROP */

document
    .querySelector("[data-close-modal]")
    ?.addEventListener(
        "click",
        closePortfolioModal
    );


/* ESC KEY */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            portfolioModal?.classList.contains("active")
        ) {
            closePortfolioModal();
        }

    }
);

/* ==========================================
   CERTIFICATION MODAL
   MULTIPLE IMAGES SUPPORT
========================================== */

const certificationModal =
    document.getElementById("certificationModal");

const certificationModalClose =
    document.getElementById("certificationModalClose");

const certificationModalTitle =
    document.getElementById("certificationModalTitle");

const certificationModalCategory =
    document.getElementById("certificationModalCategory");

const certificationModalGallery =
    document.getElementById("certificationModalGallery");


/* ==========================================
   CERTIFICATION DATA
========================================== */

const certificationData = {

    "it-network": {

        title: "Bootcamp IT Network",

        category: "Professional Training",

        images: [
            "assets/images/certifications/BOOTCAMP IT NETWORK.jpg"
        ]

    },


    "it-support": {

        title: "Bootcamp IT Support",

        category: "Professional Training",

        images: [
            "assets/images/certifications/BOOTCAMP IT SUPPORT.jpg"
        ]

    },


    "dasar-ai": {

        title: "Dasar AI",

        category: "AI & Technology",

        images: [
            "assets/images/certifications/Dasar AI.jpg"
        ]

    },


    "data-management": {

        title: "Data Management Staff",

        category: "Professional Certification",

        images: [
            "assets/images/certifications/data management staff.jpg",
            "assets/images/certifications/data management staff1.jpg"
        ]

    },


    "data-science": {

        title: "Data Science",

        category: "Data & Technology",

        images: [
            "assets/images/certifications/data_science.jpeg"
        ]

    },


    "oracle": {

        title: "Oracle",

        category: "Database & Technology",

        images: [
            "assets/images/certifications/Oracle.jpg"
        ]

    },


    "alibaba-cloud": {

        title: "Alibaba Cloud Developer",

        category: "Cloud Computing",

        images: [
            "assets/images/certifications/sertifikat developer AlibabaCloud.jpg"
        ]

    },


    "software-development": {

        title: "Software Development",

        category: "Software Development",

        images: [
            "assets/images/certifications/SoftwareDevelopment.jpg",
            "assets/images/certifications/SoftwareDevelopment1.jpg"
        ]

    }

};


/* ==========================================
   OPEN MODAL
========================================== */

function openCertification(certificationKey) {

    if (
        !certificationModal ||
        !certificationData[certificationKey]
    ) {
        return;
    }


    const certification =
        certificationData[certificationKey];


    /* TITLE */

    certificationModalTitle.textContent =
        certification.title;


    /* CATEGORY */

    certificationModalCategory.textContent =
        certification.category;


    /* CLEAR OLD IMAGES */

    certificationModalGallery.innerHTML = "";


    /* CREATE IMAGES */

    certification.images.forEach(
        (imagePath, index) => {

            const imageWrapper =
                document.createElement("div");

            imageWrapper.className =
                "certification-gallery-item";


            const image =
                document.createElement("img");

            image.src =
                imagePath;

            image.alt =
                `${certification.title} certificate ${index + 1}`;

            image.loading =
                "lazy";

            image.decoding =
                "async";


            imageWrapper.appendChild(
                image
            );


            certificationModalGallery.appendChild(
                imageWrapper
            );

        }
    );


    /* SHOW MODAL */

    certificationModal.classList.add(
        "is-open"
    );


    certificationModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /* LOCK PAGE SCROLL */

    document.body.classList.add(
        "modal-open"
    );

}


/* ==========================================
   CLOSE MODAL
========================================== */

function closeCertification() {

    if (!certificationModal) {
        return;
    }


    certificationModal.classList.remove(
        "is-open"
    );


    certificationModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* ==========================================
   CARD CLICK
========================================== */

document
    .querySelectorAll(
        "[data-certification]"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const certificationKey =
                    card.dataset.certification;


                openCertification(
                    certificationKey
                );

            }
        );

    });


/* ==========================================
   CLOSE BUTTON
========================================== */

if (certificationModalClose) {

    certificationModalClose.addEventListener(
        "click",
        closeCertification
    );

}


/* ==========================================
   BACKDROP CLICK
========================================== */

document
    .querySelectorAll(
        "[data-close-certification]"
    )
    .forEach(element => {

        element.addEventListener(
            "click",
            closeCertification
        );

    });


/* ==========================================
   ESCAPE KEY
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            certificationModal &&
            certificationModal.classList.contains(
                "is-open"
            )
        ) {

            closeCertification();

        }

    }
);

/* =========================================================
   ABOUT CHARACTER — FINAL V7
   Desktop + Mobile
   ========================================================= */

   (() => {
    "use strict";

    const stage = document.querySelector(
        ".about-character-stage"
    );

    if (!stage) {
        return;
    }

    /* Prevent duplicate initialization */
    if (stage.dataset.characterV7 === "true") {
        return;
    }

    stage.dataset.characterV7 = "true";

    const sourceImage = stage.querySelector(
        ".algi-character-image"
    );

    if (!sourceImage) {
        return;
    }

    let dragging = false;
    let activePointerId = null;

    let ghost = null;
    let ghostImage = null;

    let animationFrame = null;
    let returnTimer = null;

    let currentLeft = 0;
    let currentTop = 0;

    let velocityX = 0;
    let velocityY = 0;

    let previousX = 0;
    let previousY = 0;
    let previousTime = 0;

    let offsetX = 0;
    let offsetY = 0;

    const FRICTION = 0.94;
    const BOUNCE = 0.70;
    const MIN_SPEED = 0.45;
    const MAX_VELOCITY = 30;

    const RETURN_DELAY = 850;

    const reducedMotionQuery =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    /* =====================================================
       STOP ANIMATION
    ===================================================== */

    function stopAnimation() {
        if (animationFrame !== null) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
    }

    /* =====================================================
       CANCEL RETURN
    ===================================================== */

    function cancelReturn() {
        if (returnTimer !== null) {
            clearTimeout(returnTimer);
            returnTimer = null;
        }
    }

    /* =====================================================
       GET CHARACTER POSITION
    ===================================================== */

    function getCharacterRect() {
        return stage.getBoundingClientRect();
    }

    /* =====================================================
       CREATE GHOST
    ===================================================== */

    function createGhost(rect) {

        removeGhost();

        ghost = document.createElement("div");

        ghost.className = "algi-drag-ghost";

        ghost.setAttribute(
            "aria-hidden",
            "true"
        );

        ghostImage =
            sourceImage.cloneNode(true);

        ghostImage.className =
            "algi-drag-ghost-image";

        ghostImage.removeAttribute(
            "loading"
        );

        ghostImage.removeAttribute(
            "decoding"
        );

        ghostImage.setAttribute(
            "draggable",
            "false"
        );

        ghost.appendChild(
            ghostImage
        );

        ghost.style.width =
            `${rect.width}px`;

        ghost.style.height =
            `${rect.height}px`;

        document.body.appendChild(
            ghost
        );
    }

    /* =====================================================
       REMOVE GHOST
    ===================================================== */

    function removeGhost() {

        if (ghost) {
            ghost.remove();
        }

        ghost = null;
        ghostImage = null;
    }

    /* =====================================================
       SET GHOST POSITION
    ===================================================== */

    function setGhostPosition(
        left,
        top,
        rotation = 0
    ) {

        if (!ghost) {
            return;
        }

        currentLeft = left;
        currentTop = top;

        ghost.style.left =
            `${left}px`;

        ghost.style.top =
            `${top}px`;

        ghost.style.transform =
            `translate3d(0, 0, 0)
             rotate(${rotation}deg)`;
    }

    /* =====================================================
       GET SCREEN BOUNDS
    ===================================================== */

    function getBounds() {

        if (!ghost) {

            return {
                minX: 8,
                maxX:
                    window.innerWidth - 8,
                minY: 8,
                maxY:
                    window.innerHeight - 8
            };
        }

        const width =
            ghost.offsetWidth;

        const height =
            ghost.offsetHeight;

        const padding = 8;

        return {

            minX: padding,

            maxX: Math.max(
                padding,
                window.innerWidth -
                    width -
                    padding
            ),

            minY: padding,

            maxY: Math.max(
                padding,
                window.innerHeight -
                    height -
                    padding
            )
        };
    }

    /* =====================================================
       CLAMP
    ===================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );
    }

    /* =====================================================
       RESTORE ORIGINAL
    ===================================================== */

    function restoreOriginal() {

        stopAnimation();

        cancelReturn();

        removeGhost();

        stage.style.visibility = "";

        stage.style.opacity = "";

        stage.classList.remove(
            "is-dragging"
        );

        currentLeft = 0;
        currentTop = 0;

        velocityX = 0;
        velocityY = 0;

        dragging = false;

        activePointerId = null;
    }

    /* =====================================================
       SCHEDULE RETURN
    ===================================================== */

    function scheduleReturn() {

        cancelReturn();

        returnTimer =
            window.setTimeout(
                () => {

                    restoreOriginal();

                },
                RETURN_DELAY
            );
    }

    /* =====================================================
       THROW CHARACTER
    ===================================================== */

    function throwCharacter() {

        stopAnimation();

        if (
            reducedMotionQuery.matches
        ) {

            scheduleReturn();

            return;
        }

        function animate() {

            if (!ghost) {

                animationFrame = null;

                return;
            }

            velocityX *= FRICTION;

            velocityY *= FRICTION;

            currentLeft += velocityX;

            currentTop += velocityY;

            const bounds =
                getBounds();

            /* LEFT */

            if (
                currentLeft <=
                bounds.minX
            ) {

                currentLeft =
                    bounds.minX;

                velocityX =
                    Math.abs(
                        velocityX
                    ) * BOUNCE;
            }

            /* RIGHT */

            if (
                currentLeft >=
                bounds.maxX
            ) {

                currentLeft =
                    bounds.maxX;

                velocityX =
                    -Math.abs(
                        velocityX
                    ) * BOUNCE;
            }

            /* TOP */

            if (
                currentTop <=
                bounds.minY
            ) {

                currentTop =
                    bounds.minY;

                velocityY =
                    Math.abs(
                        velocityY
                    ) * BOUNCE;
            }

            /* BOTTOM */

            if (
                currentTop >=
                bounds.maxY
            ) {

                currentTop =
                    bounds.maxY;

                velocityY =
                    -Math.abs(
                        velocityY
                    ) * BOUNCE;
            }

            const rotation =
                clamp(
                    velocityX * 0.75,
                    -12,
                    12
                );

            setGhostPosition(
                currentLeft,
                currentTop,
                rotation
            );

            const speed =
                Math.abs(
                    velocityX
                ) +
                Math.abs(
                    velocityY
                );

            if (
                speed <
                MIN_SPEED
            ) {

                animationFrame = null;

                scheduleReturn();

                return;
            }

            animationFrame =
                requestAnimationFrame(
                    animate
                );
        }

        animationFrame =
            requestAnimationFrame(
                animate
            );
    }

    /* =====================================================
       POINTER DOWN
    ===================================================== */

    function handlePointerDown(
        event
    ) {

        /*
         * Mouse:
         * hanya klik kiri.
         */
        if (
            event.pointerType ===
                "mouse" &&
            event.button !== 0
        ) {

            return;
        }

        if (dragging) {
            return;
        }

        event.preventDefault();

        stopAnimation();

        cancelReturn();

        const rect =
            getCharacterRect();

        createGhost(rect);

        /*
         * Posisi klik di dalam karakter.
         * Ini membuat karakter tidak melompat
         * saat mulai di-drag.
         */

        offsetX =
            event.clientX -
            rect.left;

        offsetY =
            event.clientY -
            rect.top;

        currentLeft =
            rect.left;

        currentTop =
            rect.top;

        setGhostPosition(
            currentLeft,
            currentTop
        );

        /*
         * Sembunyikan karakter asli.
         * Ghost yang bergerak.
         */

        stage.style.visibility =
            "hidden";

        stage.style.opacity =
            "0";

        stage.classList.add(
            "is-dragging"
        );

        dragging = true;

        activePointerId =
            event.pointerId;

        velocityX = 0;
        velocityY = 0;

        previousX =
            event.clientX;

        previousY =
            event.clientY;

        previousTime =
            performance.now();

        window.addEventListener(
            "pointermove",
            handlePointerMove,
            {
                passive: false
            }
        );

        window.addEventListener(
            "pointerup",
            handlePointerUp,
            {
                passive: false
            }
        );

        window.addEventListener(
            "pointercancel",
            handlePointerCancel,
            {
                passive: false
            }
        );
    }

    /* =====================================================
       POINTER MOVE
    ===================================================== */

    function handlePointerMove(
        event
    ) {

        if (
            !dragging ||
            event.pointerId !==
                activePointerId ||
            !ghost
        ) {

            return;
        }

        event.preventDefault();

        const now =
            performance.now();

        const deltaTime =
            Math.max(
                8,
                now - previousTime
            );

        const bounds =
            getBounds();

        let nextLeft =
            event.clientX -
            offsetX;

        let nextTop =
            event.clientY -
            offsetY;

        nextLeft =
            clamp(
                nextLeft,
                bounds.minX,
                bounds.maxX
            );

        nextTop =
            clamp(
                nextTop,
                bounds.minY,
                bounds.maxY
            );

        /*
         * Hitung velocity X.
         */

        velocityX =
            (
                (
                    event.clientX -
                    previousX
                ) /
                deltaTime
            ) * 16;

        /*
         * Hitung velocity Y.
         */

        velocityY =
            (
                (
                    event.clientY -
                    previousY
                ) /
                deltaTime
            ) * 16;

        velocityX =
            clamp(
                velocityX,
                -MAX_VELOCITY,
                MAX_VELOCITY
            );

        velocityY =
            clamp(
                velocityY,
                -MAX_VELOCITY,
                MAX_VELOCITY
            );

        currentLeft =
            nextLeft;

        currentTop =
            nextTop;

        const rotation =
            clamp(
                velocityX * 0.75,
                -12,
                12
            );

        setGhostPosition(
            currentLeft,
            currentTop,
            rotation
        );

        previousX =
            event.clientX;

        previousY =
            event.clientY;

        previousTime =
            now;
    }

    /* =====================================================
       REMOVE POINTER LISTENERS
    ===================================================== */

    function removePointerListeners() {

        window.removeEventListener(
            "pointermove",
            handlePointerMove
        );

        window.removeEventListener(
            "pointerup",
            handlePointerUp
        );

        window.removeEventListener(
            "pointercancel",
            handlePointerCancel
        );
    }

    /* =====================================================
       FINISH DRAG
    ===================================================== */

    function finishDrag(
        event
    ) {

        if (
            !dragging ||
            event.pointerId !==
                activePointerId
        ) {

            return;
        }

        event.preventDefault();

        removePointerListeners();

        dragging = false;

        activePointerId = null;

        /*
         * Setelah dilepas,
         * karakter dilempar.
         */

        throwCharacter();
    }

    /* =====================================================
       POINTER UP
    ===================================================== */

    function handlePointerUp(
        event
    ) {

        finishDrag(event);
    }

    /* =====================================================
       POINTER CANCEL
    ===================================================== */

    function handlePointerCancel(
        event
    ) {

        if (
            !dragging ||
            event.pointerId !==
                activePointerId
        ) {

            return;
        }

        removePointerListeners();

        restoreOriginal();
    }

    /* =====================================================
       START INTERACTION
    ===================================================== */

    stage.addEventListener(
        "pointerdown",
        handlePointerDown,
        {
            passive: false
        }
    );

    /* =====================================================
       PREVENT CONTEXT MENU
    ===================================================== */

    stage.addEventListener(
        "contextmenu",
        (event) => {

            if (dragging) {

                event.preventDefault();
            }
        }
    );

    /* =====================================================
       WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                !ghost ||
                dragging
            ) {

                return;
            }

            const bounds =
                getBounds();

            currentLeft =
                clamp(
                    currentLeft,
                    bounds.minX,
                    bounds.maxX
                );

            currentTop =
                clamp(
                    currentTop,
                    bounds.minY,
                    bounds.maxY
                );

            setGhostPosition(
                currentLeft,
                currentTop
            );
        },
        {
            passive: true
        }
    );

    /* =====================================================
       SAFETY — TAB HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden &&
                ghost
            ) {

                restoreOriginal();
            }
        }
    );

    /* =====================================================
       SAFETY — PAGE RESTORED
    ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            if (ghost) {

                restoreOriginal();
            }
        }
    );

})();
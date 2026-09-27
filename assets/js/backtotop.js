const backToTop = document.getElementById("backToTop");

if (backToTop) {
    backToTop.addEventListener("click", () => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "auto" : "smooth"
        });
    });
}

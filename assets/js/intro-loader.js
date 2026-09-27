/* ==========================================
   INTRO LOADER — PHASE 1.1
   Cinematic reveal + lightweight progress
========================================== */

(() => {
    const loader = document.getElementById("portfolio-loader");

    if (!loader) return;

    const startTime = performance.now();
    const minimumDisplayTime = 3200;
    const maximumWaitTime = 4800;
    const progressBar = document.getElementById("portfolio-loader-progress-bar");
    const progressValue = document.getElementById("portfolio-loader-progress-value");
    let hasRevealed = false;
    let progressTimer = null;

    const updateProgress = (value) => {
        const progress = Math.min(100, Math.max(0, value));
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (progressValue) progressValue.textContent = `${Math.round(progress)}%`;
    };

    const startProgress = () => {
        const duration = minimumDisplayTime - 250;
        const started = performance.now();

        progressTimer = window.setInterval(() => {
            const elapsed = performance.now() - started;
            const ratio = Math.min(1, elapsed / duration);
            // Slow start, faster finish — feels intentional rather than a fake instant loader.
            const eased = 1 - Math.pow(1 - ratio, 2.4);
            updateProgress(eased * 100);

            if (ratio >= 1) {
                window.clearInterval(progressTimer);
                progressTimer = null;
            }
        }, 32);
    };

    const revealPortfolio = () => {
        if (hasRevealed) return;
        hasRevealed = true;

        if (progressTimer) {
            window.clearInterval(progressTimer);
            progressTimer = null;
        }

        updateProgress(100);

        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, minimumDisplayTime - elapsed);

        window.setTimeout(() => {
            loader.classList.add("is-hidden");
            document.documentElement.classList.remove("portfolio-loading");
            document.body.classList.remove("portfolio-loading");

            window.setTimeout(() => {
                loader.remove();
            }, 800);
        }, remaining);
    };

    startProgress();

    // Wait for the initial DOM to be ready, while keeping a hard safety limit.
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", revealPortfolio, { once: true });
    } else {
        revealPortfolio();
    }

    window.setTimeout(revealPortfolio, maximumWaitTime);
})();

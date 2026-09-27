const observer = new IntersectionObserver(
    (entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Animate once instead of repeatedly removing/re-adding classes
                // while the user scrolls back and forth. This reduces layout work.
                obs.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

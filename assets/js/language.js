document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // LANGUAGE SYSTEM
    // =====================================================

    const buttons = document.querySelectorAll(".language-btn");

    const savedLanguage =
        localStorage.getItem("language") || "en";

    // =====================================================
    // DESKTOP LANGUAGE
    // =====================================================

    const languageToggle =
        document.getElementById("languageToggle");

    const languageMenu =
        document.getElementById("languageMenu");

    const currentLanguage =
        document.getElementById("currentLanguage");

    // =====================================================
    // MOBILE LANGUAGE
    // =====================================================

    const mobileLanguageToggle =
        document.getElementById("mobileLanguageToggle");

    const mobileLanguageMenu =
        document.getElementById("mobileLanguageMenu");

    const mobileCurrentLanguage =
        document.getElementById("mobileCurrentLanguage");

    // =====================================================
    // MOBILE HAMBURGER
    // =====================================================

    const mobileMenu =
        document.getElementById("mobile-menu");

    const menuButton =
        document.getElementById("menu-button");


    // =====================================================
    // AVAILABLE LANGUAGES
    // =====================================================

    const supportedLanguages = ["en", "id"];


    // =====================================================
    // GET TRANSLATION
    // =====================================================

    function getTranslation(lang, key) {

        if (
            typeof translations === "undefined" ||
            !translations[lang]
        ) {
            return null;
        }

        return translations[lang][key] ?? null;

    }


    // =====================================================
    // CHANGE LANGUAGE
    // =====================================================

    function changeLanguage(lang) {

        // -------------------------------------------------
        // Validate language
        // -------------------------------------------------

        if (!supportedLanguages.includes(lang)) {

            lang = "en";

        }


        // =================================================
        // NORMAL TEXT
        // =================================================

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                const translation =
                    getTranslation(lang, key);

                if (translation !== null) {

                    element.textContent =
                        translation;

                }

            });


        // =================================================
        // HTML PLACEHOLDER
        // =================================================

        document
            .querySelectorAll("[data-i18n-placeholder]")
            .forEach(element => {

                const key =
                    element.dataset.i18nPlaceholder;

                const translation =
                    getTranslation(lang, key);

                if (translation !== null) {

                    element.placeholder =
                        translation;

                }

            });


        // =================================================
        // ARIA LABEL
        // =================================================

        document
            .querySelectorAll("[data-i18n-aria]")
            .forEach(element => {

                const key =
                    element.dataset.i18nAria;

                const translation =
                    getTranslation(lang, key);

                if (translation !== null) {

                    element.setAttribute(
                        "aria-label",
                        translation
                    );

                }

            });


        // =================================================
        // ALT TEXT
        // =================================================

        document
            .querySelectorAll("[data-i18n-alt]")
            .forEach(element => {

                const key =
                    element.dataset.i18nAlt;

                const translation =
                    getTranslation(lang, key);

                if (translation !== null) {

                    element.setAttribute(
                        "alt",
                        translation
                    );

                }

            });


        // =================================================
        // DESKTOP LANGUAGE LABEL
        // =================================================

        if (currentLanguage) {

            currentLanguage.textContent =
                lang === "id"
                    ? "Indonesia"
                    : "English";

        }


        // =================================================
        // MOBILE LANGUAGE LABEL
        // =================================================

        if (mobileCurrentLanguage) {

            mobileCurrentLanguage.textContent =
                lang === "id"
                    ? "Indonesia"
                    : "English";

        }


        // =================================================
        // ACTIVE LANGUAGE BUTTON
        // =================================================

        buttons.forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.lang === lang
            );

        });


        // =================================================
        // HTML LANG ATTRIBUTE
        // =================================================

        document.documentElement.lang =
            lang;


        // =================================================
        // SAVE LANGUAGE
        // =================================================

        localStorage.setItem(
            "language",
            lang
        );


        // =================================================
        // NOTIFY OTHER JAVASCRIPT
        //
        // Showcase, projects, etc. can listen to this.
        // =================================================

        document.dispatchEvent(
            new CustomEvent(
                "languageChanged",
                {
                    detail: {
                        language: lang
                    }
                }
            )
        );

    }


    // =====================================================
    // LANGUAGE BUTTON
    // =====================================================

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const lang =
                    button.dataset.lang;

                changeLanguage(lang);


                // -----------------------------------------
                // Close desktop language menu
                // -----------------------------------------

                if (languageMenu) {

                    languageMenu.classList.add(
                        "opacity-0",
                        "invisible",
                        "translate-y-2"
                    );

                }


                // -----------------------------------------
                // Close mobile language menu
                // -----------------------------------------

                if (mobileLanguageMenu) {

                    mobileLanguageMenu.classList.add(
                        "hidden"
                    );

                }


                // -----------------------------------------
                // Close mobile hamburger
                // -----------------------------------------

                if (
                    mobileMenu &&
                    menuButton
                ) {

                    mobileMenu.classList.remove(
                        "show"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });


    // =====================================================
    // DESKTOP LANGUAGE DROPDOWN
    // =====================================================

    if (
        languageToggle &&
        languageMenu
    ) {

        languageToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const isClosed =
                    languageMenu.classList.contains(
                        "invisible"
                    );


                if (isClosed) {

                    languageMenu.classList.remove(
                        "opacity-0",
                        "invisible",
                        "translate-y-2"
                    );

                } else {

                    languageMenu.classList.add(
                        "opacity-0",
                        "invisible",
                        "translate-y-2"
                    );

                }

            }
        );

    }


    // =====================================================
    // MOBILE LANGUAGE DROPDOWN
    // =====================================================

    if (
        mobileLanguageToggle &&
        mobileLanguageMenu
    ) {

        mobileLanguageToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                mobileLanguageMenu.classList.toggle(
                    "hidden"
                );

            }
        );

    }


    // =====================================================
    // PREVENT DROPDOWN CLOSING
    // WHEN CLICKING INSIDE
    // =====================================================

    if (languageMenu) {

        languageMenu.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }


    if (mobileLanguageMenu) {

        mobileLanguageMenu.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );

    }


    // =====================================================
    // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    // =====================================================

    document.addEventListener(
        "click",
        () => {

            if (languageMenu) {

                languageMenu.classList.add(
                    "opacity-0",
                    "invisible",
                    "translate-y-2"
                );

            }


            if (mobileLanguageMenu) {

                mobileLanguageMenu.classList.add(
                    "hidden"
                );

            }

        }
    );


    // =====================================================
    // INITIAL LANGUAGE
    // =====================================================

    changeLanguage(
        supportedLanguages.includes(savedLanguage)
            ? savedLanguage
            : "en"
    );

});
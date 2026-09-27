document.addEventListener("DOMContentLoaded", () => {

    // ================================
    // EMAILJS INITIALIZATION
    // ================================

    emailjs.init("tzlnks1QTRCEHhpmC");

    const form = document.getElementById("contactForm");

    if (!form) return;

    const submitButton = form.querySelector(".contact-submit");
    const buttonText = submitButton.querySelector("span");
    const buttonIcon = submitButton.querySelector("i");

    // ================================
    // CONTACT FORM SUBMIT
    // ================================

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // Set current time
        document.getElementById("time").value =
            new Date().toLocaleString("en-US");

        // Prevent multiple submissions
        submitButton.disabled = true;

        // Loading state
        buttonText.textContent = "Sending...";

        if (buttonIcon) {
            buttonIcon.className = "fa-solid fa-spinner fa-spin";
        }

        // ================================
        // SEND EMAIL
        // ================================

        emailjs.sendForm(
            "service_29qeqxd",
            "template_bop72h7",
            this
        )

        .then(() => {

            // ================================
            // SUCCESS
            // ================================

            buttonText.textContent = "Message Sent";

            if (buttonIcon) {
                buttonIcon.className = "fa-solid fa-check";
            }

            // Clear form
            form.reset();

            // Restore button after 3 seconds
            setTimeout(() => {

                buttonText.textContent = "Send Message";

                if (buttonIcon) {
                    buttonIcon.className =
                        "fa-solid fa-arrow-right";
                }

                submitButton.disabled = false;

            }, 3000);

        })

        .catch((error) => {

            // ================================
            // ERROR
            // ================================

            console.error(
                "EmailJS Error:",
                error
            );

            buttonText.textContent = "Failed to Send";

            if (buttonIcon) {
                buttonIcon.className =
                    "fa-solid fa-xmark";
            }

            // Restore button after 3 seconds
            setTimeout(() => {

                buttonText.textContent = "Send Message";

                if (buttonIcon) {
                    buttonIcon.className =
                        "fa-solid fa-arrow-right";
                }

                submitButton.disabled = false;

            }, 3000);

        });

    });

});
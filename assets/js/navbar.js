/* ==========================================
   NAVBAR
   ========================================== */

   const navbar = document.getElementById("navbar");

   window.navbar = navbar;
   
   
   /* ==========================================
      SMOOTH NAVIGATION
      Native scrolling tetap digunakan.
      Smooth hanya untuk klik menu.
      ========================================== */
   
   if (navbar) {
   
       document
           .querySelectorAll('a[href^="#"]')
           .forEach((link) => {
   
               link.addEventListener("click", (event) => {
   
                   const targetId =
                       link.getAttribute("href");
   
                   if (
                       !targetId ||
                       targetId === "#"
                   ) {
                       return;
                   }
   
                   const target =
                       document.querySelector(targetId);
   
                   if (!target) {
                       return;
                   }
   
                   event.preventDefault();
   
                   const reduceMotion =
                       window.matchMedia(
                           "(prefers-reduced-motion: reduce)"
                       ).matches;
   
   
                   const navbarHeight =
                       navbar.offsetHeight;
   
   
                   const targetPosition =
                       target.getBoundingClientRect().top +
                       window.scrollY -
                       navbarHeight -
                       8;
   
   
                   window.scrollTo({
   
                       top: Math.max(
                           0,
                           targetPosition
                       ),
   
                       behavior:
                           reduceMotion
                               ? "auto"
                               : "smooth"
   
                   });
   
   
                   /*
                    * Update URL tanpa membuat browser
                    * melakukan jump kedua.
                    */
   
                   if (history.replaceState) {
   
                       history.replaceState(
                           null,
                           "",
                           targetId
                       );
   
                   }
   
               });
   
           });
   
   }
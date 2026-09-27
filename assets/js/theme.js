// /* ==========================================
//    THEME
// ========================================== */

// const html = document.documentElement;

// const desktopBtn =
// document.getElementById("theme-toggle");

// const mobileBtn =
// document.getElementById("theme-toggle-mobile");

// const desktopIcon =
// document.getElementById("theme-icon");

// const mobileIcon =
// document.getElementById("theme-icon-mobile");

// function setTheme(theme){

//     if(theme==="light"){

//         html.classList.add("light-mode");

//         desktopIcon?.classList.replace(
//             "fa-moon",
//             "fa-sun"
//         );

//         mobileIcon?.classList.replace(
//             "fa-moon",
//             "fa-sun"
//         );

//     }else{

//         html.classList.remove("light-mode");

//         desktopIcon?.classList.replace(
//             "fa-sun",
//             "fa-moon"
//         );

//         mobileIcon?.classList.replace(
//             "fa-sun",
//             "fa-moon"
//         );

//     }

//     localStorage.setItem(
//         "theme",
//         theme
//     );

// }

// const savedTheme=
// localStorage.getItem("theme")||"dark";

// setTheme(savedTheme);

// desktopBtn?.addEventListener("click",()=>{

//     setTheme(
//         html.classList.contains("light-mode")
//         ? "dark"
//         : "light"
//     );

// });

// mobileBtn?.addEventListener("click",()=>{

//     setTheme(
//         html.classList.contains("light-mode")
//         ? "dark"
//         : "light"
//     );

// });
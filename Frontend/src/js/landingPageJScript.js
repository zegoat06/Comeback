
// SWIFTBANK LANDING PAGE JAVASCRIPT


document.addEventListener("DOMContentLoaded", () => {

   
    // Navbar Shadow on Scroll
    

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.style.boxShadow = "0 10px 25px rgba(0,0,0,0.25)";

        } else {

            header.style.boxShadow = "none";

        }

    });



    // Active Navigation Link
    

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + current) {

                link.classList.add("active");

            }

        });

    });



  
    // Hero Button Actions
   

    const openBtn = document.querySelector(".primary-btn");

    if (openBtn) {

        openBtn.addEventListener("click", function (e) {

            e.preventDefault();

            alert("Registration page will open here.");

        });

    }



    const learnBtn = document.querySelector(".secondary-btn");

    if (learnBtn) {

        learnBtn.addEventListener("click", function (e) {

            e.preventDefault();

            document.querySelector("#feature").scrollIntoView({

                behavior: "smooth"

            });

        });

    }



   
    // Button Click Animation
    

    const buttons = document.querySelectorAll("a");

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            button.style.transform = "scale(.95)";

            setTimeout(() => {

                button.style.transform = "";

            }, 150);

        });

    });



  
    // Feature Cards Animation
    

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-12px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0)";

        });

    });



    // Step Cards Animation


    const steps = document.querySelectorAll(".step");

    steps.forEach(step => {

        step.addEventListener("mouseenter", () => {

            step.style.transform = "scale(1.05)";

        });

        step.addEventListener("mouseleave", () => {

            step.style.transform = "scale(1)";

        });

    });



    
    // Welcome Message
    console.log("Welcome to SwiftBank.");

});
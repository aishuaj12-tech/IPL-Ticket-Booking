/* =================================
   IPL TICKET BOOKING WEBSITE
   ACTIVITY 5 - JAVASCRIPT
================================= */

/* 1. REUSABLE TOAST FUNCTION */
function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.backgroundColor = "#003366";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "1000";
    toast.style.display = "block";

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}


/* 2. DOM CONTENT LOADED */
document.addEventListener("DOMContentLoaded", function () {

    /* 3. BOOK BUTTONS AND SMOOTH SCROLLING */
    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const matchName = button.getAttribute("data-match");

            const bookingSection = document.getElementById("booking");
            const matchSelect = document.getElementById("match");

            if (matchSelect && bookingSection) {

                matchSelect.value = matchName;

                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Selected match: " + matchName);
            }

        });

    });


    /* 4. BOOKING FORM SUBMISSION */
    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            showToast("Your booking request has been submitted successfully!");

            bookingForm.reset();

        });

    }

});

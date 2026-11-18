/* =================================
   IPL TICKET BOOKING WEBSITE
   ACTIVITY 5, 6 AND 7 - JAVASCRIPT
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

    /* 3. GET FORM ELEMENTS */
    const bookingForm = document.getElementById("bookingForm");

    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const ticketsInput = document.getElementById("tickets");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryTickets = document.getElementById("summaryTickets");
    const summaryTotal = document.getElementById("summaryTotal");


    /* 4. TICKET PRICES */
    const ticketPrices = {

        "RCB vs MI": {
            "General": 1000,
            "Premium": 2500,
            "VIP": 5000
        },

        "CSK vs KKR": {
            "General": 1200,
            "Premium": 3000,
            "VIP": 5500
        },

        "MI vs CSK": {
            "General": 1500,
            "Premium": 3500,
            "VIP": 6000
        },

        "KKR vs RCB": {
            "General": 1000,
            "Premium": 2800,
            "VIP": 5000
        }

    };


    /* 5. UPDATE BOOKING SUMMARY */
    function updateSummary(showNotification = false) {

        const match = matchSelect.value;
        const stand = standSelect.value;
        const quantity = Number(ticketsInput.value);

        summaryMatch.textContent = match || "Not selected";

        summaryStand.textContent = stand || "Not selected";

        summaryTickets.textContent =
            ticketsInput.value ? ticketsInput.value : "Not selected";

        let total = 0;

        if (
            match &&
            stand &&
            Number.isSafeInteger(quantity) &&
            quantity >= 1 &&
            ticketPrices[match] &&
            ticketPrices[match][stand]
        ) {

            total = ticketPrices[match][stand] * quantity;

        }

        summaryTotal.textContent =
            "₹" + total.toLocaleString("en-IN");

        if (showNotification) {
            showToast("Booking Summary Updated!");
        }

    }


    /* 6. LIVE SUMMARY UPDATES */

    matchSelect.addEventListener("change", function () {
        updateSummary(true);
    });

    standSelect.addEventListener("change", function () {
        updateSummary(true);
    });

    ticketsInput.addEventListener("input", function () {
        updateSummary();
    });

    ticketsInput.addEventListener("change", function () {
        updateSummary(true);
    });


    /* 7. BOOK BUTTONS AND SMOOTH SCROLLING */

    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const matchName = button.getAttribute("data-match");

            const bookingSection = document.getElementById("booking");

            if (matchSelect && bookingSection) {

                matchSelect.value = matchName;

                updateSummary();

                bookingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                showToast("Selected match: " + matchName);

            }

        });

    });


    /* 8. TEAM FILTER */

    const teamFilter = document.getElementById("teamFilter");

    if (teamFilter) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;

            const rows = document.querySelectorAll("#matches tbody tr");

            rows.forEach(function (row) {

                const teams = row.cells[1].textContent;

                if (
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam)
                ) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }


    /* 9. BOOKING FORM SUBMISSION */

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            updateSummary();

            showToast("Your booking request has been submitted successfully!");

            bookingForm.reset();

            updateSummary();

        });


        /* 10. RESET FORM */

        bookingForm.addEventListener("reset", function () {

            setTimeout(function () {
                updateSummary();
            }, 0);

        });

    }


    /* 11. INITIAL SUMMARY */
    updateSummary();

});

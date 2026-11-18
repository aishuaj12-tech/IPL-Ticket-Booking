/* =================================
   IPL TICKET BOOKING WEBSITE
   ACTIVITY 5, 6, 7 AND 8
================================= */

/* 1. TOAST NOTIFICATION */
function showToast(message) {
    let toast = document.getElementById("toast");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        document.body.appendChild(toast);
    }

    toast.textContent = message;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "30px",
        right: "30px",
        backgroundColor: "#003366",
        color: "white",
        padding: "15px 25px",
        borderRadius: "8px",
        zIndex: "2000",
        display: "block"
    });

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {
        toast.style.display = "none";
    }, 3000);
}


/* 2. DOM CONTENT LOADED */
document.addEventListener("DOMContentLoaded", function () {

    /* 3. BOOKING FORM ELEMENTS */
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
            ticketsInput.value || "Not selected";

        let total = 0;

        if (
            match &&
            stand &&
            ticketsInput.value !== "" &&
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


    /* 7. BOOK BUTTONS */
    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const matchName = button.getAttribute("data-match");

            matchSelect.value = matchName;
            updateSummary();

            document.getElementById("booking").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            showToast("Selected match: " + matchName);
        });
    });


    /* 8. TEAM FILTER FOR MATCH CARDS */
    const teamFilter = document.getElementById("teamFilter");
    const matchCards = document.querySelectorAll(".match-card");

    if (teamFilter) {

        teamFilter.addEventListener("change", function () {

            const selectedTeam = teamFilter.value;

            matchCards.forEach(function (card) {

                const teams = card.querySelector("h2").textContent;

                if (
                    selectedTeam === "all" ||
                    teams.includes(selectedTeam)
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    /* 9. GRID AND LIST VIEW */
    const matchContainer = document.getElementById("matchContainer");

    const gridView = document.getElementById("gridView");
    const listView = document.getElementById("listView");

    gridView.addEventListener("click", function () {
        matchContainer.classList.remove("list-view");
        showToast("Grid View Selected");
    });

    listView.addEventListener("click", function () {
        matchContainer.classList.add("list-view");
        showToast("List View Selected");
    });


    /* 10. HAMBURGER MENU */
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    /* Close menu after selecting a navigation link */
    navMenu.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });


    /* 11. BOOKING FORM SUBMISSION */
    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            updateSummary();

            const match = matchSelect.value;
            const stand = standSelect.value;
            const quantity = Number(ticketsInput.value);
            const total = ticketPrices[match][stand] * quantity;

            const bookingRecords =
                document.getElementById("bookingRecords");

            const noBookings =
                document.getElementById("noBookings");

            const newRow = document.createElement("tr");

            const bookingID =
                "IPL" + Date.now().toString().slice(-6);

            const values = [
                bookingID,
                match,
                stand,
                quantity,
                "₹" + total.toLocaleString("en-IN")
            ];

            values.forEach(function (value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                newRow.appendChild(cell);
            });

            bookingRecords.appendChild(newRow);

            noBookings.style.display = "none";

            showToast("Booking Confirmed Successfully!");

            bookingForm.reset();
            updateSummary();
        });

        /* 12. RESET FORM */
        bookingForm.addEventListener("reset", function () {

            setTimeout(function () {
                updateSummary();
            }, 0);
        });
    }

    /* 13. INITIAL SUMMARY */
    updateSummary();

});

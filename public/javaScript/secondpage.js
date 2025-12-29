//////////////// SIDEBAR //////////////////////////////

const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

// Open logic
menuBtn.onclick = function () {
    sidebar.style.display = "block";
    closeBtn.style.display = "block";
    menuBtn.style.display = "none";
};

// Close logic
closeBtn.onclick = function () {
    sidebar.style.display = "none";
    menuBtn.style.display = "block";
    closeBtn.style.display = "none";
};

document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    // console.log("Current Browser Path:", currentPath); // Debug current URL

    const sidebarItems = document.querySelectorAll('#sidebar-nav .sidebar-child');

    sidebarItems.forEach(item => {
        const link = item.querySelector('a');
        const href = link.getAttribute('href');

        // Log each comparison to see why it might fail
        // console.log(`Checking link: ${href} | Match: ${currentPath === href}`);

        if (currentPath === href) {
            item.classList.add('active');
            // console.log("✅ Added 'active' class to:", item);

            // // Final check: Does the element have the class now?
            // if (item.classList.contains('active')) {
            //     console.log("Verified: Element now has class 'active'");
            // }
        }
    });
});
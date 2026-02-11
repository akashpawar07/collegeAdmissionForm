//////////////// SIDEBAR TOGGLE LOGIC //////////////////////////////
const menuBtn = document.getElementById("menubar");
const sidebar = document.getElementById("sidebar-nav");
const closeBtn = document.getElementById("close-crossbar");

// Open logic
menuBtn.onclick = function () {
    // Instead of display:block, we add the 'active' class to slide it in
    sidebar.classList.add("active");
    
    // Toggle the buttons
    closeBtn.style.display = "block";
    menuBtn.style.display = "none";
};

// Close logic
closeBtn.onclick = function () {
    // Remove class to slide it out
    sidebar.classList.remove("active");
    
    // Toggle the buttons
    closeBtn.style.display = "none";
    menuBtn.style.display = "block";
};

// Function for getting current URL (Active Tab Highlighting)
document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    
    // Select the <a> tags directly since they now have the class .sidebar-child
    const sidebarLinks = document.querySelectorAll('.sidebar-child');

    sidebarLinks.forEach(link => {
        // Check if the link's href matches current path
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});


/////////////// FORM INPUT AUTO-FILL (Keep existing logic) ///////////////
const surname = sessionStorage.getItem("surname");
const firstName = sessionStorage.getItem("firstName");
const fatherName = sessionStorage.getItem("fatherName");

// Check if session data exists to avoid "null null" appearing
if(surname && firstName && fatherName) {
    document.getElementById("parent-name").value = fatherName + " " + surname;
    document.getElementById("stu-name").value = firstName + " " + surname;
    document.getElementById("parent-name2").value = fatherName + " " + surname;
    document.getElementById("stu-name2").value = firstName + " " + surname;
}
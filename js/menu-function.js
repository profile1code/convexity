
function injectDropdownMenu() {
    const menuHtml = `
        <div id="loginDropdown" class="dropdown-content">
            <a href="signin.html">Sign In</a>
            <a href="signup.html">Sign Up</a>
        </div>
    `;
    
    // Get the body element or a specific div and append the dropdown
    document.body.insertAdjacentHTML('beforeend', menuHtml);
}

// Call the function to inject the dropdown menu
injectDropdownMenu();

// Function to toggle the dropdown menu when the login button is clicked
function toggleMenu() {
    var menu = document.getElementById("loginDropdown");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}
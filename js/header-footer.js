// loads up the top bar and footer for each page without needing to modify it for all pages
document.addEventListener("DOMContentLoaded", function() {
    // Create the top navigation bar


    const loginTopNav = `
        <div class="topnav">
            <a class="active" href="index.html" id="home">Home</a>
            <a class="active" href="/user-teams.html" id="user-teams">My Teams</a>
            <a href="signin.html" id="login">Login</a>
        </div>
    `;

    const footer = `
        <footer>
            <p>2024</p>
        </footer>
    `;
    const logoutTopNav = `
        <div class="topnav">
            <a class="active" href="index.html" id="home">Home</a>
            <a class="active" href="/user-teams.html" id="user-teams">My Teams</a>
            <a href="index.html" id="login" onclick="logoutUser();">Logout</a>
        </div>
    `;
    // Insert the top navigation bar into the body at the start
    const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("loggedin="))
        ?.split("=")[1];

    const body = document.body;
    const divTopNav = document.createElement('div');
    if (cookieValue == null) {
        divTopNav.innerHTML = loginTopNav;
        body.insertBefore(divTopNav, body.firstChild);  // Adds the topnav as the first element in the body
    } else {
        divTopNav.innerHTML = logoutTopNav;
        body.insertBefore(divTopNav, body.firstChild);  // Adds the topnav as the first element in the body
    }
    // Append the footer to the body
    const divFooter = document.createElement('div');
    divFooter.innerHTML = footer;
    body.appendChild(divFooter);  // Adds the footer at the end of the body


    //includeMenuFunction();
});


function includeMenuFunction() {
    // Load the JavaScript file for menu functionality
    const script = document.createElement('script');
    script.src = 'menu-function.js';
    script.defer = true;
    document.head.appendChild(script);
}

function logoutUser() {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
    }
}

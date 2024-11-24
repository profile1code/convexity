// loads up the top bar and footer for each page without needing to modify it for all pages
document.addEventListener("DOMContentLoaded", function() {
    // Create the top navigation bar


    const topNav = `
        <div class="topnav">
            <a class="active" href="index.html" id="home">Home</a>
            <a class="active" href="/test.html" id="test">Test</a>
            <a href="signin.html" id="login">Login</a>
        </div>
    `;

    const footer = `
        <footer>
            <p>2024</p>
        </footer>
    `;

    // Insert the top navigation bar into the body at the start
    const body = document.body;
    const divTopNav = document.createElement('div');
    divTopNav.innerHTML = topNav;
    body.insertBefore(divTopNav, body.firstChild);  // Adds the topnav as the first element in the body

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


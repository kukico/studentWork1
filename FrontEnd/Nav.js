// Function to Navigate Between Webpages
function Nav() {
    const pageLinks = {
        "signUpPageBtn": "SignUp.html",
        "forgotPasswordBtn": "ForgotPassword.html",
        "signInPageBtn": "index.html",
        "backPageBtn": "index.html",
        "homePageBtn": "home.html",
        "settingsBtn" : "Settings.html",
        "quickIntakeBtn" : "QuickIntakePopup.html",
        "crisisStepsBtn": "Emergency2.html",
        "airQltyBar" : "AirQuality2.html",
        "inhalerBar": "MyInhaler.html",
        "emergencyBar": "Emergency1.html",
        "signUpBtn" : "Home.html"
    };

    const navigationButtons = [
        document.getElementById("forgotPasswordBtn"),
        document.getElementById("signInPageBtn"),
        document.getElementById("signUpPageBtn"),
        document.getElementById("backPageBtn"),
        document.getElementById("homePageBtn"),
        document.getElementById("settingsBtn"),
        document.getElementById("quickIntakeBtn"),
        document.getElementById("crisisStepsBtn"),
        document.getElementById("airQltyBar"),
        document.getElementById("inhalerBar"),
        document.getElementById('emergencyBar'),
        document.getElementById('signUpBtn')
    ];

    navigationButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", function(e) {
                const id = btn.getAttribute("id");
                if (pageLinks[id]) {
                    window.location.href = pageLinks[id];
                } else {
                    console.error(`No link defined for button with id ${id}`);
                }
            });
        }
    });
}

export default Nav;
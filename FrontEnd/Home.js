var popupcancelBtnContainer = document.getElementById("popupcancelBtnContainer");
if (popupcancelBtnContainer) {
    popupcancelBtnContainer.addEventListener("click", function (e) {
        var popup = e.currentTarget.parentNode;
        function isOverlay(node) {
            return !!(node && node.classList && node.classList.contains("popup-overlay"));
        }
        while (popup && !isOverlay(popup)) {
            popup = popup.parentNode;
        }
        if (isOverlay(popup)) {
            popup.style.display = "none";
        }
    });
}

var profilePicture = document.getElementById("settingsBtn");
if (profilePicture) {
    profilePicture.addEventListener("click", function (e) {
        window.location.href = "./Settings.html";
    });
}

var quickIntakeBtn = document.getElementById("quickIntakeBtn");
if (quickIntakeBtn) {
    quickIntakeBtn.addEventListener("click", function () {
            if (Inhaler.favInhaler == null) {
                window.alert("You haven't chose a favourite inhaler yet!")
            } else {
                var popup = document.getElementById("quickIntakePopup");
                if (!popup) return;
                var popupStyle = popup.style;
                if (popupStyle) {
                    popupStyle.display = "flex";
                    popupStyle.zIndex = 100;
                    popupStyle.backgroundColor = "rgba(30, 56, 95, 0.8)";
                    popupStyle.alignItems = "center";
                    popupStyle.justifyContent = "center";
                }
                popup.setAttribute("closable", "");

                var onClick = popup.onClick || function (e) {
                    if (e.target === popup && popup.hasAttribute("closable")) {
                        popupStyle.display = "none";
                    }
                };
                popup.addEventListener("click", onClick);
            }
        }
        );
}
    if (Inhaler.favInhaler == null) {
        window.alert("You haven't chose a favourite inhaler yet!")
    }
    else {
        const nextReminderTime = document.getElementById('nextReminderVar');
        nextReminderTime.textContent =Inhaler.getFavInhaler().getNextDoseTime();

        const intakeExpiresIn = document.getElementById("expiryDateFavVar");
        milliUntilIntake = Inhaler.getFavInhaler().getNextDoseTime()-Date.now();

        hoursUntilIntake = (milliUntilIntake/86400000)
        intakeExpiresIn.textContent = hoursUntilIntake.toString()+" hours";
    }



var home = document.getElementById("999Home");
if (home) {
    home.addEventListener("click", function (e) {
        //TODO: <a href="tel:999">
    });
}

var crisisStepsBtn = document.getElementById("crisisStepsBtn");
if (crisisStepsBtn) {
    crisisStepsBtn.addEventListener("click", function (e) {
        window.location.href = "./Emergency2.html";
    });
}

var cloud = document.getElementById("airQltyBar");
if (cloud) {
    cloud.addEventListener("click", function (e) {
        window.location.href = "./AirQuality01.html";
    });
}

var inhaler = document.getElementById("inhalerBar");
if (inhaler) {
    inhaler.addEventListener("click", function (e) {
        window.location.href = "./MyInhaler.html";
    });
}

var hospital = document.getElementById("emergencyBar");
if (hospital) {
    hospital.addEventListener("click", function (e) {
        window.location.href = "./Emergency1.html";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded: DOM fully loaded!");

    let form = document.querySelector("form");
    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (!form || !postcodeField || !honeypotField) {
        console.warn("⚠️ Required fields not found! Script may be running too early.");
        return;
    }

    console.log("✅ Honeypot and postcode fields found! Preparing to validate...");

    // Create error message element
    let errorMessage = document.getElementById("postcode-error-msg");
    if (!errorMessage) {
        errorMessage = document.createElement("div");
        errorMessage.id = "postcode-error-msg";
        errorMessage.style.color = "red";
        errorMessage.style.fontWeight = "bold";
        errorMessage.style.marginTop = "5px";
        errorMessage.style.display = "none"; // Start hidden
        errorMessage.textContent = "❌ Invalid postcode. Please check and try again.";
        postcodeField.parentNode.appendChild(errorMessage);
    }

    function isValidPostcode(postcode) {
        let postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
        return postcodePattern.test(postcode.trim());
    }

    function validatePostcode(event) {
        let postcodeValue = postcodeField.value.trim();
        console.log(`📩 Postcode entered: "${postcodeValue}"`);

        let logData = sessionStorage.getItem("formLogs") || "";
        logData += `\n📩 Postcode: "${postcodeValue}"\n`;

        if (!isValidPostcode(postcodeValue)) {
            console.warn("❌ Invalid postcode detected! Blocking form submission...");
            honeypotField.value = "INVALID POSTCODE";

            event.preventDefault(); // 🚨 Stop form submission
            event.stopImmediatePropagation(); // 🚨 Full nuclear stop
            event.stopPropagation();

            errorMessage.style.display = "block"; // Show error
            logData += "⛔️ Submission blocked due to invalid postcode.\n";

            sessionStorage.setItem("formLogs", logData);
            return false;
        } else {
            console.log("✅ Valid postcode entered. Form can proceed.");
            honeypotField.value = ""; // Reset honeypot field
            errorMessage.style.display = "none"; // Hide error
            logData += "✅ Valid postcode - Form submitted.\n";

            sessionStorage.setItem("formLogs", logData);
            return true;
        }
    }

    // **Force the validation function to execute before submission**
    function enforceValidation(event) {
        let result = validatePostcode(event);
        if (!result) {
            console.warn("⛔️ Submission blocked. Preventing BD override...");
            event.preventDefault();
            event.stopImmediatePropagation();
            return false;
        }
    }

    form.addEventListener("submit", enforceValidation, true); // Use capture phase for priority
    form.addEventListener("submit", enforceValidation, false); // Use bubble phase too

    console.log("🚀 Form submission listener added.");
});

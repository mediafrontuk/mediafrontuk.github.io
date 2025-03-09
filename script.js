document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded: DOM fully loaded!");

    let honeypotField = document.querySelector('input[name="bd_hpc"]');
    let postcodeField = document.querySelector('input[name="postcode"]');

    if (honeypotField && postcodeField) {
        console.log("✅ Honeypot and postcode fields found! Preparing to validate...");

        // Check if error message already exists
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

                event.preventDefault(); // 🚨 Stop form submission!
                event.stopImmediatePropagation(); // 🚨 Make sure BD validation doesn't override
                event.stopPropagation(); // 🚨 Fully halt event propagation
                
                errorMessage.style.display = "block"; // Show error
                logData += "⛔️ Submission blocked due to invalid postcode.\n";

                sessionStorage.setItem("formLogs", logData); // Store log BEFORE page changes
                return false;
            } else {
                console.log("✅ Valid postcode entered. Form can proceed.");
                honeypotField.value = ""; // Reset honeypot field for valid postcodes
                errorMessage.style.display = "none"; // Hide error
                logData += "✅ Valid postcode - Form submitted.\n";

                sessionStorage.setItem("formLogs", logData); // Save log before redirect
                return true;
            }
        }

        let form = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", function (event) {
                console.log("🚀 Form submission detected...");
                let result = validatePostcode(event);
                if (!result) {
                    console.warn("⛔️ Submission blocked due to invalid postcode.");
                }
            });

            console.log("🚀 Form submission listener added.");
        } else {
            console.warn("⚠️ No form found! Ensure script runs on the correct page.");
        }
    } else {
        console.warn("⚠️ Required fields not found! Script may be running too early.");
    }
});

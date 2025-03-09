document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded: DOM fully loaded!");

    let honeypotField = document.querySelector('input[name="bd_hpc"]');
    let postcodeField = document.querySelector('input[name="postcode"]');

    if (honeypotField && postcodeField) {
        console.log("✅ Honeypot and postcode fields found! Preparing to validate...");

        // UK postcode regex validation
        function isValidPostcode(postcode) {
            let postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
            return postcodePattern.test(postcode.trim());
        }

        function validatePostcode(event) {
            let postcodeValue = postcodeField.value.trim();
            console.log(`📩 Postcode entered: "${postcodeValue}"`);

            if (!isValidPostcode(postcodeValue)) {
                console.warn("❌ Invalid postcode detected! Blocking form submission...");
                
                honeypotField.value = "INVALID POSTCODE";
                honeypotField.dispatchEvent(new Event("input", { bubbles: true }));
                honeypotField.dispatchEvent(new Event("change", { bubbles: true }));
                
                event.preventDefault(); // 🚨 Stop form submission!
                event.stopPropagation(); // 🚨 Ensure it does not propagate further!

                return false;
            } else {
                console.log("✅ Valid postcode entered. Form can proceed.");
                honeypotField.value = ""; // Reset honeypot field for valid postcodes
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

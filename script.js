document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded: DOM fully loaded!");

    let honeypotField = document.querySelector('input[name="bd_hpc"]');
    let postcodeField = document.querySelector('input[name="postcode"]');

    if (honeypotField && postcodeField) {
        console.log("✅ Honeypot and postcode fields found! Preparing to validate...");

        // Validate postcode format (UK Postcode regex example)
        function isValidPostcode(postcode) {
            let postcodePattern = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
            return postcodePattern.test(postcode.trim());
        }

        // Function to inject "INVALID POSTCODE" if validation fails
        function validatePostcode() {
            let postcodeValue = postcodeField.value.trim();
            
            if (!isValidPostcode(postcodeValue)) {
                honeypotField.value = "INVALID POSTCODE";
                honeypotField.dispatchEvent(new Event("input", { bubbles: true }));
                honeypotField.dispatchEvent(new Event("change", { bubbles: true }));
                console.warn("❌ Invalid postcode detected! Form will be blocked.");
            } else {
                honeypotField.value = "";
                console.log("✅ Valid postcode entered.");
            }
        }

        // Trigger validation when form is submitted
        let form = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", function (event) {
                validatePostcode();
            });
            console.log("🚀 Form submission listener added.");
        } else {
            console.warn("⚠️ No form found! Ensure script runs on the correct page.");
        }
    } else {
        console.warn("⚠️ Required fields not found! Script may be running too early.");
    }
});

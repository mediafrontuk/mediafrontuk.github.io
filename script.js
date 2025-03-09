document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded: DOM fully loaded!");

    let form = document.querySelector("form");
    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (form && postcodeField && honeypotField) {
        console.log("✅ Honeypot and postcode fields found! Preparing to validate...");

        // 🚀 Prevent form submission if postcode is invalid
        form.addEventListener("submit", function (event) {
            let postcodeValue = postcodeField.value.trim();
            console.log("🔍 Checking postcode:", postcodeValue);

            if (!/^(?:[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i.test(postcodeValue)) {
                console.warn("⛔ Invalid postcode detected! Injecting honeypot value...");
                honeypotField.value = "INVALID POSTCODE";  // Ensure honeypot gets set
            } else {
                console.log("✅ Valid postcode, form submission allowed.");
            }
        });
    } else {
        console.error("❌ Form, postcode field, or honeypot field not found!");
    }
});

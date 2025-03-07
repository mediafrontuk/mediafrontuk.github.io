console.log("🚀 Script loaded and running!");
document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form"); // Adjust this selector if needed
    let postcodeField = document.querySelector('input[name="postcode"]'); // Adjust based on actual field name
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    // List of allowed area codes (First two letters or single letter + digit)
    const validPrefixes = ["AB", "CD", "EF", "GH", "JK", "C", "E", "L", "S"];

    if (form && postcodeField && honeypotField) {
        form.addEventListener("submit", function (event) {
            let postcode = postcodeField.value.toUpperCase().replace(/\s+/g, ""); // Remove spaces and normalize case
            console.log("📌 Postcode Submitted:", postcode);

            // Extract first two characters (or first letter + digit)
            let prefix = postcode.substring(0, 2);
            if (!isNaN(prefix[1])) prefix = prefix[0]; // Handle single letter + digit case

            // UK postcode pattern validation (2L+2N+2L format, etc.)
            let postcodePattern = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[0-9][A-Z]{2}$/;
            let isValidPostcode = validPrefixes.includes(prefix) && postcodePattern.test(postcode);

            if (!isValidPostcode) {
                honeypotField.value = "INVALID POSTCODE"; // BD will filter it out
                console.warn("⚠️ Invalid postcode detected. Injecting honeypot trigger.");
            } else {
                honeypotField.value = ""; // Clear honeypot if valid
                console.log("✅ Valid postcode. No spam flag needed.");
            }
        });
    } else {
        console.warn("⚠️ Form, postcode field, or honeypot field not found.");
    }
});

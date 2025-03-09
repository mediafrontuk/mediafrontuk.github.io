document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Widget Script Loaded!");

    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (postcodeField && honeypotField) {
        console.log("✅ Postcode and honeypot fields found!");

        const validTwoLetters = ["AB", "CD", "EF", "GH", "JK", "LM"];
        const validSingleLetters = ["E", "L", "N", "S"];

        function validatePostcode(postcode) {
            postcode = postcode.replace(/\s/g, "").toUpperCase();
            const patterns = [
                /^([A-Z]{2})(\d{3})([A-Z]{2})$/,
                /^([A-Z]{2})(\d{1})([A-Z]{1})(\d{1})([A-Z]{2})$/,
                /^([A-Z]{1})(\d{2})(\d{1})([A-Z]{2})$/,
                /^([A-Z]{2})(\d{2})([A-Z]{2})$/,
                /^([A-Z]{1})(\d{1})([A-Z]{1})(\d{1})([A-Z]{2})$/,
                /^([A-Z]{1})(\d{1})([A-Z]{2})$/
            ];

            for (let pattern of patterns) {
                let match = postcode.match(pattern);
                if (match) {
                    let outcodeLetters = match[1];
                    if (outcodeLetters.length === 2 && validTwoLetters.includes(outcodeLetters)) {
                        return true;
                    } else if (outcodeLetters.length === 1 && validSingleLetters.includes(outcodeLetters)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Validate on input change
        postcodeField.addEventListener("input", function () {
            let postcodeValue = postcodeField.value.trim();
            if (postcodeValue) {
                if (!validatePostcode(postcodeValue)) {
                    console.warn("⛔ Invalid postcode entered!");
                    honeypotField.value = "INVALID POSTCODE";
                } else {
                    console.log("✅ Postcode valid.");
                    honeypotField.value = "";
                }
            }
        });
    } else {
        console.error("❌ Fields not found!");
    }
});

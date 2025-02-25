document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Postcode Validator Starting...");

    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let postcode = document.getElementById("postcode").value.trim().toUpperCase();
        postcode = postcode.split(" ").join(""); // Remove spaces
        console.log("📌 Test Postcode Before Processing:", postcode);

        // First validation: Allowed first part (area codes)
        const validFirstParts = ["AB", "CD", "EF", "GH", "JK"];
        const validSingleLetterParts = ["C", "E", "L", "S"];

        let firstPartMatch = false;

        if (postcode.length >= 2) {
            const firstTwo = postcode.substring(0, 2);
            const firstOne = postcode.charAt(0);
            const secondChar = postcode.charAt(1);

            if (validFirstParts.includes(firstTwo) || (validSingleLetterParts.includes(firstOne) && /\d/.test(secondChar))) {
                firstPartMatch = true;
            }
        }

        if (!firstPartMatch) {
            console.log("❌ INVALID: First part of postcode is not recognized.");
            appendInvalidPostcode();
            this.submit(); // Submit form with "INVALID POSTCODE" in message
            return;
        }

        console.log("✅ First part of postcode is valid!");

        // Second validation: UK postcode format check
        const digitPattern = "\\d";
        const patterns = [
            { type: "2L+3N+2L", regex: new RegExp(`^[A-Z]{2}${digitPattern}{3}[A-Z]{2}$`, "i") },
            { type: "2L+1N+1L+1N+2L", regex: new RegExp(`^[A-Z]{2}${digitPattern}[A-Z]${digitPattern}[A-Z]{2}$`, "i") },
            { type: "1L+2N+1N+2L", regex: new RegExp(`^[A-Z]${digitPattern}{2}${digitPattern}[A-Z]{2}$`, "i") },
            { type: "2L+2N+2L", regex: new RegExp(`^[A-Z]{2}${digitPattern}{2}[A-Z]{2}$`, "i") },
            { type: "1L+1N+1L+1N+2L", regex: new RegExp(`^[A-Z]${digitPattern}[A-Z]${digitPattern}[A-Z]{2}$`, "i") },
            { type: "1L+1N+2L", regex: new RegExp(`^[A-Z]${digitPattern}{2}[A-Z]$`, "i") }
        ];

        let isValid = patterns.some(pattern => pattern.regex.test(postcode));

        if (!isValid) {
            console.log("❌ INVALID: Does not match UK postcode format.");
            appendInvalidPostcode();
        } else {
            console.log("✅ Postcode Validator Successfully Processed!");
        }

        this.submit(); // Submit form regardless
    });

    function appendInvalidPostcode() {
        let messageField = document.getElementById("message");
        let prefix = "[INVALID POSTCODE] ";

        if (!messageField.value.startsWith(prefix)) { 
            messageField.value = prefix + messageField.value;
        }

        console.log("📧 Prefilled Message:", messageField.value);
    }
});

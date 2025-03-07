document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Postcode Validator Starting...");

    document.addEventListener("submit", function (event) {
        let form = event.target;
        let postcodeField = form.querySelector("input[name='postcode']");
        let honeypotField = form.querySelector("input[name='bd_hpc']");
        
        if (!postcodeField || !honeypotField) {
            console.warn("⚠️ Required fields not found in the form.");
            return;
        }

        let testPostcode = postcodeField.value.trim().toUpperCase();
        console.log("📌 Test Postcode Before Processing:", testPostcode);

        // Remove spaces (alternative to backslash issues in BD)
        testPostcode = testPostcode.split(" ").join("");
        console.log("🔍 Postcode After Space Removal:", testPostcode);

        // Allowable prefixes
        const validPrefixes = ["AB", "CD", "EF", "GH", "JK", "C", "E", "L", "S"];
        
        let isValidPrefix = validPrefixes.some(prefix => testPostcode.startsWith(prefix));
        if (!isValidPrefix) {
            console.log("❌ INVALID: Prefix not in the allowed list.");
            honeypotField.value = "INVALID POSTCODE";
            return;
        }

        // Postcode patterns (UK format)
        const digitPattern = "\\d";
        const patterns = [
            { type: "2L+3N+2L", regex: new RegExp(`^[A-Z]{2}${digitPattern}{3}[A-Z]{2}$`, "i") },
            { type: "2L+1N+1L+1N+2L", regex: new RegExp(`^[A-Z]{2}${digitPattern}[A-Z]${digitPattern}[A-Z]{2}$`, "i") },
            { type: "1L+2N+1N+2L", regex: new RegExp(`^[A-Z]${digitPattern}{2}${digitPattern}[A-Z]{2}$`, "i") },
            { type: "2L+2N+2L", regex: new RegExp(`^[A-Z]{2}${digitPattern}{2}[A-Z]{2}$`, "i") },
            { type: "1L+1N+1L+1N+2L", regex: new RegExp(`^[A-Z]${digitPattern}[A-Z]${digitPattern}[A-Z]{2}$`, "i") },
            { type: "1L+1N+2L", regex: new RegExp(`^[A-Z]${digitPattern}{2}[A-Z]$`, "i") }
        ];

        let isValid = patterns.some(pattern => {
            if (pattern.regex.test(testPostcode)) {
                console.log(`✅ Matched Pattern: ${pattern.type}`);
                return true;
            }
            return false;
        });

        if (!isValid) {
            console.log("❌ INVALID: Does not match any UK postcode pattern.");
            honeypotField.value = "INVALID POSTCODE";
        } else {
            console.log("✅ Postcode Validator Successfully Processed!");
        }
    }, true);
});

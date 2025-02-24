document.addEventListener("DOMContentLoaded", function () {    
    console.log("🚀 Postcode Validator Starting...");

    let testPostcode = "AB12 CD"; // Example postcode with space
    console.log("📌 Test Postcode Before Processing:", testPostcode);

    // Space removal using split/join (avoiding BD regex stripping issue)
    testPostcode = testPostcode.split(" ").join("");     
    console.log("🔍 Postcode After Space Removal:", testPostcode);

    // Corrected regex patterns using [0-9] instead of \d
    const patterns = [
        { type: "2L+3N+2L", regex: /^[A-Z]{2}[0-9]{3}[A-Z]{2}$/i },
        { type: "2L+1N+1L+1N+2L", regex: /^[A-Z]{2}[0-9][A-Z][0-9][A-Z]{2}$/i },
        { type: "1L+2N+1N+2L", regex: /^[A-Z][0-9]{2}[0-9][A-Z]{2}$/i },
        { type: "2L+2N+2L", regex: /^[A-Z]{2}[0-9]{2}[A-Z]{2}$/i },
        { type: "1L+1N+1L+1N+2L", regex: /^[A-Z][0-9][A-Z][0-9][A-Z]{2}$/i },
        { type: "1L+1N+2L", regex: /^[A-Z][0-9]{2}[A-Z]$/i }
    ];

    // Validate postcode
    let isValid = patterns.some(pattern => {
        if (pattern.regex.test(testPostcode)) {
            console.log(`✅ Matched Pattern: ${pattern.type}`);
            return true;
        }
        return false;
    });

    if (!isValid) {
        console.log("❌ INVALID: Does not match any UK postcode pattern.");
        alert("❌ Invalid Postcode Format!");
        return;
    }

    console.log("✅ Postcode Validator Successfully Processed!");
    alert("✅ Postcode Validator Successfully Processed!");
});




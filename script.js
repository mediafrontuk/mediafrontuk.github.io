document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Postcode Validator Starting...");
    
    let testPostcode = "AB12CD";
    console.log("📌 Test Postcode Before Processing:", testPostcode);
    
    // Space removal (Double escaping the backslash)
    testPostcode = testPostcode.replace(new RegExp("\\\\s", "g"), ""); 
    console.log("🔍 Postcode After Space Removal:", testPostcode);
    
    // Define digit pattern with double escaping
    const digitPattern = "\\\\d"; 
    
    // Updated regex patterns
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
        alert("❌ Invalid Postcode Format!");
        return;
    }

    console.log("✅ Postcode Validator Successfully Processed!");
    alert("✅ Postcode Validator Successfully Processed!");
});



document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Postcode Validator Starting...");
    
    let testPostcode = "AB12CD";
    console.log("📌 Test Postcode Before Processing:", testPostcode);
    
    // Remove spaces
    testPostcode = testPostcode.replace(/\s/g, ""); 
    console.log("🔍 Postcode After Space Removal:", testPostcode);
    
    // Predefined regex patterns (No BD stripping issues)
    const patterns = [
        { type: "2L+3N+2L", regex: /^[A-Z]{2}\d{3}[A-Z]{2}$/i },
        { type: "2L+1N+1L+1N+2L", regex: /^[A-Z]{2}\d[A-Z]\d[A-Z]{2}$/i },
        { type: "1L+2N+1N+2L", regex: /^[A-Z]\d{2}\d[A-Z]{2}$/i },
        { type: "2L+2N+2L", regex: /^[A-Z]{2}\d{2}[A-Z]{2}$/i },
        { type: "1L+1N+1L+1N+2L", regex: /^[A-Z]\d[A-Z]\d[A-Z]{2}$/i },
        { type: "1L+1N+2L", regex: /^[A-Z]\d{2}[A-Z]$/i }
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




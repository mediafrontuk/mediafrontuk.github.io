document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 Script Loaded: DOM fully loaded!");

    let honeypotField = document.querySelector('input[name="bd_hpc"]');
    
    if (honeypotField) {
        console.log("✅ Honeypot field found! Attempting to inject value...");
        honeypotField.value = "INVALID POSTCODE";
        console.log("🚀 Injection complete! Check the Elements tab to confirm.");
    } else {
        console.warn("⚠️ Honeypot field not found! Script may be running too early.");
    }
});

window.addEventListener("load", function () {
    let honeypotField = document.querySelector('input[name="bd_hpc"]');
    if (honeypotField) {
        honeypotField.value = "INVALID POSTCODE";
        console.log("🚀 Injected text into BD honeypot field.");
    } else {
        console.warn("⚠️ Honeypot field 'bd_hpc' not found.");
    }
});

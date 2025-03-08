document.addEventListener("DOMContentLoaded", function () {
    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (postcodeField) {
        console.log("✅ Postcode field found:", postcodeField);
    } else {
        console.warn("❌ Postcode field NOT found!");
    }

    if (honeypotField) {
        console.log("✅ Honeypot field found:", honeypotField);
    } else {
        console.warn("❌ Honeypot field NOT found!");
    }
});

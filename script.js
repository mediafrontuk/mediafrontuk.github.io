document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (form && honeypotField) {
        form.addEventListener("submit", function () {
            honeypotField.value = "INVALID POSTCODE";
            console.log("🚀 Injected 'INVALID POSTCODE' at submission.");
        });
    } else {
        console.warn("⚠️ Form or honeypot field not found.");
    }
});

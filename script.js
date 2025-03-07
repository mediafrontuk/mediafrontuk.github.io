document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");

    function checkFields() {
        let postcodeField = document.querySelector('input[name="postcode"]');
        let honeypotField = document.querySelector('input[name="bd_hpc"]');

        if (postcodeField && honeypotField) {
            console.log("✅ Postcode & honeypot fields found!");
            attachFormListener(form, postcodeField, honeypotField);
        } else {
            console.warn("⏳ Waiting for fields to load...");
            setTimeout(checkFields, 500); // Retry every 500ms until found
        }
    }

    function attachFormListener(form, postcodeField, honeypotField) {
        const validPrefixes = ["AB", "CD", "EF", "GH", "JK", "C", "E", "L", "S"];

        form.addEventListener("submit", function () {
            let postcode = postcodeField.value.toUpperCase().replace(/\s+/g, "");
            let prefix = postcode.substring(0, 2);
            if (!isNaN(prefix[1])) prefix = prefix[0];

            let postcodePattern = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[0-9][A-Z]{2}$/;
            let isValidPostcode = validPrefixes.includes(prefix) && postcodePattern.test(postcode);

            if (!isValidPostcode) {
                honeypotField.value = "INVALID POSTCODE"; // BD will filter it out
                console.warn("⚠️ Invalid postcode detected. Injecting honeypot trigger.");
            } else {
                honeypotField.value = "";
                console.log("✅ Valid postcode. No spam flag needed.");
            }
        });
    }

    if (form) {
        checkFields();
    } else {
        console.warn("⚠️ Form not found.");
    }
});

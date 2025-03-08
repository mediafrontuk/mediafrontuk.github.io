document.addEventListener("DOMContentLoaded", function () {
    let form = document.querySelector("form");
    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    const validPrefixes = ["AB", "CD", "EF", "GH", "JK", "C", "E", "L", "S"];

    if (form && postcodeField && honeypotField) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Stop form submission for debugging

            let postcode = postcodeField.value.toUpperCase().replace(/\s+/g, "");
            console.log("📌 Submitted Postcode:", postcode);

            let prefix = postcode.substring(0, 2);
            if (!isNaN(prefix[1])) prefix = prefix[0];

            let postcodePattern = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?[0-9][A-Z]{2}$/;
            let isValidPostcode = validPrefixes.includes(prefix) && postcodePattern.test(postcode);

            if (!isValidPostcode) {
                honeypotField.value = "INVALID POSTCODE";
                console.warn("⚠️ Invalid postcode detected!");
            } else {
                honeypotField.value = "";
                console.log("✅ Valid postcode.");
            }

            console.log("🕵️‍♂️ bd_hpc field value before submit:", honeypotField.value);
        });
    } else {
        console.warn("⚠️ Form, postcode, or honeypot field not found.");
    }
});

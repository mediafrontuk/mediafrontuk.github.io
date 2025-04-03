document.addEventListener("DOMContentLoaded", function () {
    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (postcodeField && honeypotField) {
        // Royal Mail regex from Worker
        const ukPostcodeRegex = /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKPSTUW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/i;

        function validatePostcode(postcode) {
            postcode = postcode.trim().toUpperCase(); // Keep your normalization
            return ukPostcodeRegex.test(postcode);
        }

        postcodeField.addEventListener("input", function () {
            let postcodeValue = postcodeField.value.trim();
            if (postcodeValue) {
                honeypotField.value = validatePostcode(postcodeValue) ? "" : "EMAIL_DELIVERY_SUCCESS!";
            } else {
                honeypotField.value = "EMAIL_DELIVERY_SUCCESS!";
            }
        });
    }
});

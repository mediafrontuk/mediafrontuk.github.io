document.addEventListener("DOMContentLoaded", function () {
    let postcodeField = document.querySelector('input[name="postcode"]');
    let honeypotField = document.querySelector('input[name="bd_hpc"]');

    if (postcodeField && honeypotField) {
        const validTwoLetters = ["AB", "AL", "BA", "BB", "BD", "BH", "BL", "BN", "BR", "BS", "BT", "CA", "CB", "CF", "CH", "CM", "CO", "CR", "CT", "CV", "CW", "DA", "DD", "DE", "DG", "DH", "DL", "DN", "DT", "DY", "EC", "EH", "EN", "EX", "FK", "FY", "GL", "GU", "HA", "HD", "HG", "HP", "HR", "HS", "HU", "HX", "IG", "IP", "IV", "KA", "KT", "KW", "KY", "LA", "LD", "LE", "LL", "LN", "LS", "LU", "ME", "MK", "ML", "NE", "NG", "NN", "NP", "NR", "NW", "OL", "OX", "PA", "PE", "PH", "PL", "PO", "PR", "RG", "RH", "RM", "SA", "SE", "SG", "SK", "SL", "SM", "SN", "SO", "SP", "SR", "SS", "ST", "SW", "SY", "TA", "TD", "TF", "TN", "TQ", "TR", "TS", "TW", "UB", "WA", "WC", "WD", "WF", "WN", "WR", "WS", "WV", "YO", "ZE"];
        const validSingleLetters = ["B", "E", "G", "L", "M", "N", "S", "W"];

        function validatePostcode(postcode) {
            postcode = postcode.replace(/\s/g, "").toUpperCase();
            const patterns = [
                /^([A-Z]{2})(\d{3})([A-Z]{2})$/,
                /^([A-Z]{2})(\d{1})([A-Z]{1})(\d{1})([A-Z]{2})$/,
                /^([A-Z]{1})(\d{2})(\d{1})([A-Z]{2})$/,
                /^([A-Z]{2})(\d{2})([A-Z]{2})$/,
                /^([A-Z]{1})(\d{1})([A-Z]{1})(\d{1})([A-Z]{2})$/,
                /^([A-Z]{1})(\d{1})([A-Z]{2})$/
            ];

            for (let pattern of patterns) {
                let match = postcode.match(pattern);
                if (match) {
                    let outcodeLetters = match[1];
                    if (outcodeLetters.length === 2 && validTwoLetters.includes(outcodeLetters)) {
                        return true;
                    } else if (outcodeLetters.length === 1 && validSingleLetters.includes(outcodeLetters)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Validate on input change
        postcodeField.addEventListener("input", function () {
            let postcodeValue = postcodeField.value.trim();
            if (postcodeValue) {
                honeypotField.value = validatePostcode(postcodeValue) ? "" : "INVALID POSTCODE";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let productTypeCheckbox = document.getElementById("productTypeCheckbox");
    let productTypeSelectRow = document.querySelector(".productTypeSelectRow");
    let additionalOptionsCheckbox = document.getElementById("additionalOptionsCheckbox");
    let additionalOptionsRadios = document.querySelector(".additionalOptionsRadios");
    let sortingDirectionRadios = document.getElementById("sortedRadio");

    const body = document.body;
    body.classList.add('dark-theme');

    productTypeCheckbox.addEventListener("change", function() {
        if (this.checked) {
            productTypeSelectRow.style.display = "block";
        } else {
            productTypeSelectRow.style.display = "none";
        }
    });

    additionalOptionsCheckbox.addEventListener("change", function() {
        if (this.checked) {
            additionalOptionsRadios.style.display = "block";
            if (isAdditionalSortingRadioSelected()) {
                sortingDirectionRadios.style.display = "block";
            }
        } else {
            additionalOptionsRadios.style.display = "none";
            sortingDirectionRadios.style.display = "none";
        }
    });
    let sortingRadios = document.querySelectorAll('input[name="additionalSortingRadio"]');

    sortingRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            if (additionalOptionsCheckbox.checked) {
                sortingDirectionRadios.style.display = "block";
            }
        });
    });

    function isAdditionalSortingRadioSelected() {
        let sortingRadios = document.querySelectorAll('input[name="additionalSortingRadio"]');
        for (let i = 0; i < sortingRadios.length; i++) {
            if (sortingRadios[i].checked) {
                return true;
            }
        }
        return false;
    }
});
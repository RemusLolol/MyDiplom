$(document).ready(function () {
    $('.textBoxType').change(function () {
        let selectedTamname = $(this).val();
        $.ajax({
            type: 'GET',
            url: '/calculator/getTamposhl',
            data: { tamname: selectedTamname },
            success: function (response) {
                $('#textBoxTamPoshlID').val(response);
            },
            error: function (error) {
                console.error('Error fetching tamposhl: ', error);
            }
        });
    });
});

// document.addEventListener("DOMContentLoaded", function() {

    const resultLabel = document.getElementById('result')
    const resultPerWeightLabel = document.getElementById('resultPerWeight')
    // const validationMessage = document.getElementById("validationMessage");
    const boxOutputData = document.querySelector(".boxOutputData");

    function calculate() {
        if (validationMessage !== null) {
            console.error("Элемент найден!");
        } else {
            console.error("Элемент не найден.");
        }
        let textBoxSSValue = document.querySelector('.textBoxSS').value;
        let textBoxWeightValue = document.querySelector('.textBoxWeight').value;
        let textBoxTamPoshlValue = document.querySelector('.textBoxTamPoshl').value;
        let textBoxTranspRashDoGraValue = document.querySelector('.textBoxTranspRashoDoGra').value;
        let textBoxTranspRashPosleGraValue = document.querySelector('.textBoxTranspRashoPosleGra').value;

        if (textBoxSSValue === '' || textBoxWeightValue === '' || textBoxTamPoshlValue === '' || textBoxTranspRashDoGraValue === '' || textBoxTranspRashPosleGraValue === '') {
            validationMessage.innerText = "Пожалуйста, заполните все поля";
            validationMessage.style.backgroundColor = "#FF0000";
            validationMessage.style.opacity = "1";
            setTimeout(function () {
                validationMessage.style.opacity = "0";
            }, 2000);
            return;
        }

        let formData = {
            textBoxSS: textBoxSSValue,
            textBoxWeight: textBoxWeightValue,
            textBoxTamPoshl: textBoxTamPoshlValue,
            transpRash: (parseFloat(textBoxTranspRashDoGraValue) + parseFloat(textBoxTranspRashPosleGraValue))
        };

        fetch('/calculator/submitForm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                let result = data.toFixed(2);
                let resultPerWeight = (data / textBoxWeightValue).toFixed(2);
                let resultNDS = (textBoxSSValue * 20 / 100).toFixed(2);
                let resultTamPoshl = (textBoxSSValue * textBoxTamPoshlValue / 100);

                resultLabel.innerText = result + " р.";
                resultPerWeightLabel.innerText = resultPerWeight + " р.";
                document.getElementById('resultNDS').innerText = resultNDS + " р.";
                document.getElementById('resultTamPoshl').innerText = resultTamPoshl + " р.";

                validationMessage.innerText = "Расчет произвелся успешно";
                validationMessage.style.backgroundColor = "#00FF00";
                validationMessage.style.opacity = "1";
                setTimeout(function () {
                    validationMessage.style.opacity = "0";
                }, 2000);

                boxOutputData.classList.add("visible");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    function toggleReadOnlyAndChangeImage() {
        let textBox = document.getElementById("textBoxTamPoshlID");
        textBox.readOnly = !textBox.readOnly;
        let button = document.querySelector(".buttonLockOffOn");
        let newImageSrc = textBox.readOnly ? 'Styles/LockOffOn/redLockOff.png' : 'Styles/LockOffOn/greenLockOn.png';
        button.style.backgroundImage = "url('" + newImageSrc + "')";
    }

    function saveData() {
        let selectedType = document.querySelector('.textBoxType').value;
        let textBoxTamPoshlValue = document.querySelector('.textBoxTamPoshl').value;
        let textBoxTranspRashDoGraValue = document.querySelector('.textBoxTranspRashoDoGra').value;
        let textBoxTranspRashPosleGraValue = document.querySelector('.textBoxTranspRashoPosleGra').value;
        let textBoxWeightValue = document.querySelector('.textBoxWeight').value;
        let resultValue = $('#result').text().replace(' р.', '');
        let resultPerWeightValue = $('#resultPerWeight').text().replace(' р.', '');

        let formData = {
            typetam: selectedType,
            tamposhl: textBoxTamPoshlValue,
            transprash: parseFloat(textBoxTranspRashDoGraValue) + parseFloat(textBoxTranspRashPosleGraValue),
            weightprod: textBoxWeightValue,
            itogss: resultValue,
            itogssperweight: resultPerWeightValue
        };

        fetch('/calculator/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Данные успешно сохранены на сервере:', data);
                validationMessage.innerText = "Данные сохранены успешно";
                validationMessage.style.backgroundColor = "#00FF00";
                validationMessage.style.opacity = "1";
                setTimeout(function () {
                    validationMessage.style.opacity = "0";
                }, 2000);
            })
            .catch(error => {
                console.error('Ошибка при сохранении данных:', error);
            });
    }
// });
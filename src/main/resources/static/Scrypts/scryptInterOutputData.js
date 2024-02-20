$(document).ready(function () {
    $('#floatingSelect').change(function () {
        let selectedTamname = $(this).val();
        $.ajax({
            type: 'GET',
            url: '/calculator/getTamposhl',
            data: { tamname: selectedTamname },
            success: function (response) {
                $('#inputTamPoshl').val(response);
           },
            error: function (error) {
                console.error('Error fetching tamposhl: ', error);
            }
        });
    });
});

const resultLabel = document.getElementById('resultSS')
const resultPerWeightLabel = document.getElementById('resultPerWeight')
const boxOutputData = document.querySelector(".boxOutputData");

function calculate() {
    if (validationMessage !== null) {
        console.error("Элемент найден!");
    } else {
        console.error("Элемент не найден.");
    }
    let ssValue = document.getElementById('inputSS').value;
    let weightValue = document.getElementById('inputWeight').value;
    let tamPoshlValue = document.getElementById('inputTamPoshl').value;
    let transpRashDoGraValue = document.getElementById('inputDoGra').value;
    let transpRashPosleGraValue = document.getElementById('inputPosleGra').value;

    if (ssValue === '' || weightValue === '' || tamPoshlValue === '' || transpRashDoGraValue === '' || transpRashPosleGraValue === '') {
        validationMessage.innerText = "Пожалуйста, заполните все поля";
        validationMessage.style.backgroundColor = "#FF0000";
        validationMessage.style.opacity = "1";
        setTimeout(function () {
            validationMessage.style.opacity = "0";
        }, 2000);
        return;
    }

    let formData = {
        textBoxSS: ssValue,
        textBoxWeight: weightValue,
        textBoxTamPoshl: tamPoshlValue,
        transpRash: (parseFloat(transpRashDoGraValue) + parseFloat(transpRashPosleGraValue))
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
            let resultPerWeight = (data / weightValue).toFixed(2);
            let resultNDS = (ssValue * 20 / 100).toFixed(2);
            let resultTamPoshl = (ssValue * tamPoshlValue / 100);

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
    let textBox = document.getElementById("inputTamPoshl");
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
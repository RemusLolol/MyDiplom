window.onload = function() {
    getTamPoshl()
    document.getElementById('floatingSelect').dispatchEvent(new Event('change'));
};

document.addEventListener('DOMContentLoaded', function() {
    getTamPoshl();
});

function getTamPoshl(){
    const floatingSelect = document.getElementById('floatingSelect');
    const inputTamPoshl = document.getElementById('inputTamPoshl');

    floatingSelect.addEventListener('change', function() {
        const selectedTamname = this.value;

        fetch(`/calculator/getTamposhl?tamname=${selectedTamname}`)
            .then(response => response.text())
            .then(data => {
                inputTamPoshl.value = data;
            })
            .catch(error => {
                console.error('Error fetching tamposhl: ', error);
            });
    });
}

function calculate() {
    let ssValue = document.getElementById('inputSS').value;
    let weightValue = document.getElementById('inputWeight').value;
    let tamPoshlValue = document.getElementById('inputTamPoshl').value;
    let transpRashDoGraValue = document.getElementById('inputDoGra').value;
    let transpRashPosleGraValue = document.getElementById('inputPosleGra').value;

    if (ssValue === '' || weightValue === '' || tamPoshlValue === '' || transpRashDoGraValue === '' || transpRashPosleGraValue === '') {
        let ssValue = document.getElementById('inputSS').value;
        let weightValue = document.getElementById('inputWeight').value;
        let tamPoshlValue = document.getElementById('inputTamPoshl').value;
        let transpRashDoGraValue = document.getElementById('inputDoGra').value;
        let transpRashPosleGraValue = document.getElementById('inputPosleGra').value;

        if (ssValue === '' || weightValue === '' || tamPoshlValue === '' || transpRashDoGraValue === '' || transpRashPosleGraValue === '') {
            let alert = `<div class="alert alert-danger" role="alert" style="padding: 10px; background-color: #ee2e2e; font-size:14px; font-weight: bold;"">
                        Пожалуйста, заполните все поля
                      </div>`;
            document.getElementById('alertContainer').innerHTML = alert;

            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 2000);
            return;
        }
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
            const resultLabel = document.getElementById('resultSS')
            const resultPerWeightLabel = document.getElementById('resultPerWeight')

            let result = data.toFixed(2);
            let resultPerWeight = (data / weightValue).toFixed(2);
            let resultNDS = (ssValue * 20 / 100).toFixed(2);
            let resultTamPoshl = (ssValue * tamPoshlValue / 100);

            resultLabel.innerText = result + " р.";
            resultPerWeightLabel.innerText = resultPerWeight + " р.";
            document.getElementById('resultNDS').innerText = resultNDS + " р.";
            document.getElementById('resultTamPoshl').innerText = resultTamPoshl + " р.";

            $('#modalItog').modal('show');

            let alert = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #28a745; color: #fff; font-size: 14px; font-weight: bold;">
                    Расчеты произведены успешно
                  </div>`;
            document.getElementById('alertContainer').innerHTML = alert;

            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 2000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
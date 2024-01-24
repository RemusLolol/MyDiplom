function saveData() {
    var selectedType = document.querySelector('.textBoxType').value;
    var textBoxTamPoshlValue = document.querySelector('.textBoxTamPoshl').value;
    var textBoxTranspRashDoGraValue = document.querySelector('.textBoxTranspRashoDoGra').value;
    var textBoxTranspRashPosleGraValue = document.querySelector('.textBoxTranspRashoPosleGra').value;
    var textBoxWeightValue = document.querySelector('.textBoxWeight').value;
    var resultValue = $('#result').text().replace(' р.', '');
    var resultPerWeightValue = $('#resultPerWeight').text().replace(' р.', '');

    var formData = {
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
            validationMessage.style.opacity = 1;
            setTimeout(function () {
                validationMessage.style.opacity = 0;
            }, 2000);
        })
        .catch(error => {
            console.error('Ошибка при сохранении данных:', error);
        });
}
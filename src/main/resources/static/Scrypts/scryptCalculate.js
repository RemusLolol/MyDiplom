var boxOutputData = document.querySelector(".boxOutputData");
var validationMessage = document.getElementById("validationMessage");

function toggleVisibility() {
    var textBoxSSValue = document.querySelector('.textBoxSS').value;
    var textBoxWeightValue = document.querySelector('.textBoxWeight').value;
    var textBoxTamPoshlValue = document.querySelector('.textBoxTamPoshl').value;
    var textBoxTranspRashDoGraValue = document.querySelector('.textBoxTranspRashoDoGra').value;
    var textBoxTranspRashPosleGraValue =  document.querySelector('.textBoxTranspRashoPosleGra').value;
    if (textBoxSSValue === '' || textBoxWeightValue === '' || textBoxTamPoshlValue === '' || textBoxTranspRashDoGraValue== '' || textBoxTranspRashPosleGraValue ==='') {
        validationMessage.innerText = "Пожалуйста, заполните все поля";
        validationMessage.style.backgroundColor = "#FF0000";
        validationMessage.style.opacity = 1;
        setTimeout(function () {
            validationMessage.style.opacity = 0;
        }, 2000);
        return;
    }
    console.log((textBoxTranspRashDoGraValue + textBoxTranspRashPosleGraValue));
    var formData = {
        textBoxSS: textBoxSSValue,
        textBoxWeight: textBoxWeightValue,
        textBoxTamPoshl: textBoxTamPoshlValue,
        transpRash: (parseFloat(textBoxTranspRashDoGraValue) + parseFloat(textBoxTranspRashPosleGraValue))
    };
    console.log(formData);
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
            console.log('Response from server:', data);
            var result = data.toFixed(2);
            document.getElementById('result').innerText = result + " р.";
            var resultPerWeight = (data / textBoxWeightValue).toFixed(2);
            document.getElementById('resultPerWeight').innerText = resultPerWeight + " р.";
            var resultNDS= (textBoxSSValue * 20 /100).toFixed(2);
            document.getElementById('resultNDS').innerText = resultNDS + " р.";
            var resultTamPoshl = (textBoxSSValue * textBoxTamPoshlValue /  100 );
            document.getElementById('resultTamPoshl').innerText = resultTamPoshl + " р."
            validationMessage.innerText = "Расчет произвелся успешно";
            validationMessage.style.backgroundColor = "#00FF00";
            validationMessage.style.opacity = 1;
            setTimeout(function () {
                validationMessage.style.opacity = 0;
            }, 2000);
            boxOutputData.classList.add("visible");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

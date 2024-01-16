var boxOutputData = document.querySelector(".boxOutputData");
var validationMessage = document.getElementById("validationMessage");

function toggleVisibility() {
    var textBoxSSValue = document.querySelector('.textBoxSS').value;
    var textBoxWeightValue = document.querySelector('.textBoxWeight').value;
    var textBoxTamPoshlValue = document.querySelector('.textBoxTamPoshl').value;
    var textBoxTranspRashValue = document.querySelector('.textBoxTranspRash').value;

    if (textBoxSSValue === '' || textBoxWeightValue === '' || textBoxTamPoshlValue === '' || textBoxTranspRashValue === '') {
        validationMessage.innerText = "Пожалуйста, заполните все поля";
        validationMessage.style.backgroundColor = "#FF0000";
        validationMessage.style.opacity = 1;
        setTimeout(function () {
            validationMessage.style.opacity = 0;
        }, 2000);
        return;
    }

    var formData = {
        textBoxSS: textBoxSSValue,
        textBoxWeight: textBoxWeightValue,
        textBoxTamPoshl: textBoxTamPoshlValue,
        textBoxTranspRash: textBoxTranspRashValue
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
            console.log('Response from server:', data);

            var isVisible = boxOutputData.classList.contains("visible");

            if (isVisible) {
                document.getElementById('result').innerText = data + " р.";
            } else {
                document.getElementById('result').innerText = data + " р.";

                validationMessage.innerText = "Расчет произвелся успешно";
                validationMessage.style.backgroundColor = "#00FF00";
                validationMessage.style.opacity = 1;
                setTimeout(function () {
                    validationMessage.style.opacity = 0;
                }, 2000);
                boxOutputData.classList.add("visible");

            }
        })

        .catch((error) => {
            console.error('Error:', error);
        });

}

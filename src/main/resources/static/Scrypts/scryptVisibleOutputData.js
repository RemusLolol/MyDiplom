document.addEventListener('DOMContentLoaded', function() {
    boxOutputData = document.querySelector(".boxOutputData");
    textBoxSS = document.querySelector('.textBoxSS');
    textBoxWeight = document.querySelector('.textBoxWeight');
    textBoxTamPoshl = document.querySelector('.textBoxTamPoshl');
    textBoxTranspRash = document.querySelector('.textBoxTranspRash');
});
function toggleVisibility() {
    // Получение данных формы
    var formData = {
        textBoxSS: textBoxSS.value,
        textBoxWeight: textBoxWeight.value,
        textBoxTamPoshl: textBoxTamPoshl.value,
        textBoxTranspRash: textBoxTranspRash.value
    };
    console.log('formData:', formData);

    boxOutputData.classList.toggle("visible");

    fetch('/calculator/submitForm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
    })
        .then(response => {
            // ваш текущий код обработки ответа
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
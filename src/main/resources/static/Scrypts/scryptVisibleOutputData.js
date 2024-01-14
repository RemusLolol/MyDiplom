document.addEventListener('DOMContentLoaded', function() {
    boxOutputData = document.querySelector(".boxOutputData");
    textBoxSS = document.querySelector('.textBoxSS');
    textBoxWeight = document.querySelector('.textBoxWeight');
    textBoxTamPoshl = document.querySelector('.textBoxTamPoshl');
    textBoxTranspRash = document.querySelector('.textBoxTranspRash');
});
function toggleVisibility() {
    var formData = {
        textBoxSS: textBoxSS.value,
        textBoxWeight: textBoxWeight.value,
        textBoxTamPoshl: textBoxTamPoshl.value,
        textBoxTranspRash: textBoxTranspRash.value
    };
    boxOutputData.classList.toggle("visible");

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

            if (data && data !== undefined) {
                document.getElementById('result').innerText = data + " р.";
            } else {
                console.error('Unexpected response format from server.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

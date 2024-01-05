function toggleReadOnlyAndChangeImage() {
    var textBox = document.getElementById("textBoxTamPoshlID");
    textBox.readOnly = !textBox.readOnly;

    var button = document.querySelector(".buttonLockOffOn");
    var newImageSrc = textBox.readOnly ? 'Styles/LockOffOn/redLockOff.png' : 'Styles/LockOffOn/greenLockOn.png';
    button.style.backgroundImage = "url('" + newImageSrc + "')";
}
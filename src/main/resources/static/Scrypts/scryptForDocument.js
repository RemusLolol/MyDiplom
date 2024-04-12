let rateForSelectedCurrency;
let date;
document.addEventListener('DOMContentLoaded', function () {
    (function getDataForApi() {
        const selectElement = document.getElementById('currencySelector');
        const ratesData = {};

        fetch('https://api.nbrb.by/exrates/rates?periodicity=0')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(currency => {
                    const optionElement = document.createElement('option');
                    optionElement.value = currency.Cur_Abbreviation;
                    optionElement.textContent = currency.Cur_Abbreviation;
                    selectElement.appendChild(optionElement);

                    rateForSelectedCurrency = currency.Cur_OfficialRate;
                    date = currency.Date;
                    ratesData[currency.Cur_Abbreviation] = currency.Cur_OfficialRate;
                });
            })
            .catch(error => console.error('Ошибка при получении данных:', error));

        selectElement.addEventListener('change', function () {
            const selectedCurrency = this.value;
            rateForSelectedCurrency = ratesData[selectedCurrency];

            var nac = rateForSelectedCurrency * parseFloat(document.getElementById("OsnForRasch11").value).toFixed(2);
            if (isNaN(nac)) {
                document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + formattedDate(date) + "): ";
            }
            else {
                document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + formattedDate(date) + "): " +
                    nac.toFixed(2);
            }
            document.getElementById('labelPerechb').innerText = "(б) Косвенные платежи (условия или обязательства) в НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: "
                + formattedDate(date) + ")";
        });
    })();
});

function fillMainCalc(){
    var nac = rateForSelectedCurrency * parseFloat(document.getElementById("OsnForRasch11").value).toFixed(2);
    if (isNaN(nac)) {
        document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + formattedDate(date) + "): ";
    }
    else {
        document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + formattedDate(date) + "): " +
            nac.toFixed(2);
    }
    document.getElementById('labelPerechb').innerText = "(б) Косвенные платежи (условия или обязательства) в НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: "
        + formattedDate(date) + ")";
    const OsnForRasch11Value = parseFloat(document.getElementById("OsnForRasch11").value);
    const OsnForRasch11bValue = parseFloat(document.getElementById("OsnForRasch11b").value);

    let result;
    if (isNaN(OsnForRasch11bValue)) {
        result = ((OsnForRasch11Value * rateForSelectedCurrency)).toFixed(2);
    } else {
        result = (OsnForRasch11Value * rateForSelectedCurrency + parseFloat(OsnForRasch11bValue.toFixed(2))).toFixed(2);
    }
    document.getElementById("itogOsn").innerText = "12) Итого по разделам \"а\" и \"б\" графы 11 в национальной валюте: " + result;
}

function fillDopCalc() {
    const Dop13Value = parseFloat(document.getElementById("Dop13").value) || 0;
    const Dop13bValue = parseFloat(document.getElementById("Dop13b").value) || 0;
    const Dop14Value = parseFloat(document.getElementById("Dop14").value) || 0;
    const Dop14aValue = parseFloat(document.getElementById("Dop14a").value) || 0;
    const Dop14bValue = parseFloat(document.getElementById("Dop14b").value) || 0;
    const Dop14vValue = parseFloat(document.getElementById("Dop14v").value) || 0;
    const Dop14gValue = parseFloat(document.getElementById("Dop14g").value) || 0;
    const Dop15Value = parseFloat(document.getElementById("Dop15").value) || 0;
    const Dop16Value = parseFloat(document.getElementById("Dop16").value) || 0;
    const Dop17Value = parseFloat(document.getElementById("Dop17").value) || 0;
    const Dop18Value = parseFloat(document.getElementById("Dop18").value) || 0;
    const Dop19Value = parseFloat(document.getElementById("Dop19").value) || 0;

    const total = Dop13Value + Dop13bValue + Dop14Value + Dop14aValue + Dop14bValue +
        Dop14vValue + Dop14gValue + Dop15Value + Dop16Value + Dop17Value + Dop18Value + Dop19Value;

    document.getElementById("itogoDop").innerText = "20) Итого по графам 13 - 19 в национальной валюте: " + total.toFixed(2);
}

function fillItogNacValues(){
    const Vch21 = parseFloat(document.getElementById("Vch21").value) || 0;
    const Vch22 = parseFloat(document.getElementById("Vch22").value) || 0;
    const Vch23 = parseFloat(document.getElementById("Vch23").value) || 0;

    const total = Vch21 + Vch22 + Vch23;

    document.getElementById("itogoVch").innerText = "24) Итого по графам 21 - 23 в национальной валюте: " + total.toFixed(2);
}

function rashetVivod() {

    if (!checkAndInitializeInputsOsn()) {
        return;
    }
    if (!checkAndInitializeInputsDop()) {
        return;
    }
    if (!checkAndInitializeInputsVch()) {
        return;
    }
    const itogOsnText = document.getElementById("itogOsn").innerText;
    const itogoDopText = document.getElementById("itogoDop").innerText;
    const itogoVchText = document.getElementById("itogoVch").innerText;

    const itogOsnValue = parseFloat(itogOsnText.split(":")[1].trim());
    const itogoDopValue = parseFloat(itogoDopText.split(":")[1].trim());
    const itogoVchValue = parseFloat(itogoVchText.split(":")[1].trim());

    if (isNaN(itogOsnValue) || isNaN(itogoDopValue) || isNaN(itogoVchValue)) {
        console.error("Ошибка: Один из итогов не является числом.");
        return;
    }

    const totalItog25 = itogOsnValue + itogoDopValue - itogoVchValue;
    const totalNac = itogOsnValue + itogoDopValue + itogoVchValue;

    document.getElementById("itog25").innerText = "25) Таможенная стоимость ввозимых товаров (12 + 20 - 24): " + totalItog25.toFixed(2);
    document.getElementById("itogNac").innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ: " + totalNac.toFixed(2);
    getUsdTotal(totalNac);
}

function checkAndInitializeInputsOsn() {
    const OsnForRasch11Value = parseFloat(document.getElementById("OsnForRasch11").value);
    const OsnForRasch11bValue = parseFloat(document.getElementById("OsnForRasch11b").value);

    if (isNaN(OsnForRasch11Value) || isNaN(OsnForRasch11bValue)) {
        console.error("Один из входных параметров не является числом Осн.");
        return false;
    }

    return true;
}

function checkAndInitializeInputsDop() {
    const Dop13Value = parseFloat(document.getElementById("Dop13").value);
    const Dop13bValue = parseFloat(document.getElementById("Dop13b").value);
    const Dop14Value = parseFloat(document.getElementById("Dop14").value);
    const Dop14aValue = parseFloat(document.getElementById("Dop14a").value);
    const Dop14bValue = parseFloat(document.getElementById("Dop14b").value);
    const Dop14vValue = parseFloat(document.getElementById("Dop14v").value);
    const Dop14gValue = parseFloat(document.getElementById("Dop14g").value);
    const Dop15Value = parseFloat(document.getElementById("Dop15").value);
    const Dop16Value = parseFloat(document.getElementById("Dop16").value);
    const Dop17Value = parseFloat(document.getElementById("Dop17").value);
    const Dop18Value = parseFloat(document.getElementById("Dop18").value);
    const Dop19Value = parseFloat(document.getElementById("Dop19").value);

    if (isNaN(Dop13Value) || isNaN(Dop13bValue) || isNaN(Dop14Value) ||
        isNaN(Dop14aValue) || isNaN(Dop14bValue) || isNaN(Dop14vValue) || isNaN(Dop14gValue) || isNaN(Dop15Value) ||
        isNaN(Dop16Value) || isNaN(Dop17Value) || isNaN(Dop18Value) || isNaN(Dop19Value)) {
        console.error("Один из входных параметров не является числом Доп.");
        return false;
    }

    return true;
}

function checkAndInitializeInputsVch() {
    const Vch21 = parseFloat(document.getElementById("Vch21").value);
    const Vch22 = parseFloat(document.getElementById("Vch22").value);
    const Vch23 = parseFloat(document.getElementById("Vch23").value);

    if (isNaN(Vch21) || isNaN(Vch22) || isNaN(Vch23)) {
        console.error("Один из входных параметров не является числом Выч.");
        return false;
    }

    return true;
}

function getUsdTotal(itogNac){
    fetch('https://api.nbrb.by/exrates/rates?periodicity=0')
        .then(response => response.json())
        .then(data => {
            data.forEach(currency => {
                if (currency.Cur_Abbreviation === 'USD') {
                    usdRate = currency.Cur_OfficialRate;
                    usdDate = currency.Date;
                    totalUSD = itogNac * parseFloat(usdRate);
                    document.getElementById("itogUSA").innerText = "В ДОЛЛАРАХ США (курс пересчета: "  + formattedDate(usdDate) + "): "  + totalUSD.toFixed(2);
                }
            });
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}

function download(blob, filename, mimetype) {
    const url = window.URL.createObjectURL(new Blob([blob], { type: mimetype }));
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

async function fillDTSDocument() {
    try {
        if (!checkAllAnswers()) {
            console.error('Не все вопросы были отмечены.');
            return;
        }
        const pdfBytes = await fetch("/DTS-1.pdf").then(response => response.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        // Редактирование первой страницы
        modifyFirstPage(pdfDoc);

        // Редактирование второй страницы
        modifySecondPage(pdfDoc);

        // Сохранение заполненного PDF
        const modifiedPdfBytes = await pdfDoc.save();
        downloadPDF(modifiedPdfBytes);
    } catch (error) {
        console.error('Ошибка при заполнении документа:', error);
    }
}

function checkAllAnswers() {
    const questions = document.querySelectorAll('.question');
    let answered = false;
    for (let i = 0; i < questions.length; i++) {
        const radios = questions[i].querySelectorAll('input[type="radio"]');
        for (let j = 0; j < radios.length; j++) {
            if (radios[j].checked === true) {
                answered = true;
                break;
            }
            else{
                answered = false;
            }
        }
        if (answered === false) {
            return false;
        }
    }
    return true;
}

function modifyFirstPage(pdfDoc) {
    const firstPage = pdfDoc.getPages()[0];
    const text = 'X';
    const fontSize = 12;
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach(radio => {
        const value = radio.value;
        switch (value) {
            case 'Да':
                if (radio.name === 'optionalRadios1') {
                    firstPage.drawText(text, { x: 470, y: 540, size: fontSize });
                } else if (radio.name === 'optionalRadios2') {
                    firstPage.drawText(text, {x: 470, y: 515, size: fontSize });
                } else if (radio.name === 'optionalRadios3') {
                    firstPage.drawText(text, { x: 470, y: 455, size: fontSize});
                } else if(radio.name === 'optionalRadios4') {
                    firstPage.drawText(text, { x: 470, y: 395, size: fontSize});
                } else if(radio.name === 'optionalRadios5') {
                    firstPage.drawText(text, { x: 470, y: 360, size: fontSize});
                } else if(radio.name === 'optionalRadios6'){
                    firstPage.drawText(text, {x:470, y: 270, size: fontSize});
                } else if(radio.name === 'optionalRadios7'){
                    firstPage.drawText(text, {x:470, y: 235, size: fontSize});
                }
                break;
            case 'Нет':
                if (radio.name === 'optionalRadios1') {
                    firstPage.drawText(text, {x: 510, y: 540, size: fontSize});
                } else if (radio.name === 'optionalRadios2') {
                    firstPage.drawText(text, {x:510, y:515, size:fontSize});
                } else if (radio.name === 'optionalRadios3') {
                    firstPage.drawText(text, {x:510, y: 455, size: fontSize});
                } else if(radio.name === 'optionalRadios4') {
                    firstPage.drawText(text, {x:510, y: 395, size: fontSize});
                } else if(radio.name === 'optionalRadios5') {
                    firstPage.drawText(text, {x:510, y: 360, size: fontSize});
                } else if(radio.name === 'optionalRadios6'){
                    firstPage.drawText(text, {x:510, y: 270, size: fontSize});
                } else if(radio.name === 'optionalRadios7'){
                    firstPage.drawText(text, {x:510, y: 235, size: fontSize});
                }
                break;
            default:
                break;
        }
    });
}

function formattedDate(date){
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    const formatted = `${day}.${month}.${year}`;
    return formatted;
}

function modifySecondPage(pdfDoc) {
    const secondPage = pdfDoc.getPages()[1];
    const fontSizeRasch = 10;

    //fillOsnRasch(secondPage, fontSizeRasch, formattedDate(date));
    fillDopRasch(secondPage, fontSizeRasch);
}

function extractNumberFromString(str) {
    const parts = str.split(':');
    if (parts.length < 2) {
        return null;
    }
    const secondPart = parts.pop().trim();
    const regex = /[-+]?\d*\.?\d+/;
    const match = secondPart.match(regex);
    if (match) {
        return match[0];
    } else {
        return null;
    }
}

function fillOsnRasch(secondPage, fontSizeRasch, formattedDate){
    secondPage.drawText(document.getElementById('currencySelector').value, {x: 225, y: 745, size: fontSizeRasch});
    secondPage.drawText(document.getElementById("OsnForRasch11").value, {x: 350, y: 745, size: fontSizeRasch});
    secondPage.drawText(formattedDate, {x: 200, y: 725, size: fontSizeRasch});
    secondPage.drawText(extractNumberFromString(document.getElementById('labelPeresch').textContent).toString(), {x:350, y:725, size: fontSizeRasch});
    secondPage.drawText(formattedDate, {x:200, y: 695, size: fontSizeRasch});
    secondPage.drawText(document.getElementById("OsnForRasch11b").value, {x:350, y: 695, size: fontSizeRasch});
    secondPage.drawText(extractNumberFromString(document.getElementById("itogOsn").textContent), {x:350, y: 682, size:fontSizeRasch});
}

function fillDopRasch(secondPage, fontSizeRasch){
    // secondPage.drawText(textRasch, {x:350, y:655, size:fontSizeRasch});//Сумма для 13 пункта
    // secondPage.drawText(textRasch, {x:350, y:643, size:fontSizeRasch});//Сумма для 14 пункта
    // secondPage.drawText(textRasch, {x:350, y:550, size:fontSizeRasch});//Сумма для 13 пункта
    // secondPage.drawText(textRasch, {x:350, y:522, size:fontSizeRasch});//Сумма для 14 пункта
    // secondPage.drawText(textRasch, {x:350, y:505, size:fontSizeRasch});//Сумма для 13 пункта
    // secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 15 пункта
    // secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 16 пункта
    // secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 17 пункта
    // secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 18 пункта
    // secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 19 пункта
    // secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Итог
}

function downloadPDF(pdfBytes) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    download(blob, 'dts-1(заполненный).pdf', 'application/pdf');
}

function openCalculator() {
    window.open('/calculator', '_blank');
}


function toggleSurvey() {
    var surveyForm = document.getElementById("surveyContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleMainCalc(){
    var surveyForm = document.getElementById("mainCalcContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleDopCalc(){
    var surveyForm = document.getElementById("dobCalcContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleItog(){
    var surveyForm = document.getElementById("itogContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleItogNacValue(){
    var surveyForm = document.getElementById("itogNacValue");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function slideDown(element) {
    var height = 0;
    var maxHeight = element.scrollHeight;
    var duration = 500;
    var interval = 10;

    var timer = setInterval(function () {
        height += (maxHeight / (duration / interval));
        if (height >= maxHeight) {
            clearInterval(timer);
            element.style.height = "auto";
        } else {
            element.style.height = height + "px";
        }
    }, interval);
}

function slideUp(element) {
    var height = element.scrollHeight;
    var duration = 500;
    var interval = 10;

    var timer = setInterval(function () {
        height -= (element.scrollHeight / (duration / interval));
        if (height <= 0) {
            clearInterval(timer);
            element.style.height = "0px";
            element.style.overflow = "hidden";
        } else {
            element.style.height = height + "px";
        }
    }, interval);
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var burger = document.querySelector('.burger');
    sidebar.classList.toggle('open');
    burger.classList.toggle('open');
}
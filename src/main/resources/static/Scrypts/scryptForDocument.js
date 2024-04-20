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
            fillNac();
        });
    })();
});

function fillNac(){
    let nac = rateForSelectedCurrency * parseFloat(document.getElementById("OsnForRasch11").value).toFixed(2);
    if (isNaN(nac)) {
        document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + formattedDate(date) + "): ";
    }
    else {
        document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + formattedDate(date) + "): " +
            nac.toFixed(2);
    }
    document.getElementById('labelPerechb').innerText = "(б) Косвенные платежи (условия или обязательства) в НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: "
        + formattedDate(date) + ")";
}

function fillMainCalc(){
    fillNac();
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
    const Dop14aValue = parseFloat(document.getElementById("Dop14a").value) || 0;
    const Dop14bValue = parseFloat(document.getElementById("Dop14b").value) || 0;
    const Dop14vValue = parseFloat(document.getElementById("Dop14v").value) || 0;
    const Dop14gValue = parseFloat(document.getElementById("Dop14g").value) || 0;
    const Dop15Value = parseFloat(document.getElementById("Dop15").value) || 0;
    const Dop16Value = parseFloat(document.getElementById("Dop16").value) || 0;
    const Dop17Value = parseFloat(document.getElementById("Dop17").value) || 0;
    const Dop18Value = parseFloat(document.getElementById("Dop18").value) || 0;
    const Dop19Value = parseFloat(document.getElementById("Dop19").value) || 0;

    const total = Dop13Value + Dop13bValue + Dop14aValue + Dop14bValue +
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

    const totalNac = itogOsnValue + itogoDopValue - itogoVchValue;

    document.getElementById("itogNac").innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ: " + totalNac.toFixed(2);
    getUsdTotal(totalNac);
    showModalAndAlertAccept('Итог посчитан');
}

async function fillDTSDocument() {
    if (!checkAllAnswers()) {
        showModalAndAlertError('Ответьте на все вопросы в пункте: Блок Вопросов Да/Нет.');
        return;
    } else if(!checkAndInitializeInputsOsn()){
        showModalAndAlertError('Введите все данные в пункте: ОСНОВА ДЛЯ РАСЧЕТА')
        return;
    } else if(!checkAndInitializeInputsDop()){
        showModalAndAlertError('Введите все данные в пункте: ДОПОЛНИТЕЛЬНЫЕ НАЧИСЛЕНИЯ')
        return;
    } else if(!checkAndInitializeInputsVch()){
        showModalAndAlertError('Введите все данные в пункте: ВЫЧЕТЫ в национальной валюте')
        return;
    } else if(!checkAndLogContainsNumber()){
        showModalAndAlertError('Не заполнен пункт: ИТОГИ')
        return;
    }
    try {
        const pdfBytes = await fetch("/DTS-1.pdf").then(response => response.arrayBuffer());
        const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

        modifyFirstPage(pdfDoc);
        modifySecondPage(pdfDoc);

        const modifiedPdfBytes = await pdfDoc.save();
        downloadPDF(modifiedPdfBytes);
        showModalAndAlertAccept("ДТС заполнен.")
    } catch (error) {
        console.error('Ошибка при заполнении документа:', error);
    }
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

function modifySecondPage(pdfDoc) {
    const secondPage = pdfDoc.getPages()[1];
    const fontSizeRasch = 10;

    fillOsnRasch(secondPage, fontSizeRasch, formattedDate(date));
    fillDopRasch(secondPage, fontSizeRasch);
    fillVchNacValue(secondPage, fontSizeRasch);
    fillItogs(secondPage, fontSizeRasch);
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
    const itogoDopText = document.getElementById("itogoDop").innerText;
    const itogoDopValue = parseFloat(itogoDopText.split(":")[1].trim());

    secondPage.drawText(document.getElementById("Dop13").value, {x:350, y:655, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop13b").value, {x:350, y:643, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop14a").value, {x:350, y:550, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop14b").value, {x:350, y:522, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop14v").value, {x:350, y:505, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop14g").value, {x:350, y:460, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop15").value, {x:350, y:430, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop16").value, {x:350, y:390, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop17").value, {x:350, y:365, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop18").value, {x:350, y:325, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Dop19").value, {x:350, y:308, size:fontSizeRasch});
    secondPage.drawText(itogoDopValue.toString(), {x:350, y:295, size:fontSizeRasch});
}

function fillVchNacValue(secondPage, fontSizeRasch){
    const itogoVchText = document.getElementById("itogoVch").innerText;
    const itogoVchValue = parseFloat(itogoVchText.split(":")[1].trim());

    secondPage.drawText(document.getElementById("Vch21").value, {x:350, y:260, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Vch22").value, {x:350, y:230, size:fontSizeRasch});
    secondPage.drawText(document.getElementById("Vch23").value, {x:350, y:205, size:fontSizeRasch});
    secondPage.drawText(itogoVchValue.toString(), {x:350, y:190, size:fontSizeRasch});
}

function fillItogs(secondPage, fontSizeRasch){
    const itogNac = document.getElementById("itogNac").textContent;
    const itogUSD = document.getElementById("itogUSA").textContent;
    const matchDate = itogUSD.match(/\(курс пересчета:\s*(\d{2}\.\d{2}\.\d{4})\)/);

    const itogNacValue = parseFloat(itogNac.match(/:\s*([0-9.]+)/)[1]);
    const itogUSDValue = parseFloat(itogUSD.match(/:\s*([0-9.]+)/)[1]);

    secondPage.drawText(itogNacValue.toString(), {x:350, y:170, size:fontSizeRasch});
    secondPage.drawText(itogUSDValue.toString(), {x:350, y:160, size:fontSizeRasch});
    secondPage.drawText(matchDate[1].toString(), {x:200, y:160, size:fontSizeRasch})
}

function downloadPDF(pdfBytes) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    download(blob, 'dts-1(заполненный).pdf', 'application/pdf');
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

function checkAndInitializeInputsOsn() {
    const OsnForRasch11Value = parseFloat(document.getElementById("OsnForRasch11").value);
    const OsnForRasch11bValue = parseFloat(document.getElementById("OsnForRasch11b").value);

    if (isNaN(OsnForRasch11Value) || isNaN(OsnForRasch11bValue)) {
        showModalAndAlertError("Один из входных параметров не является числом Осн.");
        return false;
    }

    return true;
}

function checkAndInitializeInputsDop() {
    const Dop13Value = parseFloat(document.getElementById("Dop13").value);
    const Dop13bValue = parseFloat(document.getElementById("Dop13b").value);
    const Dop14aValue = parseFloat(document.getElementById("Dop14a").value);
    const Dop14bValue = parseFloat(document.getElementById("Dop14b").value);
    const Dop14vValue = parseFloat(document.getElementById("Dop14v").value);
    const Dop14gValue = parseFloat(document.getElementById("Dop14g").value);
    const Dop15Value = parseFloat(document.getElementById("Dop15").value);
    const Dop16Value = parseFloat(document.getElementById("Dop16").value);
    const Dop17Value = parseFloat(document.getElementById("Dop17").value);
    const Dop18Value = parseFloat(document.getElementById("Dop18").value);
    const Dop19Value = parseFloat(document.getElementById("Dop19").value);

    if (isNaN(Dop13Value) || isNaN(Dop13bValue) || isNaN(Dop14aValue) ||
        isNaN(Dop14bValue) || isNaN(Dop14vValue) || isNaN(Dop14gValue) || isNaN(Dop15Value) ||
        isNaN(Dop16Value) || isNaN(Dop17Value) || isNaN(Dop18Value) || isNaN(Dop19Value)) {
        showModalAndAlertError("Один из входных параметров не является числом Доп.");
        return false;
    }

    return true;
}

function checkAndInitializeInputsVch() {
    const Vch21 = parseFloat(document.getElementById("Vch21").value);
    const Vch22 = parseFloat(document.getElementById("Vch22").value);
    const Vch23 = parseFloat(document.getElementById("Vch23").value);

    if (isNaN(Vch21) || isNaN(Vch22) || isNaN(Vch23)) {
        showModalAndAlertError("Один из входных параметров не является числом Выч.");
        return false;
    }

    return true;
}

function checkAndLogContainsNumber() {
    const itogNac = document.getElementById("itogNac").textContent;
    const itogUSD = document.getElementById("itogUSA").textContent;

    const regex = /\d+/;

    const containsNumber1 = regex.test(itogNac);
    const containsNumber2 = regex.test(itogUSD);

    return containsNumber1 || containsNumber2;
}

function formattedDate(date){
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}.${month}.${year}`;
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

function getUsdTotal(itogNac){
    fetch('https://api.nbrb.by/exrates/rates?periodicity=0')
        .then(response => response.json())
        .then(data => {
            data.forEach(currency => {
                if (currency.Cur_Abbreviation === 'USD') {
                    document.getElementById("itogUSA").innerText = "В ДОЛЛАРАХ США (курс пересчета: "  + formattedDate(currency.Date) + "): "  + itogNac * parseFloat(currency.Cur_OfficialRate).toFixed(2);
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

function toggleSurvey() {
    let surveyForm = document.getElementById("surveyContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleMainCalc(){
    let surveyForm = document.getElementById("mainCalcContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleDopCalc(){
    let surveyForm = document.getElementById("dobCalcContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleItog(){
    let surveyForm = document.getElementById("itogContainer");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function toggleItogNacValue(){
    let surveyForm = document.getElementById("itogNacValue");
    if (surveyForm.style.height === "0px") {
        slideDown(surveyForm);
    } else {
        slideUp(surveyForm);
    }
}

function slideDown(element) {
    let height = 0;
    let maxHeight = element.scrollHeight;
    let duration = 500;
    let interval = 10;

    let timer = setInterval(function () {
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
    let height = element.scrollHeight;
    let duration = 500;
    let interval = 10;

    let timer = setInterval(function () {
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
    let sidebar = document.getElementById('sidebar');
    let burger = document.querySelector('.burger');
    sidebar.classList.toggle('open');
    burger.classList.toggle('open');
}

function showModalAndAlertAccept(textAlert) {
    document.getElementById('alertContainer').innerHTML = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #28a745; color: #fff;
                font-size: 14px; font-weight: bold;">
                    ${textAlert}
                </div>`;
    setTimeout(function() {
        document.getElementById('alertContainer').innerHTML = '';
    }, 2000);
}

function showModalAndAlertError(textAlert) {
    document.getElementById('alertContainer').innerHTML = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #b02e2e; color: #fff;
                font-size: 14px; font-weight: bold;">
                    ${textAlert}
                </div>`;
    setTimeout(function() {
        document.getElementById('alertContainer').innerHTML = '';
    }, 2000);
}
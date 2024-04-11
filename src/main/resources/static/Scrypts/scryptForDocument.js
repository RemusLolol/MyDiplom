var rateForSelectedCurrency;
var validationMesDoc = document.getElementById("validationMesDoc");
(function getDataForApi() {
    const selectElement = document.getElementById('currencySelector');
    const ratesData = {};
    var date;

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
                console.log(currency.Cur_Abbreviation);
                console.log(currency.Cur_OfficialRate);
            });
        })
        .catch(error => console.error('Ошибка при получении данных:', error));

    selectElement.addEventListener('change', function () {
        const selectedCurrency = this.value;
        rateForSelectedCurrency = ratesData[selectedCurrency];

        var nac = rateForSelectedCurrency * parseFloat(document.getElementById("OsnForRasch11").value).toFixed(2);
        document.getElementById('labelPeresch').innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + date + "): " + nac.toFixed(2);
        document.getElementById('labelPerechb').innerText = "(б) Косвенные платежи (условия или обязательства) в НАЦИОНАЛЬНОЙ ВАЛЮТЕ (курс пересчета: " + date + ")";

        if (rateForSelectedCurrency !== undefined) {
            console.log(`Курс ${selectedCurrency} к белорусскому рублю: ${rateForSelectedCurrency}`);
        } else {
            console.log(`Курс для ${selectedCurrency} не найден.`);
        }
    });
})();

function rashetVivod() {
    //Расчет Основы для Расчета
    const OsnForRasch11Value = parseFloat(document.getElementById("OsnForRasch11").value) || 0;
    const OsnForRasch11bValue = parseFloat(document.getElementById("OsnForRasch11b").value) || 0;
    if(OsnForRasch11Value === 0 || OsnForRasch11bValue === 0){
        validationMesDoc.innerText = "Пожалуйста, заполните все поля в пункте Основные расчеты";
        validationMesDoc.style.backgroundColor = "#FF0000";
        validationMesDoc.style.opacity = 1;
        setTimeout(function () {
            validationMesDoc.style.opacity = 0;
        }, 2000);
        return;
    }
    const result = ((OsnForRasch11Value * rateForSelectedCurrency) + OsnForRasch11bValue).toFixed(2);
    document.getElementById("itogOsn").innerText = "12) Итого по разделам \"а\" и \"б\" графы 11 в национальной валюте: " + result;

    //Расчет для Дополнительного начисления
    const values = [
        parseFloat(document.getElementById("Dop13").value) || 0,
        parseFloat(document.getElementById("Dop13b").value) || 0,
        parseFloat(document.getElementById("Dop14").value) || 0,
        parseFloat(document.getElementById("Dop14a").value) || 0,
        parseFloat(document.getElementById("Dop14b").value) || 0,
        parseFloat(document.getElementById("Dop14v").value) || 0,
        parseFloat(document.getElementById("Dop14g").value) || 0,
        parseFloat(document.getElementById("Dop15").value) || 0,
        parseFloat(document.getElementById("Dop16").value) || 0,
        parseFloat(document.getElementById("Dop17").value) || 0,
        parseFloat(document.getElementById("Dop18").value) || 0,
        parseFloat(document.getElementById("Dop19").value) || 0
    ];
    let hasEmptyValue = false;

    for (let i = 0; i < values.length; i++) {
        if (isNaN(values[i]) || values[i] === 0) {
            hasEmptyValue = true;
            break;
        }
    }
    if (hasEmptyValue) {
        validationMesDoc.innerText = "Пожалуйста, заполните все поля в пункте Дополнительные начисления";
        validationMesDoc.style.backgroundColor = "#FF0000";
        validationMesDoc.style.opacity = 1;
        setTimeout(function () {
            validationMesDoc.style.opacity = 0;
        }, 2000);
        return;
    }
    const totalDop = values.reduce((acc, currentValue) => acc + currentValue, 0);
    document.getElementById("itogoDop").innerText = "20) Итого по графам 13 - 19 в национальной валюте: " + totalDop.toFixed(2);

    hasEmptyValue = false;
    for (let i = 0; i < values.length; i++) {
        if (isNaN(values[i]) || values[i] === 0) {
            hasEmptyValue = true;
            break;
        }
    }
    if (hasEmptyValue) {
        validationMesDoc.innerText = "Пожалуйста, заполните все поля в пункте Вычеты в национальной валюте";
        validationMesDoc.style.backgroundColor = "#FF0000";
        validationMesDoc.style.opacity = 1;
        setTimeout(function () {
            validationMesDoc.style.opacity = 0;
        }, 2000);
        return;
    }

    //Расчет Вычетов в национальной валюте
    const valuesVch = [
        parseFloat(document.getElementById("Vch21").value) || 0,
        parseFloat(document.getElementById("Vch22").value) || 0,
        parseFloat(document.getElementById("Vch23").value) || 0
    ];

    const totalVch = valuesVch.reduce((acc, currentValue) => acc + currentValue, 0);
    document.getElementById("itogoVch").innerText = "24) Итого по графам 21 - 23 в национальной валюте: " + totalVch.toFixed(2);

    //Финальные итоги
    const totalItog25 = parseFloat(result) + parseFloat(totalDop) - parseFloat(totalVch);
    document.getElementById("itog25").innerText = "25) Таможенная стоимость ввозимых товаров (12 + 20 - 24): " + totalItog25.toFixed(2);
    document.getElementById("itogNac").innerText = "В НАЦИОНАЛЬНОЙ ВАЛЮТЕ: " + totalItog25.toFixed(2);

    fetch('https://api.nbrb.by/exrates/rates?periodicity=0')
        .then(response => response.json())
        .then(data => {
            console.log('Все данные:', data);

            data.forEach(currency => {
                if (currency.Cur_Abbreviation === 'USD') {
                    usdRate = currency.Cur_OfficialRate;
                    usdDate = currency.Date;

                    totalUSD = totalItog25 * parseFloat(usdRate);
                    document.getElementById("itogUSA").innerText = "В ДОЛЛАРАХ США (курс пересчета: "  + usdDate + "): "  + totalUSD.toFixed(2);

                    validationMesDoc.innerText = "Расчет произвелся успешно";
                    validationMesDoc.style.backgroundColor = "#00FF00";
                    validationMesDoc.style.opacity = 1;
                    setTimeout(function () {
                        validationMesDoc.style.opacity = 0;
                    }, 2000);
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
        const osnForRasch11Value = parseFloat(document.getElementById("OsnForRasch11").value);
        const osnForRasch11bValue = parseFloat(document.getElementById("OsnForRasch11b").value);
        const osnForRasch12 = parseFloat(document.getElementById("itogOsn").values);

        const dopForRasch13 = parseFloat(document.getElementById("Dop13b").value);
        const dopForRasch14 = parseFloat(document.getElementById("Dop14").value);
        const dopForRasch14a = parseFloat(document.getElementById("Dop14a").value);
        const dopForRasch14b = parseFloat(document.getElementById("Dop14b").value);
        const dopForRasch14v = parseFloat(document.getElementById("Dop14v").value);
        const dopForRasch14g = parseFloat(document.getElementById("Dop14g").value);
        const dopForRasch15 = parseFloat(document.getElementById("Dop15").value);
        const dopForRasch16 = parseFloat(document.getElementById("Dop16").value);
        const dopForRasch17 = parseFloat(document.getElementById("Dop17").value);
        const dopForRasch18 = parseFloat(document.getElementById("Dop18").value);
        const dopForRasch19 = parseFloat(document.getElementById("Dop19").value);
        const itogDop = parseFloat(document.getElementById("itogoDop").value);

        const vch21 = parseFloat(document.getElementById("Vch21").value);
        const vch22 = parseFloat(document.getElementById("Vch22").value);
        const vch23 = parseFloat(document.getElementById("Vch23").value);
        const itogVch = parseFloat(document.getElementById("itogoVch").value);

        const totalItog = parseFloat(document.getElementById(("itog25")).value);
        const totalItogNac = parseFloat(document.getElementById(("itogNac")).value);

        //validateInputValues(osnForRasch11Value, osnForRasch11bValue, osnForRasch12, dopForRasch13, dopForRasch14, dopForRasch14a, dopForRasch14b, dopForRasch14v, dopForRasch14g, dopForRasch15, dopForRasch16, dopForRasch17, dopForRasch18, dopForRasch19, itogDop, vch21, vch22, vch23, itogVch, totalItog, totalItogNac);

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

function validateInputValues(...values) {
    const hasNullValues = values.some(value => value === null || isNaN(value));
    if (hasNullValues) {
        throw new Error('Пожалуйста, заполните все поля перед заполнением документа.');
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
    const textRasch = "000.00";
    const textVal = "USD";
    const textData = "01.01.1999";

    secondPage.drawText(textVal, {x:225, y: 745, size: fontSizeRasch}); //Валюта для первого пункта
    secondPage.drawText(textRasch, {x:350, y: 745, size: fontSizeRasch}); //сумма для первого пункта
    secondPage.drawText(textData, {x:200, y: 725, size: fontSizeRasch}); //Дата для второго пункта
    secondPage.drawText(textRasch, {x:350, y:725, size: fontSizeRasch}); // сумма для второго пункта
    secondPage.drawText(textData, {x:200, y: 695, size: fontSizeRasch}); //Дата для третьего пункта
    secondPage.drawText(textRasch, {x:350, y: 695, size: fontSizeRasch}); //Сумма для третьего пункта
    secondPage.drawText(textRasch, {x:350, y: 682, size:fontSizeRasch}); //Итог


    secondPage.drawText(textRasch, {x:350, y:655, size:fontSizeRasch});//Сумма для 13 пункта
    secondPage.drawText(textRasch, {x:350, y:643, size:fontSizeRasch});//Сумма для 14 пункта
    secondPage.drawText(textRasch, {x:350, y:550, size:fontSizeRasch});//Сумма для 13 пункта
    secondPage.drawText(textRasch, {x:350, y:522, size:fontSizeRasch});//Сумма для 14 пункта
    secondPage.drawText(textRasch, {x:350, y:505, size:fontSizeRasch});//Сумма для 13 пункта
    secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 15 пункта
    secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 16 пункта
    secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 17 пункта
    secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 18 пункта
    secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Сумма для 19 пункта
    secondPage.drawText(textRasch, {x:350, y:455, size:fontSizeRasch});//Итог
}

function downloadPDF(pdfBytes) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    download(blob, 'dts-1(заполненный).pdf', 'application/pdf');
}

function openCalculator() {
    window.open('/calculator', '_blank');
}
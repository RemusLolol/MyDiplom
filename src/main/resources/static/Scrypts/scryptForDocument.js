var rateForSelectedCurrency;
var date;
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
                // var nac =currency.Cur_OfficialRate *  parseFloat(document.getElementById("OsnForRasch11").value);
                // console.log(parseFloat(document.getElementById("OsnForRasch11").value));

                ratesData[currency.Cur_Abbreviation] = currency.Cur_OfficialRate;
            });
        })
        .catch(error => console.error('Ошибка при получении данных:', error));

    selectElement.addEventListener('change', function () {
        const selectedCurrency = this.value;
        rateForSelectedCurrency = ratesData[selectedCurrency];
        console.log(date);

        var nac = rateForSelectedCurrency * parseFloat(document.getElementById("OsnForRasch11").value).toFixed(2);
        console.log(nac);
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
    console.log(rateForSelectedCurrency);
    console.log(OsnForRasch11bValue);
    console.log(OsnForRasch11Value);
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
    const totalDop = values.reduce((acc, currentValue) => acc + currentValue, 0);
    document.getElementById("itogoDop").innerText = "20) Итого по графам 13 - 19 в национальной валюте: " + totalDop.toFixed(2);

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
5
                if (currency.Cur_Abbreviation === 'USD') {
                    usdRate = currency.Cur_OfficialRate;
                    usdDate = currency.Date;

                    totalUSD = totalItog25 * parseFloat(usdRate);
                    document.getElementById("itogUSA").innerText = "В ДОЛЛАРАХ США (курс пересчета: "  + usdDate + "): "  + totalUSD.toFixed(2);
                }
            });

            console.log('Курс USD:', usdRate);
            console.log('Дата USD:', usdDate);
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
}
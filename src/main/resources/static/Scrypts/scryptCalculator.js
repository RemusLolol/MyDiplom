document.addEventListener('DOMContentLoaded', function() {
    getTamPoshl()
    document.getElementById('floatingSelect').dispatchEvent(new Event('change'));

    document.getElementById('inputTamPoshl').addEventListener('blur', function() {
        addPercent('inputTamPoshl');
    });

    document.getElementById('inputSS').addEventListener('blur', function() {
        addRubles('inputSS');
    });

    document.getElementById('inputWeight').addEventListener('blur', function() {
        addKg('inputWeight');
    });

    document.getElementById('inputDoGra').addEventListener('blur', function() {
        addRubles('inputDoGra');
    });

    document.getElementById('inputPosleGra').addEventListener('blur', function() {
        addRubles('inputPosleGra');
    });
    document.getElementById('inputTamPoshl').addEventListener('focus', function() {
        removePercent('inputTamPoshl');
    });

    document.getElementById('inputSS').addEventListener('focus', function() {
        removeRubles('inputSS');
    });

    document.getElementById('inputSS').addEventListener('focus', function() {
        removeRubles('inputSS');
    });

    document.getElementById('inputWeight').addEventListener('focus', function() {
        removeKg('inputWeight');
    });

    document.getElementById('inputDoGra').addEventListener('focus', function() {
        removeRubles('inputDoGra');
    });

    document.getElementById('inputPosleGra').addEventListener('focus', function() {
        removeRubles('inputPosleGra');
    });
});

function readTamPoshl() {
    let inputTam = document.getElementById('inputTamPoshl');
    inputTam.readOnly = !inputTam.readOnly;
    let locker = document.getElementById('locker');
    if (inputTam.readOnly) {
        locker.classList.remove('fa-unlock');
        locker.classList.add('fa-lock');
    } else {
        locker.classList.remove('fa-lock');
        locker.classList.add('fa-unlock');
    }
}

function getTamPoshl(){
    const floatingSelect = document.getElementById('floatingSelect');
    const inputTamPoshl = document.getElementById('inputTamPoshl');

    floatingSelect.addEventListener('change', function() {
        const selectedTamname = this.value;

        fetch(`/calculator/getTamposhl?tamname=${selectedTamname}`)
            .then(response => response.text())
            .then(data => {
                inputTamPoshl.value = data + ' %';
            })
            .catch(error => {
                console.error('Error fetching tamposhl: ', error);
            });
    });
}

function addRubles(elementId) {
    let input = document.getElementById(elementId);
    let value = input.value;
    value = value.replace(' р.', '');
    if (value && !value.endsWith('р.')) {
        input.value = value + ' р.';
    }
}

function addPercent(elementId) {
    let input = document.getElementById(elementId);
    let value = input.value;
    if (value && !value.endsWith('%')) {
        input.value = value + ' %';
    }
}

function addKg(elementId) {
    let input = document.getElementById(elementId);
    let value = input.value;
    if (value && !value.endsWith('кг.')) {
        input.value = value + ' кг.';
    }
}

function removeRubles(elementId) {
    let input = document.getElementById(elementId);
    let value = input.value;
    if (value && value.endsWith('р.')) {
        input.value = value.slice(0, -3);
    }
}

function removeKg(elementId) {
    let input = document.getElementById(elementId);
    let value = input.value;
    if (value && value.endsWith('кг.')) {
        input.value = value.slice(0, -4);
    }
}

function removePercent(elementId) {
    let input = document.getElementById(elementId);
    let value = input.value;
    if (value && value.endsWith('%')) {
        input.value = value.slice(0, -2);
    }
}

function calculate() {
    try {
        removePercent('inputTamPoshl');
        removeRubles('inputSS');
        removeKg('inputWeight');
        removeRubles('inputDoGra');
        removeRubles('inputPosleGra');

        let ssValue = document.getElementById('inputSS').value;
        let weightValue = document.getElementById('inputWeight').value;
        let tamPoshlValue = document.getElementById('inputTamPoshl').value;
        let transpRashDoGraValue = document.getElementById('inputDoGra').value;
        let transpRashPosleGraValue = document.getElementById('inputPosleGra').value;

        if (ssValue === '' || weightValue === '' || tamPoshlValue === '' || transpRashDoGraValue === '' || transpRashPosleGraValue === '') {
            let ssValue = document.getElementById('inputSS').value;
            let weightValue = document.getElementById('inputWeight').value;
            let tamPoshlValue = document.getElementById('inputTamPoshl').value;
            let transpRashDoGraValue = document.getElementById('inputDoGra').value;
            let transpRashPosleGraValue = document.getElementById('inputPosleGra').value;

            if (ssValue === '' || weightValue === '' || tamPoshlValue === '' || transpRashDoGraValue === '' || transpRashPosleGraValue === '') {
                showModalAndAlertError("Пожалуйста, заполните все поля");

                addPercent('inputTamPoshl');
                addRubles('inputSS');
                addKg('inputWeight');
                addRubles('inputDoGra');
                addRubles('inputPosleGra');

                return;
            }
        }

        if (isNaN(ssValue) || isNaN(weightValue) || isNaN(tamPoshlValue) || isNaN(transpRashDoGraValue) || isNaN(transpRashPosleGraValue)) {
            showModalAndAlertError("Пожалуйста, введите только числовые значения во все поля");

            addPercent('inputTamPoshl');
            addRubles('inputSS');
            addKg('inputWeight');
            addRubles('inputDoGra');
            addRubles('inputPosleGra');

            return;
        }

        let formData = {
            ss: ssValue,
            weight: weightValue,
            tamposhl: tamPoshlValue,
            transprashdogra: transpRashDoGraValue,
            transprashposlegravalue: transpRashPosleGraValue
        };

        addPercent('inputTamPoshl');
        addRubles('inputSS');
        addKg('inputWeight');
        addRubles('inputDoGra');
        addRubles('inputPosleGra');

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
                const resultLabel = document.getElementById('resultSS')
                const resultPerWeightLabel = document.getElementById('resultPerWeight')

                let result = data.toFixed(2);
                let resultPerWeight = (data / weightValue).toFixed(2);
                let resultNDS = (ssValue * 20 / 100).toFixed(2);
                let resultTamPoshl = (ssValue * tamPoshlValue / 100);

                resultLabel.innerText = result + " р.";
                resultPerWeightLabel.innerText = resultPerWeight + " р.";
                document.getElementById('resultNDS').innerText = resultNDS + " р.";
                document.getElementById('resultTamPoshl').innerText = resultTamPoshl + " р.";

                $('#modalItog').modal('show');

                showModalAndAlertAccept("Расчеты произведены успешно");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    } catch (error) {
        showModalAndAlertError('Ошибка со стороны сервера.');
    }
}

function saveData() {
    removePercent('inputTamPoshl');
    removeRubles('inputSS');
    removeKg('inputWeight');
    removeRubles('inputDoGra');
    removeRubles('inputPosleGra');

    let selectedType = document.getElementById('floatingSelect').value;
    let textBoxTamPoshlValue = parseFloat(document.getElementById('inputTamPoshl').value).toFixed(2);
    let textBoxSS = parseFloat(document.getElementById('inputSS').value).toFixed(2);
    let textBoxTranspRashDoGraValue = parseFloat(document.getElementById('inputDoGra').value).toFixed(2);
    let textBoxTranspRashPosleGraValue = parseFloat(document.getElementById('inputPosleGra').value).toFixed(2);
    let textBoxWeightValue = parseFloat(document.getElementById('inputWeight').value).toFixed(2);
    let resultValue = parseFloat(document.getElementById('resultSS').textContent.replace(' р.', '')).toFixed(2);
    let resultPerWeightValue = parseFloat(document.getElementById('resultPerWeight').textContent.replace(' р.', '')).toFixed(2);

    let formData = {
        typetam: selectedType,
        tamposhl: textBoxTamPoshlValue,
        transprashdogra: textBoxTranspRashDoGraValue,
        transprashposlegra: textBoxTranspRashPosleGraValue,
        ss: textBoxSS,
        weightprod: textBoxWeightValue,
        itogss: resultValue,
        itogssperweight: resultPerWeightValue
    };

    addPercent('inputTamPoshl');
    addRubles('inputSS');
    addKg('inputWeight');
    addRubles('inputDoGra');
    addRubles('inputPosleGra');

    console.log(formData);
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
            console.log(data);
            showModalAndAlertAccept("Расчет сохранен");
        })
        .catch(error => {
            console.error('Ошибка при сохранении данных:', error);
        });
}

function showSavedCalculations() {
    clearTable();

    fetch('/calculator/getAllSavesOperations')
        .then(response => response.json())
        .then(data => {
            $('#modalTable').modal('show');
            fillTable(data);
            showModalAndAlertAccept("Таблица показана");
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}

function clearTable() {
    $('table tbody').empty();
}

function fillTable(data) {
    let tbody = $('table tbody');

    data.forEach(item => {
        let ssWithRubles = item.ss + ' р.';
        let transprashdograWithRubles = item.transprashdogra + ' р.';
        let transprashposlegraWithRubles = item.transprashposlegra + ' р.';
        let itogssWithRubles = item.itogss + ' р.';

        // Добавляем "%" к таможенной пошлине
        let tamposhlWithPercent = item.tamposhl + ' %';

        // Добавляем "кг" к весу товара и итоговой сумме за кг
        let weightprodWithKg = item.weightprod + ' кг';
        let itogssperweightWithKg = item.itogssperweight + ' р./кг';

        let row = `<tr>
                       <td>${item.typetam}</td>
                       <td>${tamposhlWithPercent}</td>
                       <td>${ssWithRubles}</td>
                       <td>${transprashdograWithRubles}</td>
                       <td>${transprashposlegraWithRubles}</td>
                       <td>${weightprodWithKg}</td>
                       <td>${itogssWithRubles}</td>
                       <td>${itogssperweightWithKg}</td>
                   </tr>`;
        tbody.append(row);
    });
}

function saveTableOnFile() {
    fetch('/calculator/getAllSavesOperations')
        .then(response => response.json())
        .then(data => {
            let excelData = [];

            let headerRow1 = ["Введенные данные", "", "", "", "", "", "Результаты", ""];
            let headerRow2 = ["Тип", "Таможенная пошлина", "C/c", "Транспортные расходы до границы", "Транспортные расходы после границы",
                "Вес", "Полностью", "За единицу"];
            excelData.push(headerRow1);
            excelData.push(headerRow2);

            data.forEach(row => {
                let rowData = [
                    row.typetam.toString(),
                    row.tamposhl.toString(),
                    row.ss.toString(),
                    row.transprashdogra.toString(),
                    row.transprashposlegra.toString(),
                    row.weightprod.toString(),
                    row.itogss.toString(),
                    row.itogssperweight.toString()
                ];
                console.log(rowData);
                excelData.push(rowData);
            });

            let wb = XLSX.utils.book_new();
            let ws = XLSX.utils.aoa_to_sheet(excelData);

            ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
            ws['!merges'].push({ s: { r: 0, c: 6 }, e: { r: 0, c: 7 } });

            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, 'file.xlsx');
            showModalAndAlertAccept("Локальная копия сохранена");
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}

function toggleEditName() {
    let editContainer = document.getElementById("editNameContainer");
    let currentName = document.getElementById("tableName").innerText;
    let inputField = document.getElementById("newTableName");

    editContainer.style.display = "block";
    inputField.value = currentName;

    document.getElementById("tableName").style.display = "none";
}

function dropTable() {
    return fetch('/calculator/deleteAllData', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                showModalAndAlertError("Ошибка при очищении таблицы");
            }
            return response.text();
        })
        .then(data => {
            console.log("Данные удалены:", data);
            clearTable();
            console.log("Таблица очищена");
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}

function loadTableFromExcel(event) {
    let input = event.target;
    let files = input.files;
    if (files && files.length > 0) {
        let fileName = files[0].name;
        let fileExtension = fileName.split('.').pop().toLowerCase();
        if (fileExtension !== 'xlsx' && fileExtension !== 'xls') {
            showModalAndAlertError('Пожалуйста, выберите файл Excel (XLSX или XLS)');
            return;
        }
        let reader = new FileReader();
        reader.onload = function () {
            let data = new Uint8Array(reader.result);
            let workbook = XLSX.read(data, { type: 'array' });
            let sheetName = workbook.SheetNames[0];
            let sheet = workbook.Sheets[sheetName];
            let tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            tableData.shift();
            tableData.shift();

            let selectedProductType = document.getElementById('floatingSelect').value;

            let filteredTableData = tableData.filter(function(row) {
                return row[0] === selectedProductType;
            });

            let invalidRecordsCount = tableData.length - filteredTableData.length;

            if (document.getElementById('startFromBeginningCheckbox').checked) {
                dropTable().then(function() {
                    appendAndSaveData(filteredTableData, fileName);
                }).catch(function(error) {
                    console.error('Ошибка:', error);
                });
            } else {
                appendAndSaveData(filteredTableData, fileName);
            }

            showModalAndAlertAccept("Файл загружен. Не прошло проверку " + invalidRecordsCount + " записей.");
        };
        reader.readAsArrayBuffer(files[0]);
    }
}

function appendAndSaveData(filteredTableData, fileName) {
    let tableBody = document.getElementById("modalTableBody");
    tableBody.innerHTML = '';

    appendTableData(filteredTableData);

    document.getElementById('tableName').textContent = fileName.split('.').slice(0, -1).join('.');
    let savesOperationsList = fillDataFromTable();

    // Удаляем символы "р.", "кг.", "%" и "р./кг." из данных
    savesOperationsList.forEach(item => {
        item.ss = item.ss.replace(' р.', '');
        item.transprashdogra = item.transprashdogra.replace(' р.', '');
        item.transprashposlegra = item.transprashposlegra.replace(' р.', '');
        item.weightprod = item.weightprod.replace(' кг', '');
        item.tamposhl = item.tamposhl.replace(' %', '');
        item.itogss = item.itogss.replace(' р.', '');
        item.itogssperweight = item.itogssperweight.replace(' р./кг', '');
    });
    fetch('/calculator/saveMultipleData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(savesOperationsList)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка сохранения данных');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            clearTable();
            fetch('/calculator/getAllSavesOperations')
                .then(response => response.json())
                .then(data => {
                   fillTable(data);
                    showModalAndAlertAccept("Таблица показана");
                })
                .catch(error => {
                    console.error('Ошибка при получении данных:', error);
                });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            showModalAndAlertError('Произошла ошибка при сохранении данных');
        });
}

function fillDataFromTable() {
    let tableBody = document.getElementById("modalTableBody");
    let savesOperationsList = [];

    for (let i = 0; i < tableBody.rows.length; i++) {
        let rowData = tableBody.rows[i].cells;
        let savesOperation = {
            typetam: rowData[0].innerText,
            tamposhl: rowData[1].innerText,
            ss: rowData[2].innerText,
            transprashdogra: rowData[3].innerText,
            transprashposlegra: rowData[4].innerText,
            weightprod: rowData[5].innerText,
            itogss: rowData[6].innerText,
            itogssperweight: rowData[7].innerText
        };
        savesOperationsList.push(savesOperation);
    }
    return savesOperationsList;
}

function appendTableData(newData) {
    let tableBody = document.getElementById("modalTableBody");
    for (let i = 0; i < newData.length; i++) {
        let row = document.createElement("tr");
        for (let j = 0; j < newData[i].length; j++) {
            let cell = document.createElement("td");
            cell.textContent = newData[i][j];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}

function saveEditedTableName() {
    let newNameInput = document.getElementById("newTableName");
    let newName = newNameInput.value.trim();

    if (newName === "") {
        showModalAndAlertError("Введите новое название");
        return;
    }
    document.getElementById("tableName").textContent = newNameInput.value;  
    document.getElementById("editNameContainer").style.display = "none";
    document.getElementById("tableName").style.display = "block";
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

function showModalAndAlertAccept(textAlert) {
    document.getElementById('alertContainer').innerHTML = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #28a745; color: #fff;
                font-size: 14px; font-weight: bold;">
                    ${textAlert}
                </div>`;

    setTimeout(function() {
        document.getElementById('alertContainer').innerHTML = '';
    }, 2000);
}
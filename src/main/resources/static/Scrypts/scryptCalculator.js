window.onload = function() {
    getTamPoshl()
    document.getElementById('floatingSelect').dispatchEvent(new Event('change'));
};

document.addEventListener('DOMContentLoaded', function() {
    getTamPoshl();
});

function getTamPoshl(){
    const floatingSelect = document.getElementById('floatingSelect');
    const inputTamPoshl = document.getElementById('inputTamPoshl');

    floatingSelect.addEventListener('change', function() {
        const selectedTamname = this.value;

        fetch(`/calculator/getTamposhl?tamname=${selectedTamname}`)
            .then(response => response.text())
            .then(data => {
                inputTamPoshl.value = data;
            })
            .catch(error => {
                console.error('Error fetching tamposhl: ', error);
            });
    });
}

function calculate() {
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
            let alert = `<div class="alert alert-danger" role="alert" style="padding: 10px; background-color: #ee2e2e; font-size:14px; font-weight: bold;"">
                        Пожалуйста, заполните все поля
                      </div>`;
            document.getElementById('alertContainer').innerHTML = alert;

            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 2000);
            return;
        }
    }

    let formData = {
        ss: ssValue,
        weight: weightValue,
        tamposhl: tamPoshlValue,
        transprashdogra:transpRashDoGraValue,
        transprashposlegravalue:transpRashPosleGraValue
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

            let alert = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #28a745; color: #fff; font-size: 14px; font-weight: bold;">
                    Расчеты произведены успешно
                  </div>`;
            document.getElementById('alertContainer').innerHTML = alert;

            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 2000);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function saveData() {
    let selectedType = document.getElementById('floatingSelect').value;
    let textBoxTamPoshlValue = document.getElementById('inputTamPoshl').value;
    let textBoxSS = document.getElementById('inputSS').value;
    let textBoxTranspRashDoGraValue = document.getElementById('inputDoGra').value;
    let textBoxTranspRashPosleGraValue = document.getElementById('inputPosleGra').value;
    let textBoxWeightValue = document.getElementById('inputWeight').value;
    let resultValue = document.getElementById('resultSS').textContent.replace(' р.', '');
    let resultPerWeightValue = document.getElementById('resultPerWeight').textContent.replace(' р.', '');

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
            let alert = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #28a745; color: #fff; font-size: 14px; font-weight: bold;">
                    Расчет сохранен
                  </div>`;
            document.getElementById('alertContainer').innerHTML = alert;

            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 2000);
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
            if(data.length === 0){
                let alert = `<div class="alert alert-danger" role="alert" style="padding: 10px; background-color: #ee2e2e; font-size:14px; font-weight: bold;"">
                        Данных в таблице нету
                      </div>`;
                document.getElementById('alertContainer').innerHTML = alert;

                setTimeout(function() {
                    document.getElementById('alertContainer').innerHTML = '';
                }, 2000);
                return;                return;
            }
            $('#modalTable').modal('show');
            fillTable(data);

            let alert = `<div class="alert alert-success" role="alert" style="padding: 10px; background-color: #28a745; color: #fff; font-size: 14px; font-weight: bold;">
                    Таблица показана
                  </div>`;
            document.getElementById('alertContainer').innerHTML = alert;

            setTimeout(function() {
                document.getElementById('alertContainer').innerHTML = '';
            }, 2000);
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
        });
}
function clearTable() {
    $('table tbody').empty();
}
function fillTable(data) {
    var tbody = $('table tbody');

    data.forEach(item => {
        var row = `<tr>
                       <td>${item.typetam}</td>
                       <td>${item.tamposhl}</td>
                       <td>${item.ss}</td>
                       <td>${item.transprashdogra}</td>
                       <td>${item.transprashposlegra}</td>
                       <td>${item.weightprod}</td>
                       <td>${item.itogss}</td>
                       <td>${item.itogssperweight}</td>
                   </tr>`;
        tbody.append(row);
    });
    clearTable();
}

function openDocument() {
    window.open('/document', '_blank');
}

function saveTableOnFile() {
    var table = document.getElementById("modalTableBody");
    var data = [];

    var headerRow1 = ["Введенные данные", "", "", "", "", "", "Результаты", ""];
    var headerRow2 = ["Тип", "Таможенная пошлина", "C/c", "Транспортные расходы до границы", "Транспортные расходы после границы",
        "Вес", "Полностью", "За единицу"];
    data.push(headerRow1);
    data.push(headerRow2);

    for (var i = 0; i < table.rows.length; i++) {
        var rowData = [];
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            rowData.push(table.rows[i].cells[j].innerText);
        }
        data.push(rowData);
    }

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(data);

    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
    ws['!merges'].push({ s: { r: 0, c: 6 }, e: { r: 0, c: 7 } });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, document.getElementById('tableName').textContent+'.xlsx');
}

function dropTable(){
    
}

function toggleEditName() {
    var editContainer = document.getElementById("editNameContainer");
    var currentName = document.getElementById("tableName").innerText;
    var inputField = document.getElementById("newTableName");

    editContainer.style.display = "block";
    inputField.value = currentName;

    document.getElementById("tableName").style.display = "none";
}

function loadTableFromExcel(event) {
    var input = event.target;
    var files = input.files;
    if (files && files.length > 0) {
        var reader = new FileReader();
        reader.onload = function () {
            var data = new Uint8Array(reader.result);
            var workbook = XLSX.read(data, { type: 'array' });
            var sheetName = workbook.SheetNames[0];
            var sheet = workbook.Sheets[sheetName];
            var tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            tableData.shift();
            tableData.shift();
            displayTable(tableData);
        };
        reader.readAsArrayBuffer(files[0]);
    }
}

function displayTable(tableData) {
    var tableBody = document.getElementById("modalTableBody");
    tableBody.innerHTML = "";

    for (var i = 0; i < tableData.length; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < tableData[i].length; j++) {
            var cell = document.createElement("td");
            cell.textContent = tableData[i][j];
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
}
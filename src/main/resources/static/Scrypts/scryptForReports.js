document.addEventListener("DOMContentLoaded", function() {
    let productTypeCheckbox = document.getElementById("productTypeCheckbox");
    let productTypeSelectRow = document.querySelector(".productTypeSelectRow");
    let additionalOptionsCheckbox = document.getElementById("additionalOptionsCheckbox");
    let additionalOptionsRadios = document.querySelector(".additionalOptionsRadios");
    let sortingDirectionRadios = document.getElementById("sortedRadio");

    const body = document.body;
    body.classList.add('dark-theme');

    productTypeCheckbox.addEventListener("change", function() {
        if (this.checked) {
            productTypeSelectRow.style.display = "block";
        } else {
            productTypeSelectRow.style.display = "none";
        }
    });

    additionalOptionsCheckbox.addEventListener("change", function() {
        if (this.checked) {
            additionalOptionsRadios.style.display = "block";
            if (isAdditionalSortingRadioSelected()) {
                sortingDirectionRadios.style.display = "block";
            }
        } else {
            additionalOptionsRadios.style.display = "none";
            sortingDirectionRadios.style.display = "none";
        }
    });
    let sortingRadios = document.querySelectorAll('input[name="additionalSortingRadio"]');

    sortingRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            if (additionalOptionsCheckbox.checked) {
                sortingDirectionRadios.style.display = "block";
            }
        });
    });

    function isAdditionalSortingRadioSelected() {
        let sortingRadios = document.querySelectorAll('input[name="additionalSortingRadio"]');
        for (let i = 0; i < sortingRadios.length; i++) {
            if (sortingRadios[i].checked) {
                return true;
            }
        }
        return false;
    }
});

function toggleProductSelect() {
    const productTypeCheckbox = document.getElementById('productTypeCheckbox');
    const productSelectRow = document.querySelector('.productTypeSelectRow');
    productSelectRow.style.display = productTypeCheckbox.checked ? 'block' : 'none';
}

function toggleAdditionalOptions() {
    const additionalOptionsCheckbox = document.getElementById('additionalOptionsCheckbox');
    const additionalOptionsRadios = document.querySelector('.additionalOptionsRadios');
    const sortedRadio = document.getElementById('sortedRadio');
    if (additionalOptionsCheckbox.checked) {
        additionalOptionsRadios.style.display = 'block';
        sortedRadio.style.display = 'block';
    } else {
        additionalOptionsRadios.style.display = 'none';
        sortedRadio.style.display = 'none';
    }
}

function createReport() {
    fetch('/reports/getAllSavesOperations')
        .then(response => response.json())
        .then(data => {
            const productTypeCheckbox = document.getElementById('productTypeCheckbox');
            const additionalOptionsCheckbox = document.getElementById('additionalOptionsCheckbox');
            let filteredData = data;

            if (productTypeCheckbox.checked) {
                const selectedProductType = document.getElementById('floatingSelect').value;
                if (selectedProductType) {
                    filteredData = filteredData.filter(row => row.typetam === selectedProductType);
                }
            }

            if (additionalOptionsCheckbox.checked) {
                const sortingField = document.querySelector('input[name="additionalSortingRadio"]:checked');
                const sortingDirection = document.querySelector('input[name="sortingDirectionRadio"]:checked');

                if (!sortingField || !sortingDirection) {
                    showModalAndAlertError('Пожалуйста, выберите опции сортировки и направление сортировки');
                    return;
                }

                const fieldMap = {
                    'additionalCostRadio': 'ss',
                    'additionalWeightRadio': 'weightprod',
                    'additionalTransportBeforeRadio': 'transprashdogra',
                    'additionalTransportAfterRadio': 'transprashposlegra'
                };
                const field = fieldMap[sortingField.id];
                const direction = sortingDirection.id === 'ascendingRadio' ? 1 : -1;

                console.log(`Sorting by ${field} in ${direction === 1 ? 'ascending' : 'descending'} order`);

                filteredData.sort((a, b) => {
                    if (a[field] < b[field]) return -1 * direction;
                    if (a[field] > b[field]) return 1 * direction;
                    return 0;
                });
            }

            if (filteredData.length > 0) {
                saveReportFile(filteredData);
            } else {
                console.warn('Нет данных для выбранных критериев');
                showModalAndAlertError("Нет данных для выбранных критериев");
            }
        })
        .catch(error => {
            console.error('Ошибка при получении данных:', error);
            showModalAndAlertError('Ошибка при получении данных');
        });
}

function saveReportFile(data) {
    let excelData = [];

    let headerRow1 = ["Введенные данные (р.)", "", "", "", "", "", "Результаты (р.)", ""];
    let headerRow2 = ["Тип", "Таможенная пошлина (%)", "C/c (р.)", "Транспортные расходы до границы (р.)", "Транспортные расходы после границы (р.)",
        "Вес (р.)", "Полностью (р.)", "За единицу (р./кг)"];
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
        excelData.push(rowData);
    });

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(excelData);

    ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
    ws['!merges'].push({ s: { r: 0, c: 6 }, e: { r: 0, c: 7 } });

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, 'report.xlsx');
    showModalAndAlertAccept("Локальная копия сохранена");
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
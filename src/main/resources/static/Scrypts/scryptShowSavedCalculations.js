function showSavedCalculations() {
    clearTable();
        
    fetch('/calculator/getAllSavesOperations')
        .then(response => response.json())
        .then(data => {
            fillTable(data);
            validationMessage.innerText = "Таблица отображена";
            validationMessage.style.backgroundColor = "#00FF00";

            $('table').css('visibility', 'visible');
            $('#buttosShow').text('Обновить таблицу');
            $('#buttonHide').css('visibility', 'visible')
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
                       <td>${item.transprash}</td>
                       <td>${item.weightprod}</td>
                       <td>${item.itogss}</td>
                       <td>${item.itogssperweight}</td>
                   </tr>`;
        tbody.append(row);
    });
}
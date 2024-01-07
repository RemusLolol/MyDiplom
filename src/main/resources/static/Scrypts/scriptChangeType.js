$(document).ready(function () {
    $('.textBoxType').change(function () {
        var selectedTamname = $(this).val();

        $.ajax({
            type: 'GET',
            url: '/calculator/getTamposhl',
            data: { tamname: selectedTamname },
            success: function (response) {
                $('#textBoxTamPoshlID').val(response);
            },
            error: function (error) {
                console.error('Error fetching tamposhl: ', error);
            }
        });
    });
});

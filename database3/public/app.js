/**
 * Created by airmac on 6/5/17.
 */

function createTable(data, textStatus, jqXHR) {
    var json = JSON.parse(data.results);

    $('.table-container').html('');

    if(json.length > 0) {
        //var body = document.body;
        var table = document.createElement('table');
        var tableBody = document.createElement('tbody');

        table.style.width = '66%';
        table.setAttribute('border', '1');

        var tr = document.createElement('tr');
        for(var key in json[0]) {
            if(key !== 'id') {
                var th = document.createElement('th');
                th.appendChild(document.createTextNode(key.toUpperCase()));
                tr.appendChild(th);
            }
        }

        var th = document.createElement('th');
        tr.appendChild(th);
        tr.appendChild(th);
        tableBody.appendChild(tr);

        for(var x = 0; x < json.length; x++) {
            tr = document.createElement('tr');

            for(var y in json[x]) {
                if(y !== 'id') {
                    var td = document.createElement('td');
                    var lbl = json[x][y];
                    td.appendChild(document.createTextNode(lbl));
                    tr.appendChild(td);
                }else {
                    tr.setAttribute('data-id', json[x][y]);
                }
            }

            var editButton = document.createElement('button');
            editButton.className = 'btn btn-default edit';
            editButton.appendChild(document.createTextNode('Edit'));

            var deleteButton = document.createElement('button');
            deleteButton.className = 'btn del';
            deleteButton.appendChild(document.createTextNode('Delete'));

            tr.appendChild(editButton);
            tableBody.appendChild(tr);
            tr.appendChild(deleteButton);
            tableBody.appendChild(tr);
        }
        table.appendChild(tableBody);
        var div = document.getElementsByClassName('table-container')[0];
        div.appendChild(table);
    } else {
        $('.table-container').html('No data available');
    }

    buttonListeners();
}

function getID(e) {
    return $(e.target).parent('tr').data('id');
}

function getInput() {
    $('.edit-container').html('');
    $.ajax({
        url:    '/work',
        dataType: 'json',
        success: createTable
    });
}

function editTable(e, id) {
    $('.edit-container').html('');
    var editForm = '<h3>Edit Workout</h3><form class ="col-md-6 form-horizontal edit-form">' +
            '<label for="name">Name:</label><input name="name" class="name" type="text" required>' +
            '<label for="reps">Reps:</label><input name="reps" type="number" class="reps">' +
            '<label for="weight">Weight:</label><input name="weight" type="number" class="weight">' +
            '<label for="date">Date:</label><input name="date" type="date" class="date">' +
            '<label for="unit">Units:</label><input name="unit" type="number" max="1" min="0" class="unit">' +
            '<input type="submit" class="btn-submit edit-workout">' +
        '</form>';
    $('.edit-container').append(editForm);

    $.ajax({
        url: '/work?id=' + id,
        success: function(data) {
            var object = JSON.parse(data.results);
            $('.edit-form .name').val(object[0].name);
            $('.edit-form .reps').val(object[0].reps);
            $('.edit-form .weight').val(object[0].weight);
            $('.edit-form .date').val(object[0].date);
            $('.edit-form .unit').val(object[0].unit);

            $('.edit-form .edit-workout').on('click', function(e) {
                e.preventDefault();
                var stuff = '';
                stuff += '?id=' + id;
                stuff += '&name=' + $('.edit-form .name').val();
                stuff += '&reps=' + $('.edit-form .reps').val();
                stuff += '&weight=' + $('.edit-form .weight').val();
                stuff += '&date=' + $('.edit-form .date').val();
                stuff += '&unit=' + $('.edit-form .unit').val();

                if($.trim($('.edit-form .name').val() !== '')) {
                    $.ajax({
                        method: 'PUT',
                        url: '/work' + stuff,
                        success: getInput
                    });
                }
            });
        }
    });
}

function buttonListeners() {

    $('.edit').on('click', function(e) {
        var id = getID(e);
        editTable(e, id);
    });

    $('.del').on('click', function(e) {
        var id = getID(e);

        $.ajax({
            url:    '/work?id=' + id,
            method: 'DELETE',
            success: getInput
        });
    });

}

$(document).ready(function() {
    getInput();

    $('.add').width('50%');
    $('h1').css('text-align', 'center');
    $('p').css('text-align', 'center');
    $('.add').css('padding-left', '25%');
    $('.table-container').css('padding-left', '25%');
    $('h3').css('padding-top', '3%');
    $('.edit-container').css('padding-left', '25%');
    $('.edit-container').css('padding-top', '2%');
    $('h3').css('padding-left', '25%');


    $('.add-workout').on('click', function (e) {
        e.preventDefault();
        var addWorkout;
        addWorkout = {
            'name': $('input[name=name]').val(),
            'reps': $('input[name=reps]').val(),
            'weight': $('input[name=weight]').val(),
            'date': $('input[name=date]').val(),
            'unit': $('input[name=unit]').val()
        };

        if($.trim(addWorkout['name'] !== '')) {
            $.ajax({
                url: '/work',
                method: 'POST',
                data: addWorkout,
                success: getInput
            });
        }
    });

});
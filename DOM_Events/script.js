/**
 * Created by airmac on 5/2/17.
 */


//current position of highlighted cell
var row = 1;
var col = 1;


//creating table
function createTable() {

    var body = document.body;
    var tbl = document.createElement('table');
    var tblBody = document.createElement('tbody');
    tbl.setAttribute('border', 1);
    tbl.style.border = '1px solid black';
    tbl.style.width = '50%';

    for (var i = 0; i < 4; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 4; j++) {
            if (i == 4 && j == 4) {
                break;
            } else {
                if (i === 0) {
                    var th = document.createElement('th');
                    var head = "Header " + (j + 1);
                    th.appendChild(document.createTextNode(head));
                    tr.appendChild(th);
                } else {
                    var td = document.createElement('td');
                    var text = (j + 1) + ", " + i;
                    td.appendChild(document.createTextNode(text));
                    td.setAttribute('id', text);    //set this to change cell color

                    //set starting location of selected cell
                    if (j === 0 && i === 1) {
                        td.style.border = "3px solid black";
                    }
                    tr.appendChild(td);
                }
            }
        }
        tblBody.appendChild(tr);
    }
    tbl.appendChild(tblBody);
    body.appendChild(tbl);
}

//updates highlight on current element
function changeSelect(c, r) {
    var posID = col + ", " + row;
    var currPos = document.getElementById(posID);
    currPos.style.border = "1px solid black";

    col = c;
    row = r;
    posID = col + ", " + row;
    currPos = document.getElementById(posID);
    currPos.style.border = "3px solid black";
}

//moving selected cell
function moveCell(direction) {

    switch(direction) {
        case "Up":
            if(row !== 1)
                changeSelect(col, row - 1);
            break;

        case "Right":
            if(col !== 4)
                changeSelect(col + 1, row);
            break;

        case "Down":
            if(row !== 3)
                changeSelect(col, row + 1);
            break;

        case "Left":
            if(col !== 1)
                changeSelect(col - 1, row);
            break;

    }

}

//adding buttons
function addButtons() {
    var btnLabel = ["Up", "Down", "Left", "Right", "Mark Cell"];
    var body = document.body;

    for(var i = 0; i < btnLabel.length; i++) {
        var button = document.createElement('Button');
        button.appendChild(document.createTextNode(btnLabel[i]));
        body.appendChild(button);
        button.style.width = '10%';
        button.addEventListener("click", function(b){
            if(b.target.innerText !== "Mark Cell") {
                moveCell(b.target.innerText);
            }
            else {
                //id of current cell should match its inner text
                var currCell = document.getElementById(col + ", " + row);
                currCell.style.backgroundColor = "yellow";
            }

        });
    }
}

createTable();
addButtons();
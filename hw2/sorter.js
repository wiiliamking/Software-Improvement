window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

var order = [];

function getAllTables() {
	var returnTables = document.getElementsByTagName('table');
	return returnTables;
}

function makeAllTablesSortable(tables) {
	for (var index = 0; index < tables.length; ++index) {
        if (!tables[index].tHead) continue;
        order[index] = [];
        var num = 0;
        for (var i = 0; i < tables[index].tBodies.length; ++i) {
            for (var j = 0; j < tables[index].tBodies[i].rows.length; ++j)
                order[index].push(num++);
        }
        var tr = tables[index].tHead.rows[0];
        for (var num = 0; num < tr.cells.length; ++num) {
            var triangle = document.createElement("img");
            triangle.className = "normal";
            tr.cells[num].appendChild(triangle);
        	tr.cells[num].setAttribute("sorted", "normal");
            tr.cells[num].addEventListener("click", toggleSort, false);
        }
	}
}

var toggleSort = function (e) {
    var tBodies = e.srcElement.parentNode.parentNode.parentNode.tBodies;
    var colIndex = e.srcElement.cellIndex;
    var tableNum = getTableNum(e.srcElement.parentNode.parentNode.parentNode);
    var oldOrder = order[tableNum], newOrder = [], preOrder = [];
    var column = getColumn(tBodies, colIndex, tableNum);
    if (e.srcElement.getAttribute("sorted") != "down") {
        if (e.srcElement.getAttribute("sorted") == "normal")
            column.sort(upOrder);
        else column.sort(downOrder);
        for (index in column) {
            newOrder.push(column[index][1]);
        }
        order[tableNum] = newOrder;
        updateCol(tBodies, oldOrder, newOrder, colIndex);
        if (e.srcElement.getAttribute("sorted") == "normal") e.srcElement.setAttribute("sorted", "up");
        else e.srcElement.setAttribute("sorted", "down");
    } else {
        for (index in column) {
            preOrder.push(index);
        }
        updateCol(tBodies, oldOrder, preOrder, colIndex);
        e.srcElement.setAttribute("sorted", "normal");
    }
    changeTheadStyle(e.srcElement);
}

function changeTheadStyle(tHead) {
    tHead.className = tHead.getAttribute("sorted");
    if (tHead.className == "up") {
        tHead.lastChild.src = "ascend.png";
    }
    if (tHead.className == "down") {
        tHead.lastChild.src = "descend.png";
    }
    cells = tHead.parentNode.cells;
    for (var i = 0; i < cells.length; ++i) {
        if (cells[i].cellIndex != tHead.cellIndex) {
            cells[i].setAttribute("sorted", "normal");
            cells[i].className = "normal";
        }
    }
}

function upOrder(a, b) {
    return (a[0] >= b[0]);
}

function downOrder(a, b) {
    return (a[0] < b[0]);
}

function getTableNum(table) {
    var tables = getAllTables(),
        num;
    for (index in tables) {
        if (tables[index].offsetTop == table.offsetTop) {
            num = index;
            break;
        }
    }
    return num;
}

function getColumn(tBodies, colNumber, tableNum) {
    var column = [], index = 0;
    for (var bodyNum = 0; bodyNum < tBodies.length; ++bodyNum) {
        var trs = tBodies[bodyNum].rows;
        for (var num = 0; num < trs.length; ++num) {
            var col = [];
            col[0] = trs[num].cells[colNumber].innerHTML;
            col[1] = order[tableNum][index++];
            column.push(col);
        }
    }
    return column;
}

function updateCol(tBodies, oldOrder, newOrder, colNumber) {
    var num = 0;
    var content = getContents(tBodies);
    var newRows = getRows(oldOrder, newOrder, content);
    for (var i = 0; i < tBodies.length; ++i) {
        for (var j = 0; j < tBodies[i].rows.length; ++j) {
            for (var k = 0; k < tBodies[i].rows[j].cells.length; ++k) {
                tBodies[i].rows[j].cells[k].innerHTML = newRows[num][k];
            }
            ++num;
        }
    }
}

function getContents(tBodies) {
    var content = [];
    for (var i = 0; i < tBodies.length; ++i) {
        for (var j = 0; j < tBodies[i].rows.length; ++j) {
            content.push(tBodies[i].rows[j]);
        }
    }
    return content;
}

function getRows(oldOrder, newOrder, content) {
    var rows = [];
    for (var i = 0; i < newOrder.length; ++i) {
        rows[i] = [];
        for (var j = 0; j < oldOrder.length; ++j) {
            if (newOrder[i] == oldOrder[j]) {
                for (var k = 0; k < content[j].cells.length; ++k) {
                    rows[i][k] = content[j].cells[k].innerHTML;
                }
            }
        }
    }
    return rows;
}
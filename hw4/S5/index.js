function init() {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; ++i) {
        var classList = buttons[i].classList;
        classList.remove("completed");
        classList.remove("unable");
        buttons[i].getElementsByClassName("unread")[0].classList.remove("show");
        buttons[i].getElementsByClassName("unread")[0].classList.add("hide");
    }
    document.getElementById("info-bar").classList.remove("clickable");
    document.getElementById("sum").classList.add("disappear");
    document.getElementById("info-bar").removeEventListener("click", showTheSum);
    var sum = adder(0);
    adder(sum * -1);
}

function react(e) {
    getNumber(e.currentTarget);
}

function aHandler(message, currentSum, func) {
    var result = [];
    vat err = Math.round(Math.random());
    if (err) {
        func()
    }
    if (err) return result;
    var button = document.getElementsByClassName("button")[0];
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp == null) alert('XMLHTTP not supported.');
    xmlHttp.onreadystatechange = function (button) {
        return function() {
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status == 200) {
                    button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
                    adder(parseInt(xmlHttp.responseText));
                    button.classList.add("completed");
                    recoverButtons();
                    if (document.getElementsByClassName("completed").length < 5) nextButton();
                }
                if (document.getElementsByClassName("completed").length == 5) {
                    document.getElementById("sum").innerHTML = currentSum;
                    showTheSum();
                }
            }
        };
    }(button);
    var span = button.getElementsByClassName("unread")[0];
    span.innerHTML = "...";
    span.classList.remove("hide");
    span.classList.add("show");
    xmlHttp.open("GET", "/", true);
    button.removeEventListener("click", getNumber);
    closeButtons(button);
    xmlHttp.send(null);
} 


function nextButton() {
    var buttons = document.getElementsByClassName("button");
    var i;
    for (i = 0; i < buttons.length; ++i) {
        if (!buttons[i].classList.contains("completed")) break;
    }
    getNumber(buttons[i]);
}

function showTheSum() {
    document.getElementById("sum").classList.remove("disappear");
    document.getElementById("info-bar").removeEventListener("click", showTheSum);
    document.getElementById("info-bar").classList.remove("clickable");
}

function updateTheSum() {
    var sum = 0;
    return function(num) {
        sum += num;
        return sum;
    }
}

function closeButtons(button) {
    var buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; ++i) {
    	if (buttons[i].offsetTop != button.offsetTop) {
    		buttons[i].classList.add("unable");
    		buttons[i].removeEventListener("click", react);
    	}
    }
}

function recoverButtons() {
	var buttons = document.getElementsByClassName('unable');
    var toRecover = [];
	for (var i = 0; i < buttons.length; ++i) {
        toRecover.push(buttons[i]);
	}
    for (var i = 0; i < toRecover.length; ++i) {
        toRecover[i].classList.remove("unable");
        toRecover[i].addEventListener("click", react);
    }
}

window.onload = function() {
    init();
    document.getElementById("button").addEventListener("mouseenter", function() {
        var buttons = document.getElementsByClassName("button");
        getNumber(buttons[0]);
    });
    document.getElementById("button").addEventListener("mouseleave", init);
}
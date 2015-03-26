var xmlHttp = new XMLHttpRequest();
var adder = updateTheSum();
if (xmlHttp == null) alert('XMLHTTP not supported.');

function init() {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; ++i) {
        var classList = buttons[i].classList;
        classList.remove("completed");
        classList.remove("unable");
        buttons[i].getElementsByClassName("unread")[0].classList.remove("show");
        buttons[i].getElementsByClassName("unread")[0].classList.add("hide");
    	buttons[i].addEventListener("click", react);
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

function getNumber(button) {
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
                    document.getElementById("sum").innerHTML = adder(0);
                    // document.getElementById("info-bar").classList.add("clickable");
                    // document.getElementById("info-bar").addEventListener("click", showTheSum);
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
    var randomNum = Math.floor(Math.random() * buttons.length);
    while (buttons[randomNum].classList.contains("completed")) randomNum = Math.floor(Math.random() * buttons.length);
    getNumber(buttons[randomNum]);
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
        var randomNum = Math.floor(Math.random() * buttons.length);
        getNumber(buttons[randomNum]);
    });
    document.getElementById("button").addEventListener("mouseleave", init);
}
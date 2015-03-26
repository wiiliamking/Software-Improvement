var xmlHttp = new XMLHttpRequest();
if (xmlHttp == null) alert('XMLHTTP not supported.');

function addListener() {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; ++i) {
    	buttons[i].addEventeListener("click", getNumber);
    }
}

function getNumber(e) {
    xmlHttp.onreadystatechange = function (button) {
        return function() {
            if (xmlHttp.readyState != 4) {
            	button.getElementsByClassName("unread")[0].innerHTML = "。。。";
            	closeButtons(button);
            } else {
            	if (xmlHttp.staus == 200) {
            		button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
            		button.classList.add("completed");
            		recoverButtons();
            	}
            }
        };
    }(e.srcElement);
    xmlHttp.open("GET", "localhost:3000/server.js", true);
    e.srcElement.removeEventHandler("click", getNumber);
    xmlHttp.send(null);
}


function closeButtons(button) {
    var buttons = document.getElementsByClassName('button');
    for (var i = 0; i < buttons.length; ++i) {
    	if (buttons[i] != button) {
    		buttons[i].classList.add("unable");
    		buttons[i].removeEventHandler("click", getNumber);
    	}
    }
}

function recoverButtons() {
	var buttons = document.getElementsByClassName('.unable');
	for (var i = 0; i < buttons.length; ++i) {
		buttons.classList.remove('unable');
	}
}
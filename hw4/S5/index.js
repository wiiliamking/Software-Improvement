function init() {
	var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; ++i) {
        var classList = buttons[i].classList;
        classList.remove("completed");
        classList.remove("unable");
        buttons[i].getElementsByClassName("unread")[0].classList.remove("show");
        buttons[i].getElementsByClassName("unread")[0].classList.add("hide");
        buttons[i].getElementsByClassName("message")[0].classList.remove("show");
        buttons[i].getElementsByClassName("message")[0].classList.add("hide");
    }
    document.getElementById("info-bar").classList.remove("clickable");
    document.getElementById("sum").classList.add("disappear");
    document.getElementById("lastMessage").classList.add("disappear");
    document.getElementById("info-bar").removeEventListener("click", showTheSum);
}

function react(e) {
    getNumber(e.currentTarget);
}

function aHandler(message, currentSum, errHandler) {
    var button = document.getElementsByClassName("button")[0];
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp == null) alert('XMLHTTP not supported.');
    xmlHttp.onreadystatechange = function (button, errHandler) {
        return function() {
            if (xmlHttp.readyState == 4 && button.getElementsByClassName("unread")[0].classList.contains("show")) {
                if (xmlHttp.status == 200) {
                    button.classList.add("completed");
                    var result = [];
                    var err = Math.round(Math.random());
                    if (err)  {
                        errHandler("这不是个天大的秘密", currentSum, button);
                    } else {
                        currentSum += parseInt(xmlHttp.responseText);
                        button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
                        button.getElementsByClassName("message")[0].innerHTML = message;
                    }
                    button.getElementsByClassName("message")[0].classList.remove("hide");
                    button.getElementsByClassName("message")[0].classList.add("show");
                    bHandler("我不知道", currentSum, function(message, currentSum, button) {
                        button.getElementsByClassName("message")[0].innerHTML = message;
                        button.getElementsByClassName("unread")[0].innerHTML = "X";
                    })
                }
                // if (document.getElementsByClassName("completed").length == 5) {
                //     document.getElementById("sum").innerHTML = currentSum;
                //     showTheSum();
                // }
            }
        };
    }(button, errHandler);
    var span = button.getElementsByClassName("unread")[0];
    span.innerHTML = "...";
    span.classList.remove("hide");
    span.classList.add("show");
    xmlHttp.open("GET", "/", true);
    xmlHttp.send(null);
}

function bHandler(message, currentSum, errHandler) {
    var button = document.getElementsByClassName("button")[1];
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp == null) alert('XMLHTTP not supported.');
    xmlHttp.onreadystatechange = function (button, errHandler) {
        return function() {
            if (xmlHttp.readyState == 4 && button.getElementsByClassName("unread")[0].classList.contains("show")) {
                if (xmlHttp.status == 200) {
                    button.classList.add("completed");
                    var result = [];
                    var err = Math.round(Math.random());
                    if (err)  {
                        errHandler("我知道", currentSum, button);
                    } else {
                        currentSum += parseInt(xmlHttp.responseText);
                        button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
                        button.getElementsByClassName("message")[0].innerHTML = message;
                    }
                    button.getElementsByClassName("message")[0].classList.remove("hide");
                    button.getElementsByClassName("message")[0].classList.add("show");
                    cHandler("你不知道", currentSum, function(message, currentSum, button) {
                        button.getElementsByClassName("message")[0].innerHTML = message;
                        button.getElementsByClassName("unread")[0].innerHTML = "X";
                    });
                }
                // if (document.getElementsByClassName("completed").length == 5) {
                //     document.getElementById("sum").innerHTML = currentSum;
                //     showTheSum();
                // }
            }
        };
    }(button, errHandler);
    var span = button.getElementsByClassName("unread")[0];
    span.innerHTML = "...";
    span.classList.remove("hide");
    span.classList.add("show");
    xmlHttp.open("GET", "/", true);
    xmlHttp.send(null);
}

function cHandler(message, currentSum, errHandler) {
    var button = document.getElementsByClassName("button")[2];
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp == null) alert('XMLHTTP not supported.');
    xmlHttp.onreadystatechange = function (button, errHandler) {
        return function() {
            if (xmlHttp.readyState == 4 && button.getElementsByClassName("unread")[0].classList.contains("show")) {
                if (xmlHttp.status == 200) {
                    button.classList.add("completed");
                    var result = [];
                    var err = Math.round(Math.random());
                    if (err)  {
                        errHandler("你知道", currentSum, button);
                    } else {
                        currentSum += parseInt(xmlHttp.responseText);
                        button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
                        button.getElementsByClassName("message")[0].innerHTML = message;
                    }
                    button.getElementsByClassName("message")[0].classList.remove("hide");
                    button.getElementsByClassName("message")[0].classList.add("show");
                    dHandler("他不知道", currentSum, function(message, currentSum, button) {
                        button.getElementsByClassName("message")[0].innerHTML = message;
                        button.getElementsByClassName("unread")[0].innerHTML = "X";
                    });
                }
                // if (document.getElementsByClassName("completed").length == 5) {
                //     document.getElementById("sum").innerHTML = currentSum;
                //     showTheSum();
                // }
            }
        };
    }(button, errHandler);
    var span = button.getElementsByClassName("unread")[0];
    span.innerHTML = "...";
    span.classList.remove("hide");
    span.classList.add("show");
    xmlHttp.open("GET", "/", true);
    xmlHttp.send(null);
}

function dHandler(message, currentSum, errHandler) {
    var button = document.getElementsByClassName("button")[3];
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp == null) alert('XMLHTTP not supported.');
    xmlHttp.onreadystatechange = function (button, errHandler) {
        return function() {
            if (xmlHttp.readyState == 4 && button.getElementsByClassName("unread")[0].classList.contains("show")) {
                if (xmlHttp.status == 200) {
                    button.classList.add("completed");
                    var result = [];
                    var err = Math.round(Math.random());
                    if (err)  {
                        errHandler("他知道", currentSum, button);
                    } else {
                        currentSum += parseInt(xmlHttp.responseText);
                        button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
                        button.getElementsByClassName("message")[0].innerHTML = message;
                    }
                    button.getElementsByClassName("message")[0].classList.remove("hide");
                    button.getElementsByClassName("message")[0].classList.add("show");
                    eHandler("才怪", currentSum, function(message, currentSum, button) {
                        button.getElementsByClassName("message")[0].innerHTML = message;
                        button.getElementsByClassName("unread")[0].innerHTML = "X";
                    });
                }
                // if (document.getElementsByClassName("completed").length == 5) {
                //     document.getElementById("sum").innerHTML = currentSum;
                //     showTheSum();
                // }
            }
        };
    }(button, errHandler);
    var span = button.getElementsByClassName("unread")[0];
    span.innerHTML = "...";
    span.classList.remove("hide");
    span.classList.add("show");
    xmlHttp.open("GET", "/", true);
    xmlHttp.send(null);
}

function eHandler(message, currentSum, errHandler) {
    var button = document.getElementsByClassName("button")[4];
    var xmlHttp = new XMLHttpRequest();
    if (xmlHttp == null) alert('XMLHTTP not supported.');
    xmlHttp.onreadystatechange = function (button, errHandler) {
        return function() {
            if (xmlHttp.readyState == 4 && button.getElementsByClassName("unread")[0].classList.contains("show")) {
                if (xmlHttp.status == 200) {
                    button.classList.add("completed");
                    var result = [];
                    var err = Math.round(Math.random());
                    if (err)  {
                        errHandler("才怪...个锤子", currentSum, button);
                    } else {
                        currentSum += parseInt(xmlHttp.responseText);
                        button.getElementsByClassName("unread")[0].innerHTML = xmlHttp.responseText;
                        button.getElementsByClassName("message")[0].innerHTML = message;
                    }
                    button.getElementsByClassName("message")[0].classList.remove("hide");
                    button.getElementsByClassName("message")[0].classList.add("show");
                    bubbleHandler("才怪", currentSum);
                }
                // if (document.getElementsByClassName("completed").length == 5) {
                //     document.getElementById("sum").innerHTML = currentSum;
                //     showTheSum();
                // }
            }
        };
    }(button, errHandler);
    var span = button.getElementsByClassName("unread")[0];
    span.innerHTML = "...";
    span.classList.remove("hide");
    span.classList.add("show");
    xmlHttp.open("GET", "/", true);
    xmlHttp.send(null);
}

function bubbleHandler(message, currentSum) {
    var bubble = document.getElementById("sum").innerHTML = currentSum;
    document.getElementById("lastMessage").innerHTML = "楼主异步调用战斗力感人，目测不超过" + currentSum;
    document.getElementById("lastMessage").classList.remove("disappear");
    showTheSum();
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
        aHandler("这是个天大的秘密", 0, function(message, currentSum, button) {
            button.getElementsByClassName("message")[0].innerHTML = message;
            button.getElementsByClassName("unread")[0].innerHTML = "X";
        });
    });
    document.getElementById("button").addEventListener("mouseleave", init);
}
// IPL Bot Working
var messages = [],
    lastUserMessage = "",
    botMessage = "",
    botName = 'IPL Bot',
    talking = true;

function newEntry() {
    if (document.getElementById("chatbox").value != "") {
        lastUserMessage = document.getElementById("chatbox").value;
        document.getElementById("chatbox").value = "";
        messages.push(lastUserMessage);
        var text = {
            text: lastUserMessage,
        };
        var xhr = new XMLHttpRequest();
        xhr.open(
            "POST",
            "http://716234c3c24d.ngrok.io/message",
            true
        );
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(text));
        xhr.onload = function () {
            if (this.status == 200) {
                botMessage = this.responseText;
                messages.push("<b>" + botName + ":</b> " + botMessage);
                console.log("Success!");
                Speech(botMessage);
                for (var i = 1; i < 8; i++) {
                    if (messages[messages.length - i])
                        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
                }
            }
            if (this.status == 400) {
                console.log("400!");
            }
            else {
                console.log("Error");
            }
        }
    }
}

// Text to Speech
function Speech(say) {
    if ('speechSynthesis' in window && talking) {
        var utterance = new SpeechSynthesisUtterance(say);
        speechSynthesis.speak(utterance);
    }
}

// New entry
document.onkeypress = keyPress;
function keyPress(e) {
    var x = e || window.event;
    var key = (x.keyCode || x.which);
    if (key == 13 || key == 3) {
        newEntry();
    }
}

function placeHolder() {
    document.getElementById("chatbox").placeholder = "";
}
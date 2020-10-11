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
        xhr.open("POST", "https://716234c3c24d.ngrok.io/message");
        xhr.send(JSON.stringify(text));
        xhr.onload = function () {
            console.log(this.responseText);
            if (this.status == 200) {
                console.log("Success!");
                console.log(this.responseText);
                botMessage1 = JSON.parse(this.responseText);
                console.log(botMessage1);
                botMessage = botMessage1.message;
                messages.push("<b>" + botName + ":</b> " + botMessage);
                Speech(botMessage);
                for (var i = 1; i < 8; i++) {
                    if (messages[messages.length - i])
                        document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
                }
            }
            if (this.status == 400) {
                console.log(this.responseText);
                console.log("400!");
            }
            else {
                console.log(this.responseText);
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
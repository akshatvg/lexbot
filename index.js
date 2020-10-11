// IPL Bot Working
var messages = [],
    lastUserMessage = "",
    botMessage = "",
    botName = 'IPL Bot',
    talking = true;

// Hey
function chatbotResponse() {
    talking = true;
    botMessage = "I didn't get you. Could you please repeat?";

    if (lastUserMessage === 'hi' || lastUserMessage == 'hello') {
        const hi = ['hi', 'howdy', 'hello']
        botMessage = hi[Math.floor(Math.random() * (hi.length))];;
    }
}

function newEntry() {
    if (document.getElementById("chatbox").value != "") {
        lastUserMessage = document.getElementById("chatbox").value;
        document.getElementById("chatbox").value = "";
        messages.push(lastUserMessage);
        chatbotResponse();
        messages.push("<b>" + botName + ":</b> " + botMessage);
        Speech(botMessage);
        for (var i = 1; i < 8; i++) {
            if (messages[messages.length - i])
                document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
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
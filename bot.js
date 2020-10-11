// IPL Bot Working
counter = 0;
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
        if (counter == 0) {
            botMessage = "Please specify the season";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 1) {
            botMessage = "Chennai Super Kings.";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 2) {
            botMessage = "Mumbai";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 3) {
            botMessage = "Wankhede Stadium";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 4) {
            botMessage = "Chennai Super Kings.";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 5) {
            botMessage = "Sorry couldnt understand message";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 6) {
            botMessage = "bat";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 7) {
            botMessage = "6";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
        }
        else if (counter == 8) {
            botMessage = "A Nehra";
            messages.push("<b>" + botName + ":</b> " + botMessage);
            console.log("Success!");
            Speech(botMessage);
            for (var i = 1; i < 8; i++) {
                if (messages[messages.length - i])
                    document.getElementById("chatlog" + i).innerHTML = messages[messages.length - i];
            }
            counter++;
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
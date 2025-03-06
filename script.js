const chatBox = document.getElementById("chat-box");
const optionsContainer = document.getElementById("options-container");

const messages = [
    { sender: "npc", text: "Something bad is about to happen." },
    { sender: "user", options: ["What?", "Who are you?", "How do you know that?"] },
    { sender: "npc", responses: ["You'll receive a call soon..."] },
    { sender: "npc", text: "Do you trust me?" },
    { sender: "user", options: ["How am I supposed to trust you?", "Who are you again?", "I just think you're mad crazy..."] },
    { sender: "npc", responses: ["Mh...I understand. But don't say I did not warn you!"] },
];

let index = 0;

function addMessage(sender, text) {
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions(options, responses) {
    optionsContainer.innerHTML = "";
    options.forEach((option, i) => {
        const button = document.createElement("div");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => {
            addMessage("user", option);
            optionsContainer.innerHTML = "";
            setTimeout(() => {
                addMessage("npc", responses[i]);
                index++;
                loadNextMessage();
            }, 1000);
        };
        optionsContainer.appendChild(button);
    });
}

function loadNextMessage() {
    if (index >= messages.length) return;
    const msg = messages[index];

    if (msg.sender === "npc") {
        setTimeout(() => {
            addMessage("npc", msg.text);
            index++;
            loadNextMessage();
        }, 1000);
    } else if (msg.sender === "user") {
        setTimeout(() => {
            showOptions(msg.options, messages[index + 1].responses);
            index++;
        }, 1000);
    }
}

loadNextMessage();

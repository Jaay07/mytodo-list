if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    let taskinput = document.querySelector('#taskinput');
    let List = document.querySelector("#List");

    taskinput.addEventListener('focus', () => {

        recognition.start();
    });

    recognition.onresult = (event) => {
        let translate = event.results[0][0].transcript;
        taskinput.value = translate;
        addtask();

    }

    function addtask() {
        let tasktext = taskinput.value.trim();
        if (tasktext !== "") {
            let taskitem = document.createElement("li");
            taskitem.innerHTML = `<span>${tasktext}</span><button onclick="deletetask(this)"class="deleteBtn">Delete</button>`;
            List.appendChild(taskitem);
            taskinputvalue = "";
        }
        recognition.onend = () => {
            recognition.stop();
        }

    }
    function deletetask(e) {
        let liParent = e.parentNode;
        if (window.confirm("Have this task been done?")) {
            List.removeChild(liParent);
        }
    }

}
else {
    alert("Your browser does not support voice recognition!");
}
const user_input    = document.getElementById("terminal-input");
const div_output    = document.getElementById("terminal-output");
const array_command = [""];
let command_index   = 0;
let current_path    = "~";
let data            = null;

async function init() {
    
    const response = await fetch("/portfolio/data/terminal_commands.json");
    data = await response.json();
    startTerminal();
}

function startTerminal() {

    function getCurrentNode() {

        if (current_path === "~") {
            return data.filesystem["~"];
        }
        const parts = current_path.replace("~/", "").split("/");
        let node = data.filesystem["~"];
        for (const part of parts) {
            node = node[part];
        }
        return node;
    }

    const commands = {

        ls : () => {
            const node = getCurrentNode();
            if (!node) {
                return "Error : pas trouvable";
            }
            return 
        }
    }
    
    user_input.addEventListener("keydown", function(event) {
        
        if(event.key === "ArrowRight") {

            console.log();






















        }

        if(event.key === "Enter") {
            
            const div_command_line = document.createElement("div");
            div_command_line.innerHTML = "$ ethanbernon ~" + user_input.value;
            div_output.appendChild(div_command_line);
    
            if (user_input.value != "") {
    
                array_command.push(user_input.value);
                command_index = array_command.length;
            }
            if (user_input.value === "clear") {
    
                div_output.innerHTML = "";
            }
    
            const command_text = user_input.value.trim();
            const text = data[command_text] ?? "Command not found: " + command_text + ". Type 'help' for available commands";
    
            const div_result = document.createElement("div");
            div_result.innerHTML = text;
            div_output.appendChild(div_result);
            user_input.value = "";
        }
        if(event.key === "ArrowUp") {
    
            if(command_index > 0) {
    
                command_index--;
            }
            user_input.value = array_command[command_index];
        }
        if(event.key === "ArrowDown") {
    
            if(command_index < array_command.length - 1) {
    
                command_index++;
                user_input.value = array_command[command_index];
            }
            else {
                user_input.value = "";
            }
        }
    
        var objDiv = document.getElementById("terminal-text");
        objDiv.scrollTop = objDiv.scrollHeight;
    });
}
init();

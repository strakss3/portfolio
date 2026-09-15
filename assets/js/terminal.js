const user_input    = document.getElementById("terminal-input");
const div_output    = document.getElementById("terminal-output");
const div_text      = document.getElementById("terminal-text");
const div_terminal  = document.getElementById("terminal");
const array_command = ["", ""];
let command_index   = 0;
let current_path    = "~";
let data            = null;

async function init() {

    const response = await fetch("/portfolio/data/terminal_commands.json");
    data = await response.json();
    startTerminal();
}

function startTerminal() {

    function isDir(node) {
    
        return typeof node === 'object' && node !== null;
    }

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

        ls: () => {

            const node = getCurrentNode();
            let files = "";
            for(let [key, val] of Object.entries(node)) {
                
                files += key + "&nbsp";
            }
            return files;
        },

        cat: (args) => {

            if (!args[0]) {
                
                return "cat: missing file operand";
            }
            const node = getCurrentNode();
            const target = node[args[0]];
            if (target === undefined || isDir(target)) {

                return `cat: ${args[0]}: no such file `;
            }
            return target;
        },

        cd: (args) => {

            if (!args[0] || args[0] === '~') {
                
                current_path = '~';
                document.getElementById("terminal-header").innerHTML = `ethanbernon@portfolio:${current_path}`;
                return '';
            }
            if (args[0] === '..') {
                if (current_path === '~') {
                
                    return '';
                }
                const parts = current_path.split('/');
                parts.pop();
                current_path = parts.join('/');
                document.getElementById("terminal-header").innerHTML = `ethanbernon@portfolio:${current_path}`;
                return '';
            }
            const node = getCurrentNode();
            const target = node[args[0]];
            if (target === undefined || !isDir(target)) {
                
                return `cd: ${args[0]}: no such directory`;
            }
            current_path = `${current_path}/${args[0]}`;
            document.getElementById("terminal-header").innerHTML = `ethanbernon@portfolio:${current_path}`;
            return "";
        },

        clear : () => {

            div_output.innerHTML = "";
            return null;
        },

        pwd : () => {

            return current_path;
        }
    }

    function parseCommand(input) {

        const parts = input.trim().split(/\s+/);
        const cmd   = parts[0];
        const args  = parts.slice(1);

        if (cmd === "") {

            return null;
        }
        if (commands[cmd]) {

            return commands[cmd](args);
        }
        if (data.static[cmd]) {

            return data.static[cmd];
        }
        return `Command not found: ${cmd} Type 'help' for available commands`;
    }
    
    user_input.addEventListener("keydown", function(event) {
        
        if(event.key === "Enter") {

            const input = user_input.value.trim();
            const text = parseCommand(input);
            
            array_command.splice(array_command.length-1, 0, input);
            command_index = array_command.length-1;

            if (input !== "clear") {
                
                const div_command_line = document.createElement("div");
                div_command_line.innerHTML = `$ ethanbernon ~ ${input}`;
                div_output.appendChild(div_command_line);
                
                const div_result = document.createElement("div");
                div_result.innerHTML = text;
                div_output.appendChild(div_result);
            }
            user_input.value = "";
            
        }
        if(event.key === "ArrowUp") {
    
            if(command_index > 0) {
                
                command_index--;
            }
            user_input.value = array_command[command_index];
        }
        if(event.key === "ArrowDown") {
            
            if(command_index < array_command.length-1) {
                
                command_index++;
            }
            user_input.value = array_command[command_index];
        }
    
        div_text.scrollTop = div_text.scrollHeight;
    })
    
    div_terminal.addEventListener("click", function(event) {
        user_input.focus();
    });
}
init();

<!DOCTYPE html>
<div class="terminal jetbrains-mono">
    <div id="terminal-header">ethanbernon@portfolio:~</div>
    <div id="terminal-text">
        <div id="terminal-output">
            Welcome to Ethan's Portfolio Terminal<br>
            Type 'help' for available commands.
        </div>
        <span class='purple'>$ </span><span class='magenta'>ethanbernon <span class='gray'>~ </span></span><input type="text" id="terminal-input" class="jetbrains-mono" autofocus>
    </div>
</div>

<script>
        const user_input = document.getElementById("terminal-input");
        const array_command = new Array("");
        let command_index = 0;

        <?php $array_json = json_decode(file_get_contents("../data/terminal_commands.json"), true)?>
        const array_json = <?= json_encode($array_json, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT) ?>;

        user_input.addEventListener("keydown", function(event) {
            
            if(event.key === "Enter") {
                
                const command_line = document.createElement("div");
                command_line.innerHTML = "<span class='purple'>$ </span><span class='magenta'>ethanbernon </span><span class='gray'>~ </span>" + user_input.value;
                document.getElementById("terminal-output").appendChild(command_line);

                if (user_input.value != "") {

                    array_command.push(user_input.value);
                    command_index = array_command.length;
                }
                if (user_input.value === "clear") {

                    document.getElementById("terminal-output").innerHTML = "";
                }
                else if (user_input.value === "open") {

                    window.open("https://github.com/strakss3", "_blank", "noopener,noreferrer");
                }

                const command_text = user_input.value.trim();
                const text = array_json[command_text] ?? "Command not found: " + command_text + ". Type 'help' for available commands";

                const result = document.createElement("div");
                result.innerHTML = text;
                document.getElementById("terminal-output").appendChild(result);
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
</script>
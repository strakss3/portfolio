<!DOCTYPE html>
<div class="terminal">
    <div>ethanbernon@portfolio:~</div>
    <div id="terminal-output">
        bienvenue dans le terminal
    </div>
    <span>$ ethanbernon ~ </span><input type="text" id="terminal-input" autofocus>
</div>

<script>
        const input = document.getElementById("terminal-input");
        input.addEventListener("keydown", function(event) {
            
            if(event.key === "Enter") {
                
                const command = document.createElement("div");
                command.innerHTML = "$ ethanbernon ~ " + input.value;
                document.getElementById("terminal-output").appendChild(command);

                switch(input.value) {
                    case "help" :
                        text = "on peit le help";
                        break;

                    case "clear" :
                        text = "bienvenue dans le terminal";
                        document.getElementById("terminal-output").innerHTML = "";
                        break;
                    
                    case "" :
                        text = "";
                        break;
                    
                    default :
                        text = input.value + " n'est pas une commande valide.";
                        break;
                }

                const result = document.createElement("div");
                result.innerHTML = text;
                document.getElementById("terminal-output").appendChild(result);
                input.value = "";
            }
        });
</script>
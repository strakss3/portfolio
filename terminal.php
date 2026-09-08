<!DOCTYPE html>
<div class="terminal jetbrains-mono">
    <div>ethanbernon@portfolio:~</div>
    <div id="terminal-text">
        <div id="terminal-output">
            bienvenue dans le terminal
        </div>
        <span>$ ethanbernon ~ </span><input type="text" id="terminal-input" class="jetbrains-mono" autofocus>
    </div>
</div>

<script>
        const input = document.getElementById("terminal-input");
        const array_input = new Array("");
        let index = 0;

        input.addEventListener("keydown", function(event) {
            
            if(event.key === "Enter") {
                
                const command = document.createElement("div");
                command.innerHTML = "$ ethanbernon ~ " + input.value;
                document.getElementById("terminal-output").appendChild(command);

                switch(input.value) {
                    case "help" :
                        array_input.push(input.value);
                        index = array_input.length;
                        text = "Liste des commandes disponibles :<br>"+
                                "help - affiche l'aide pour les commandes<br>"+
                                "cat &lt;file&gt; - ouvre...<br>"+
                                "clear - efface le terminal";
                        break;

                    case "clear" :
                        array_input.push(input.value);
                        index = array_input.length;
                        text = "bienvenue dans le terminal";
                        document.getElementById("terminal-output").innerHTML = "";
                        break;
                    
                    case "" :
                        text = "";
                        break;
                    
                    default :
                        array_input.push(input.value);
                        index = array_input.length;
                        text = input.value + " n'est pas une commande valide.";
                        break;
                }

                const result = document.createElement("div");
                result.innerHTML = text;
                document.getElementById("terminal-output").appendChild(result);
                input.value = "";
                
                var objDiv = document.getElementById("terminal-text");
                objDiv.scrollTop = objDiv.scrollHeight;
            }
            if(event.key === "ArrowUp") {

                if(index > 0) {

                    index--;
                }
                input.value = array_input[index];
            }
            if(event.key === "ArrowDown") {

                if(index < array_input.length - 1) {

                    index++;
                    input.value = array_input[index];
                }
                else {
                    input.value = "";
                }
            }
        });
</script>
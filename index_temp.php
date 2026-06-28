<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Ethan's Portfolio</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="icon.ico">
    <link rel="stylesheet" href="./styles.css">


</head>
<body>
    <header>
        <h1>Welcome to Ethan's Portfolio</h1>
    </header>
    <main>
        <p>
            ABOUT ME
            PROJETCS
            SKILLS
            CONTACT
        </p>

        <div class="terminal">
            <div>ethanbernon@portfolio:~</div>
            <div id="terminal-output">
                bienvenue dans le terminal
            </div>
            <span>$ ethanbernon ~ </span><input type="text" id="terminal-input" autofocus>
        </div>
    </main>
    <br><br><br>
    <footer>
        <div>2026 licence</div>
    </footer>

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
</body>
</html>
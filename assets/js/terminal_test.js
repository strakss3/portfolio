const user_input   = document.getElementById('terminal-input');
const output       = document.getElementById('terminal-output');
const array_command = [''];
let command_index  = 0;
let currentPath    = '~';
let data           = null; // stockage global du JSON

// ─── Chargement du JSON puis démarrage ───────────────────────────
async function init() {
    const response = await fetch('/portfolio/data/terminal_commands.json');
    data = await response.json();
    // maintenant data est chargé, on active le terminal
    startTerminal();
}

// ─── Tout le code du terminal est ici ────────────────────────────
function startTerminal() {

    function isDir(node) {
        return typeof node === 'object' && node !== null;
    }

    function getCurrentNode() {
        if (currentPath === '~') return data.filesystem['~'];
        const parts = currentPath.replace('~/', '').split('/');
        let node = data.filesystem['~'];
        for (const part of parts) {
            if (!node[part]) return null;
            node = node[part];
        }
        return node;
    }

    function updatePrompt() {
        document.getElementById('terminal-header').textContent =
            `ethanbernon@portfolio:${currentPath}`;
    }

    const commands = {

        ls: () => {
            const node = getCurrentNode();
            if (!node) return 'Erreur : dossier introuvable.';
            return Object.entries(node)
                .map(([name, val]) => isDir(val)
                    ? `<span class='magenta'>${name}/</span>`
                    : name)
                .join('&nbsp;&nbsp;');
        },

        cat: (args) => {
            if (!args[0]) return 'Usage : cat &lt;fichier&gt;';
            const node = getCurrentNode();
            if (!node) return 'Erreur : dossier introuvable.';
            const target = node[args[0]];
            if (target === undefined) return `cat: ${args[0]}: No such file or directory`;
            if (isDir(target))        return `cat: ${args[0]}: Is a directory`;
            return target;
        },

        cd: (args) => {
            if (!args[0] || args[0] === '~') { currentPath = '~'; return ''; }
            if (args[0] === '..') {
                if (currentPath === '~') return '';
                const parts = currentPath.split('/');
                parts.pop();
                currentPath = parts.join('/');
                return '';
            }
            const node = getCurrentNode();
            if (!node) return 'Erreur : dossier introuvable.';
            const target = node[args[0]];
            if (target === undefined) return `cd: ${args[0]}: No such file or directory`;
            if (!isDir(target))       return `cd: ${args[0]}: Not a directory`;
            currentPath = currentPath === '~'
                ? `~/${args[0]}`
                : `${currentPath}/${args[0]}`;
            return '';
        },

        clear: () => {
            output.innerHTML = '';
            return null;
        },

        open: () => {
            window.open('https://github.com/strakss3', '_blank', 'noopener,noreferrer');
            return data.static['open'];
        }
    };

    function parseCommand(input) {
        const parts = input.trim().split(/\s+/);
        const cmd   = parts[0];
        const args  = parts.slice(1);

        if (cmd === '') return null;
        if (commands[cmd])      return commands[cmd](args);
        if (data.static[cmd])   return data.static[cmd];
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    // ─── Listener keydown ────────────────────────────────────────
    user_input.addEventListener('keydown', function(event) {

        if (event.key === 'Enter') {
            const input = user_input.value.trim();

            // Afficher la ligne de commande
            const command_line = document.createElement('div');
            command_line.innerHTML =
                `<span class='purple'>$ </span>` +
                `<span class='magenta'>ethanbernon </span>` +
                `<span class='gray'>${currentPath} </span>` +
                input;
            output.appendChild(command_line);

            // Historique
            if (input !== '') {
                array_command.push(input);
                command_index = array_command.length;
            }

            // Exécuter et afficher le résultat
            const result = parseCommand(input);
            if (result !== null && result !== '') {
                const result_div = document.createElement('div');
                result_div.innerHTML = result;
                output.appendChild(result_div);
            }

            updatePrompt();
            user_input.value = '';
        }

        if (event.key === 'ArrowUp') {
            if (command_index > 0) command_index--;
            user_input.value = array_command[command_index];
        }

        if (event.key === 'ArrowDown') {
            if (command_index < array_command.length - 1) {
                command_index++;
                user_input.value = array_command[command_index];
            } else {
                user_input.value = '';
            }
        }

        const objDiv = document.getElementById('terminal-text');
        objDiv.scrollTop = objDiv.scrollHeight;
    });
}

// ─── Démarrage ───────────────────────────────────────────────────
init();
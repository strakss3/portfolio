# Portfolio — Ethan Bernon

A personal portfolio website built with PHP, CSS, JavaScript and Three.js, featuring an interactive 3D background and a custom terminal.

🔗 *url — coming soon*

---

![Portfolio Preview](assets/screenshot.png)
*Replace this line with your screenshot once available*

---

## Features

- **Interactive 3D background** — Particle system built with Three.js, reacting to mouse movements. Particles can converge into shapes on user interaction.
- **Interactive terminal** — Custom terminal emulator built in JavaScript, supporting a set of predefined commands to navigate the portfolio.
- **Multi-page PHP site** — PHP-based structure with shared includes (header, footer, nav) and CSS transitions between pages.
- **3D Blender model** — Low poly scene modeled in Blender, exported as `.glb` and rendered in real time via Three.js with toon shading and outline effects.

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | PHP |
| Frontend | HTML, CSS, JavaScript |
| 3D Rendering | Three.js |
| 3D Modeling | Blender (.glb export) |

## Project Structure

```
portfolio/
├── index.php
├── pages/
│   ├── about.php
│   ├── terminal.php
│   └── egg.php
├── includes/
│   ├── header.php
│   ├── footer.php
│   └── nav.php
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── background.js
│   │   ├── terminal.js
│   │   └── transitions.js
│   ├── models/
│   │   └── modele.glb
│   └── icons/
│       └── icon.ico
└── data/
    └── terminal_commands.json
```

## Getting Started

### Prerequisites

- [XAMPP](https://www.apachefriends.org/) (Apache + PHP)

### Installation

1. Clone the repository into your XAMPP `htdocs` folder:
   ```bash
   git clone https://github.com/strakss3/portfolio.git
   ```

2. Start **Apache** in the XAMPP Control Panel.

3. Open your browser and go to:
   ```
   http://localhost/portfolio/
   ```

## License

© 2026 Ethan Bernon — All rights reserved.
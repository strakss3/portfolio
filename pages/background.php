<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Test Three.js</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            background-color: #08080f;
        }

        canvas {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 0;
        }

        .content {

            position: relative;
            z-index: 1;
        }
    </style>
</head>
<body>
    <script type="importmap">
    {
        "imports": {
            "three": "https://unpkg.com/three@0.160.0/build/three.module.js"
        }
    }
    </script>
    <script type="module" src="../js/background.js"></script>
    <a href="index.php" class="content"><button>Back to main menu</button></a><br>
    <button id="btn-circle" class="content">Cercle</button>
    <button id="btn-wave" class="content">Vague</button>
    <button id="btn-reset" class="content">Libre</button>
</body>
</html>
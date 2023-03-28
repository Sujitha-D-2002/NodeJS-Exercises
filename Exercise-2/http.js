//Create an HTTP Server using the core `HTTP` module
let http = require('http');
let fs = require('fs');

http.createServer((req, res, err) => {
    if (req.url != "/favicon.ico") {
        console.log("Server get started in port number 3000..!!");

        //Store the attached `color_ palette.json` in your filesystem
        let colorCodeFile = "./color_ palette.json";
        let colorCodes = fs.readFileSync(colorCodeFile, 'utf-8');

        //Randomize the color palette and take 5 colors
        randomColorCodes = randomColorPaletteGenerate(JSON.parse(colorCodes));
        function randomColorPaletteGenerate(arrayColorPalette) {
            for (let i = arrayColorPalette.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arrayColorPalette[i], arrayColorPalette[j]] = [arrayColorPalette[j], arrayColorPalette[i]];
            }
            return arrayColorPalette;
        }
        res.write(JSON.stringify(randomColorCodes.slice(0, 5)));
    }
    res.end();
}).listen(3000);
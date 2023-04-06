//Create an HTTP Server using the core `HTTP` module
const http = require('http');
const fs = require('fs');

const {Random}=require('random-js');
const random=new Random();


http.createServer((req, res, err) => {
    if (req.url != "/favicon.ico") {
        res.write("\nServer get started in port number 3000..!!");

        //Store the attached `color_ palette.json` in your filesystem
        let colorCodeFile = "./color_ palette.json";
        let colorCodes = fs.readFileSync(colorCodeFile, 'utf-8');

        //Randomize the color palette and take 5 colors
        randomColorCodes = randomColorPaletteGenerate(JSON.parse(colorCodes));
        function randomColorPaletteGenerate(arrayColorPalette) {
            for (let i = 0; i < 5; i++) {
               let value=random.integer(150,185);
               for(let temp in arrayColorPalette){
                if(value==arrayColorPalette[temp].id){
                    console.log(arrayColorPalette[temp]);
                }
               }
            }
            
        }
    }
    res.end();
}).listen(3100);
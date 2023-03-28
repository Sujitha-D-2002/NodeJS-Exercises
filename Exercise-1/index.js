let fs = require('fs');

let colorCodeFile = "./color_ palette.json";
//Store the attached `color_ palette.json` in your filesystem
let colorCodes = fs.readFileSync(colorCodeFile, 'utf-8');

randomColorCodes = randomColorPaletteGenerate(JSON.parse(colorCodes));

//Randomize the color palette and take 5 colors
function randomColorPaletteGenerate(arrayColorPalette) {
    for (let i = arrayColorPalette.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayColorPalette[i], arrayColorPalette[j]] = [arrayColorPalette[j], arrayColorPalette[i]];
    }
    return arrayColorPalette;
}
console.log(randomColorCodes.slice(0, 5));
let data = JSON.stringify(randomColorCodes.slice(0, 5));

// write the randomized 5 colors into json file
fs.writeFile("randomized_color_ palette.json", data, (err) => {
    if (err)
        console.log(err);
    else {
        console.log("File written successfully\n");
        //Read the newly created `randomized_color_ palette.json`
        console.log(fs.readFileSync("randomized_color_ palette.json", "utf8"));
    }
});
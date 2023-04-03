const fs = require('fs');
const fromJSON = undefined;
const colorCodeFile = "./color_ palette.json";
let randomNumArray;
//Store the attached `color_ palette.json` in your filesystem
const colorCodes = function async(colorCodeFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(colorCodeFile, 'utf-8', function (err, data) {
            if (err) {
                reject("File not found..!!!");
            }
            else {
                resolve(data);
            }
        });
    }).then(data => {
        return data;
    }).catch(err => {
        console.log(err);
    })
}
colorPickingFunction();
async function colorPickingFunction() {
    let randomColorCodes = await colorCodes(colorCodeFile);
    if (randomColorCodes == '[]') {
        console.log("No data..!!!");
    }
    else {
        randomColorCode = JSON.parse(randomColorCodes);
        if (randomColorCode.length < 5) {
            console.log("Less data found..!!!");
        }
        else {
            randomNumArray = [0, 1, 2, 3, 4];
            randomColorPaletteGenerate(randomColorCode);
            const data = JSON.stringify(randomColorCode.slice(0, 5));
            // write the randomized 5 colors into json file
            fs.writeFileSync("randomized_color_ palette.json", data);
            //Read the newly created `randomized_color_ palette.json`
            try {
                let color = fs.readFileSync("randomized_color_ palette.json", "utf8");
                console.log(color);
            }
            catch {
                console.log("File not found to write data..!!");
            }
        }
    }


}
//Randomize the color palette and take 5 colors
function randomColorPaletteGenerate(arrayColorPalette) {
    for (let i = arrayColorPalette.length - 1, j = 0; i > 0 && j < 5; i--, j++) {
        k = Math.floor(Math.random() * (i + 1));
        randomNumArray[j] = k;
    }
    for (let i = 0; i < 5; i++) {
        arrayColorPalette[i] = arrayColorPalette[randomNumArray[i]];
    }
    return arrayColorPalette;
}


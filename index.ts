import * as Path from "path";
import * as Fs from "fs";

import SnippetVariant from "./src/script/SnippetVariant";

const directoryPath = Path.join(__dirname, 'src/components/');

const SnippetVariants = new Array<SnippetVariant>();
const CssVariant = new SnippetVariant('-css.code-snippets');
const JsVariant = new SnippetVariant('-js.code-snippets');

SnippetVariants.push(CssVariant);
SnippetVariants.push(JsVariant);

// Read all files in components
Fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    // For each file inside components
    files.forEach(function (file) {
        let rawComponent = Fs.readFileSync(directoryPath + file);
        // We can get JSON component
        let component = JSON.parse(rawComponent.toString());

        let count = 0;
        let exit = false;
        while (!exit && count < SnippetVariants.length) {
            // If is the same extension...
            if (file.includes(SnippetVariants[count].Extension)) {
                // We added to his variant and exit the loop
                SnippetVariants[count].addJsonFileSnippet(component);

                exit = true;
            }

            count++;
        }
    });

    // For each Variant...
    for (const key in SnippetVariants) {
        if (Object.prototype.hasOwnProperty.call(SnippetVariants, key)) {
            const element = SnippetVariants[key];

            // We write a file with all variant snippets
            let snippetOutput = `snippets/fomantic${element.Extension}`
            Fs.writeFile(snippetOutput, JSON.stringify(element.Snippets, null, 2), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Snippets saved to " + snippetOutput);
                }
            });
        }
    }
});
'use strict';

const path = require('path');
const fs = require('fs');

function extend(dest, src) {
    for (var key in src) {
        dest[key] = src[key];
    }

    return dest;
}

const directoryPath = path.join(__dirname, 'src/components/');

var cssSnippets = {}
var jsSnippets = {}

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(function (file) {
        let rawComponent;
        let component;
        if (file.includes('-css.code-snippets')) {
            rawComponent = fs.readFileSync(directoryPath + file);
            component = JSON.parse(rawComponent);

            extend(cssSnippets, component);
        }
        else if (file.includes('-js.code-snippets')) {
            rawComponent = fs.readFileSync(directoryPath + file);
            component = JSON.parse(rawComponent);

            extend(jsSnippets, component);
        }
    });

    let cssSnippetsOutput = 'snippets/fomantic-css.code-snippets';
    fs.writeFile(cssSnippetsOutput, JSON.stringify(cssSnippets, null, 2), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("CSS snippets saved to " + cssSnippetsOutput);
        }
    });

    let jsSnippetsOutput = 'snippets/fomantic-js.code-snippets';
    fs.writeFile(jsSnippetsOutput, JSON.stringify(jsSnippets, null, 2), function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("JS snippets saved to " + cssSnippetsOutput);
        }
    });
});

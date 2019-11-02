const lineReader = require('line-reader');
const fs = require('fs');

var myArgs = process.argv.slice(2); //.. read cmd line args
var filePath = myArgs[0].split('='); // .. file=c:/path/to/file.txt
var fileName = filePath[1].substring(filePath.lastIndexOf('/') + 1);

lineReader.eachLine(filePath[1], function(line) {
  const lastChar = line[line.length - 1]; //store last character
  let modifiedLine = line.substring(0, (line.length - 1));
  modifiedLine = modifiedLine.replace(/(?<!,)"(?!,)/igm, "|"); // .. ubstitutes Double Quotes character with a vertical pipe ('|') when the Double Quotes character is not preceded by a comma and is not followed by a comma either. 

  // .. append modified text.
  fs.appendFile(`${fileName}-output.txt`, `\r\n${modifiedLine}${lastChar}`, function(err) {
    if (err) return console.log(err);
  });
});
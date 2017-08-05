var Word = require("../main.js");
var Table = require('cli-table2');


let kelime = new Word(process.argv.slice(2));

kelime.Translate(function(data) {
    if (data.Situation.IsFound == true) {
        if (data.Language==="English" || data.Language==="Both") {
            var tableEn2De = new Table({head: ["English", "German"]})           
            data.Translations.En2De.forEach(function(datax) {
                tableEn2De.push([datax.TermENG, datax.TermDE]);
            });
            console.log(tableEn2De.toString());
        } 
        if (data.Language==="German" || data.Language==="Both") {
            var tableDe2En = new Table({head: ["German", "English"]})           
            data.Translations.De2En.forEach(function(datax) {
                tableDe2En.push([datax.TermDE, datax.TermENG]);
            });
            console.log(tableDe2En.toString());
        }         
    } else {
        if (data.Situation.Suggestion == true) {
            console.log("No match found but suggestions found.");
            var suggs = new Table({head: ["Suggestions"]});
            console.log(suggs.toString());
            data.Suggestions.forEach(function(datax) {
                console.log(datax);
            });
            
        } else {
            console.log("No match found unfortunately no suggestions found to.")
        }
    }
});
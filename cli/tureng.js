var Tureng = require("../main.js");
var Table = require('cli-table2');
var word = "";
var lang = "";

for(let i=2; i<process.argv.length; i++) {
    if (i==process.argv.length - 1) {
        lang = process.argv[i]
    } else {
        word += process.argv[i] + " "
    }
}
word = word.substring(0, word.length-1)

let kelime = new Tureng(word, lang);

kelime.Translate(function(data) {
   
    if (lang == "entr") {
        if (data.Situation.IsFound == true) {
            var tableENTR = new Table({head: (data.IsEn2Tr == 1 ? ["English", "Turkish"] : ["Turkish", "English"])})
            data.Translations.forEach((datax) => {
                tableENTR.push([datax[Object.keys(datax)[0]], datax[Object.keys(datax)[1]]]);
            });
            console.log(tableENTR.toString());
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
    } else {
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
    }
});

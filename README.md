# tureng

An unofficial tureng.com English-German translater module. It uses official API that used in mobile application.

# Example 1

```javascript
var Word = require("tureng");

let kelime = new Word("katze");
kelime.getSuggestions((list) => {list.forEach((element) => {console.log(element)})});

/* Output:
katzenartig
katzenhaft
*/
```

# Example 2

```javascript
var Word = require("tureng");

let kelime = new Word("album");
kelime.Translate((list) => {console.log(list)});

/* Output:
{ Situation: { IsFound: true, Suggestion: false },
  Language: 'Both',
  Translations:
   { En2De: [ [Object], [Object], [Object], [Object], [Object] ],
     De2En: [ [Object], [Object], [Object] ] } }
*/

/* 
Language: German, English, Both ---> String
Translations: En2De, De2En, En2De and De2En ---> Object
En2De/De2En={TermDE, TermENG} ---> Object
Suggestions: ['Suggestion1', 'Suggestion2', ...] ---> Array
*/
```

# Included commandline application source code

```javascript
var Word = require("./main.js");
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
```


type `tureng yes` in console and it will output:


```
┌─────────────────────┬────────────────────────┐
│ English             │ German                 │
├─────────────────────┼────────────────────────┤
│ yes [adv] (General) │ ja [adv] (General)     │
├─────────────────────┼────────────────────────┤
│ yes [adv] (General) │ jawohl [adv] (General) │
├─────────────────────┼────────────────────────┤
│ yes [n] (General)   │ Ja [n] (General)       │
├─────────────────────┼────────────────────────┤
│ yes (General)       │ jawohl (General)       │
├─────────────────────┼────────────────────────┤
│ yes (General)       │ ja (General)           │
├─────────────────────┼────────────────────────┤
│ yes (IOS)           │ Ja (IOS)               │
└─────────────────────┴────────────────────────┘
```
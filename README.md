# tureng

An unofficial tureng.com translater module and commandline application. It uses official API that used in mobile application.
It supports English-Turkish and English-German.

# Usage CLI

`tureng <word> <entr/ende>`


~~~

>>>tureng yes ende
┌─────────────────────┬────────────────────────┐
│ English             │ German                 │
├─────────────────────┼────────────────────────┤
│ yes [adv] (General) │ ja [adv] (General)     │
├─────────────────────┼────────────────────────┤
│ ...                 │ ...                    │
└─────────────────────┴────────────────────────┘

>>>tureng türkçe entr
┌────────────────────────────────────────┬─────────────────────────────────────────┐
│ Turkish                                │ English                                 │
├────────────────────────────────────────┼─────────────────────────────────────────┤
│ türkçe [i.] (Yaygın Kullanım (tr->en)) │ turkish [n.] (Common Usage (tr->en))    │
├────────────────────────────────────────┼─────────────────────────────────────────┤
│ ...                                    │ ...                                     │
└────────────────────────────────────────┴─────────────────────────────────────────┘

>>>tureng "turkish language" entr 
┌───────────────────────────────────────────┬───────────────────────────────────┐
│ English                                   │ Turkish                           │
├───────────────────────────────────────────┼───────────────────────────────────┤
│ turkish language  [n.] (General (en->tr)) │ türk dili [i.] (Genel (en->tr))   │
├───────────────────────────────────────────┼───────────────────────────────────┤
│ ...                                       │ ...                               │
└───────────────────────────────────────────┴───────────────────────────────────┘
~~~



# Example Code 1

~~~
var Tureng = require("tureng");

let kelime = new Tureng("katze", "ende"); // Tureng(word, lang); lang=ende for german, entr for english
kelime.getSuggestions((list) => {list.forEach((element) => {console.log(element)})});

/* Output:
katzenartig
katzenhaft
*/
~~~



# Example Code 2

~~~
var Tureng = require("tureng");

let kelime = new Tureng("album", "ende");
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
~~~

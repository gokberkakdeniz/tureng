# tureng

An unofficial tureng.com translater module and commandline application. It uses official API that used in mobile application.
It supports English-Turkish and English-German.



# Usage CLI

`tureng <entr/ende> <word>` for single translation.
`tureng <entr/ende>` for multiple translation.
In multiple translation, inputs except some special commands always translating. This commands are `.exit` and `.lang <entr/ende>`. Also you can select suggestion fastly with writing `.<number of suggestion that you want translate>`.

~~~
D:\.root\.projects\tureng-api\cli>tureng entr
> appc
No match found but suggestions found.
Suggestions:
1 apac
2 app
3 appal
4 appro
5 apple
6 apply
7 apo
8 apn
9 apak
10 ppp
> .1
┌──────────────────────────────┬────────────────────────────────────┐
│ English                      │ Turkish                            │
├──────────────────────────────┼────────────────────────────────────┤
│ apac [n.] (General (en->tr)) │ asya pasifik [i.] (Genel (en->tr)) │
└──────────────────────────────┴────────────────────────────────────┘
> .lang ende
Language is English-German.
> .exit
D:\.root\.projects\tureng-api\cli>
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

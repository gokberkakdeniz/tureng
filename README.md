# **tureng**


>An unofficial tureng.com translater module and commandline application. It uses official API that used in mobile application.
>It supports English-Turkish and English-German.



# Usage CLI

 - `tureng <entr/ende> <word>` for single translation.
 - `tureng <entr/ende>` for CLI.

> In CLI, inputs except some special commands are always translating.

 - `.exit` exit
 - `.lang <entr/ende>` change language
 - `.<number of suggestion that you want translate>`  select suggestion
   fastly with writing
 - `.voice <us/uk/au>` play voice of word [Windows (Tested) and Linux
   (?)]
 - `.clear` clear screen

![CLI Screenshot](https://i.imgur.com/ymL8dGe.png)

> ffmpeg required for voice on Linux
 - `sudo apt install ffmpeg` for Ubuntu (Tested on 17.04)



# Example Code 1

```javascript
var Tureng = require("tureng");

let kelime = new Tureng("katze", "ende"); // Tureng(word, lang); lang=ende for german, entr for english
kelime.getSuggestions((list) => {list.forEach((element) => {console.log(element)})});

/* Output:
katzenartig
katzenhaft
*/
```



# Example Code 2

```javascript
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
```


# Copyright

> Copyright © 2017 Gökberk AKDENİZ
>
> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> "Software"), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:
>
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

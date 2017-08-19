'use strict'
var http = require("http");
var CryptoJS = require("crypto-js");

function Tureng(word, lang) {
    this.word = word;
    this.lang = lang // entr, ende, enes, enfr
}

function CreateToken(txt) {
    let str = txt + "46E59BAC-E593-4F4F-A4DB-960857086F9C";
    return CryptoJS.MD5(str).toString();
}


Tureng.prototype.getSuggestions = function(callback) {
    http.get({
        hostname: "ac.tureng.co",
        path: "/?t=" + this.word + "&l=" + this.lang
    }, function(res) {
        var str = '';
        res.on('data', function(chunk) {
            str += chunk;
        });
        res.on('end', function() {
            var list = str.replace('["','').replace('"]','').split('","');
            callback(list);
        })
    })
}

Tureng.prototype.Translate = function(callback) {
    const wordx = this.word
    if (this.lang == "ende") {
         http.get({
                hostname: "api.tureng.com",
                path: "/v1/dictionary/ende/" + this.word.replace(" ", "%20")
            }, function(res) {
                var str = '';
                res.on('data', function(chunk) {
                    str += chunk;
                });

                res.on('end', function() {
                    var parsed = JSON.parse(str);
                    if (parsed.IsFound == true) {
                        var En2De = [];
                        var De2En = [];
                        const lang = parsed.AResults.length>parsed.BResults.length ? parsed.BResults.length>0 ? "Both":"English":parsed.AResults.length>0 ? "Both":"German"
                        var trans = lang == "German" ? {De2En} : lang == "English" ? {En2De} : {En2De, De2En}
                        parsed.AResults.forEach((data) => {En2De.push({TermENG: data.TermA + " " + (data.TermTypeTextA == null ? "" : data.TermTypeTextA + " ") + (data.CategoryTextA == null ? "" : "(" + data.CategoryTextA + ")"),
                                                                       TermDE: data.TermB + " " + (data.TermTypeTextB == null ? "" : data.TermTypeTextB + " ") + (data.CategoryTextB == null ? "" : "(" + data.CategoryTextB + ")"),
                                                                       IsSlang: data.IsSlang})})
                        parsed.BResults.forEach((data) => {De2En.push({TermDE: data.TermB + " " + (data.TermTypeTextB == null ? "" : data.TermTypeTextB + " ") + (data.CategoryTextB == null ? "" : "(" + data.CategoryTextB + ")"),
                                                                       TermENG: data.TermA + " " + (data.TermTypeTextA == null ? "" : data.TermTypeTextA + " ") + (data.CategoryTextA == null ? "" : "(" + data.CategoryTextA + ")"),
                                                                       IsSlang: data.IsSlang})})
                        parsed.AFullTextResults.forEach((data) => {En2De.push({TermENG: data.TermA + " " + (data.TermTypeTextA == null ? "" : data.TermTypeTextA + " ") + (data.CategoryTextA == null ? "" : "(" + data.CategoryTextA + ")"),
                                                          TermDE: data.TermB + " " + (data.TermTypeTextB == null ? "" : data.TermTypeTextB + " ") + (data.CategoryTextB == null ? "" : "(" + data.CategoryTextB + ")"),
                                                          IsSlang: data.IsSlang})})
                        parsed.BFullTextResults.forEach((data) => {De2En.push({TermDE: data.TermB + " " + (data.TermTypeTextB == null ? "" : data.TermTypeTextB + " ") + (data.CategoryTextB == null ? "" : "(" + data.CategoryTextB + ")"),
                                                          TermENG: data.TermA + " " + (data.TermTypeTextA == null ? "" : data.TermTypeTextA + " ") + (data.CategoryTextA == null ? "" : "(" + data.CategoryTextA + ")"),
                                                          IsSlang: data.IsSlang})})

                        callback({Situation: {IsFound: true, Suggestion: false}, Language: lang, Translations: trans });

                    } else {
                        if (parsed.Suggestions == null) {
                            callback({Situation: {IsFound: false, Suggestion: false}, Suggestions: null})

                        } else {
                            callback({Situation: {IsFound: false, Suggestion: true}, Suggestions: parsed.Suggestions})
                        }
                    }
                })
            })
    } else if (this.lang == "entr") {
            var req = http.request({
                hostname: "ws.tureng.com",
                path: "/TurengSearchServiceV4.svc/Search",
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }, function(res) {
                var str = '';
                res.on('data', function(chunk) {
                    str += chunk;
                })
                res.on('end', function() {
                    var parsed = JSON.parse(str);
                    if (parsed.MobileResult.IsFound == true) {
                        var x = [];
                        if (parsed.MobileResult.IsTRToEN == 1) { // english ---> turkish
                            parsed.MobileResult.Results.forEach((data) => {x.push({TermENG: wordx + (data.TypeEN == null ? "" : " [" + data.TypeEN + "]") + (data.CategoryEN == null ? "" : " (" + data.CategoryEN + ")"),
                                                                                    TermTR: data.Term + (data.TypeTR == null ? "" : " [" + data.TypeTR + "]") + (data.CategoryTR == null ? "" : " (" + data.CategoryTR + ")")})});
                            callback({Situation: {IsFound: true, Suggestion: false}, IsEn2Tr: true , Translations: x });
                        } else { // turkish ---> english
                            parsed.MobileResult.Results.forEach((data) => {x.push({TermTR: wordx + (data.TypeTR == null ? "" : " [" + data.TypeTR + "]") + (data.CategoryTR == null ? "" : " (" + data.CategoryTR + ")"),
                                                                                    TermENG: data.Term + (data.TypeEN == null ? "" : " [" + data.TypeEN + "]") + (data.CategoryEN == null ? "" : " (" + data.CategoryEN + ")")})});
                            callback({Situation: {IsFound: true, Suggestion: false}, IsEn2Tr: false , Translations: x });
                        }
                    } else {
                        if (parsed.MobileResult.Suggestions == null) {
                            callback({Situation: {IsFound: false, Suggestion: false}, Suggestions: null})

                        } else {
                            callback({Situation: {IsFound: false, Suggestion: true}, Suggestions: parsed.MobileResult.Suggestions})
                        }
                    }
                })
            });
        req.write('{"Term":"' + wordx + '", "Code":"' + CreateToken(wordx) + '"}');
        req.end()
    } else if (this.lang == "enes") {

    } else if (this.lang == "enfr") {

    } else {
        callback("Language must be entr, ende, enes or enfr.")
    }

}
module.exports = Tureng;

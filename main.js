'use strict'
var http = require("http");



function Word(word) {
    this.word = word;
}

Word.prototype.getSuggestions = function(callback) {
    http.get({
        hostname: "ac.tureng.co",
        path: "/?t=" + this.word + "&l=ende"
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

Word.prototype.Translate = function(callback) {
    http.get({
        hostname: "api.tureng.com",
        path: "/v1/dictionary/ende/" + this.word
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
                                                               TermDE: data.TermB + " " + (data.TermTypeTextB == null ? "" : data.TermTypeTextB + " ") + (data.CategoryTextB == null ? "" : "(" + data.CategoryTextB + ")")})})
                parsed.BResults.forEach((data) => {De2En.push({TermDE: data.TermB + " " + (data.TermTypeTextB == null ? "" : data.TermTypeTextB + " ") + (data.CategoryTextB == null ? "" : "(" + data.CategoryTextB + ")"), 
                                                               TermENG: data.TermA + " " + (data.TermTypeTextA == null ? "" : data.TermTypeTextA + " ") + (data.CategoryTextA == null ? "" : "(" + data.CategoryTextA + ")")})})
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
}
module.exports = Word;
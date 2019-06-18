const express = require('express')
const path = require('path')
const fileReader = require('read-text-file')
const wordsList = fileReader.readSync(__dirname + '/dict/wordlist.txt').split("\n")
const PORT = process.env.PORT || 5000

express()
  .get('/*', function (req, res) {
    handleSingleWord(res, req);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function handleSingleWord(res, req) {
     res.json(theFinder(createKeys(req.params[0].split(','))))
}

function createKeys(zkeys) {
  let preAnagram = {}
  zkeys.forEach((key)=>{
    preAnagram[key] = []
  });
  return preAnagram
}

function alphabetize(urlWord) {
  if (!urlWord) { return; }

  urlWord = urlWord.toLowerCase('');
  urlWord = urlWord.split('');
  urlWord = urlWord.sort();
  urlWord = urlWord.join('');
  return urlWord;
}

function isAnagram(word1, word2) {
  return alphabetize(word1) === alphabetize(word2)
}

function theFinder(anagramKeys){
  const anagrams = anagramKeys;

  Object.keys(anagramKeys).forEach(function (key) {
    for (let index = 0; index < wordsList.length; index++) {
      if(!isAnagram(key,wordsList[index])||(key === wordsList[index])) continue;
       anagrams[key].push(wordsList[index])
    }

  });
  return anagrams
}

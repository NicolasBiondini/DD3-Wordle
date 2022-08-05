const words = require("../resources/words.txt")

export const selectWords = async() : Promise<{selectedWord : string,finalWords : Set<string>}> => {

    // Get the words
    const response = await fetch(words);
    const data = await response.text();

    // Split the words into an array
    // Filter by length
    // Word to UpperCase
    // And remove the accents
    // let accentChars = ['á', 'é', 'í', 'ó', 'ú'];
    // const arrayOfWords = data.split("\n").filter((word) => word.length === 5).filter((word) => !accentChars.some(char => word.includes(char))).map((word) => word.toUpperCase())
    const arrayOfWords = data.split("\n").filter((word) => word.length === 5).map((letter) => letter.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase())
    const initialWord = arrayOfWords.splice(Math.floor(Math.random() * arrayOfWords.length ), 1);

    const finalWords = new Set(arrayOfWords)

    return {selectedWord: initialWord[0], finalWords}
}
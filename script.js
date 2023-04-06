document.addEventListener('DOMContentLoaded', () => {

    // Initial References
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', ' '];
    const alphabet = document.getElementById('alphabet');
    const movesLeft = document.getElementById('moves_left');
    const catagoryName = document.getElementById('catagory_name');
    const guessingWordDiv = document.getElementById('guessing_word');
    const restart = document.getElementById('restart');
    let moves = 0;
    let winCount = 0;
    let countMove = true;
    let disableLetters = true;
    let word;
    let chosenCategory;
    let guessingWord;
    let singleLetter;

    // Play function 
    play = function () {
        categories = [
            ["apple", "pineapple", "orange", "banana", "maracuja", "pear", "watermelon"],
            ["alien", "harry potter", "gladiator", "finding nemo", "hobit", 'avatar', 'spiderman'],
            ["london", "milan", "madrid", "amsterdam", "prague", 'rome', 'wellington', 'vancouver', 'berlin']
        ];

        // generate random word from categories 
        chosenCategory = categories[Math.floor(Math.random() * categories.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        // replace every letter with dash
        guessingWord = word.replace(/./g, '_');
        // select category depends on generated word
        if (chosenCategory === categories[0]) {
            catagoryName.innerText = "The Chosen Category Is Fruit";
        } else if (chosenCategory === categories[1]) {
            catagoryName.innerText = "The Chosen Category Is Films";
        } else if (chosenCategory === categories[2]) {
            catagoryName.innerText = "The Chosen Category Is Cities";
        }

        guessingWordDiv.innerHTML = guessingWord;

    };
    play();

    // display all buttons for letters
    letters.forEach(letter => {
        const letterButton = document.createElement('button');
        letterButton.classList.add("single_letter");
        letterButton.innerText = letter;

        // letter button click
        letterButton.addEventListener('click', () => {
            // if word contains clciked letter replace the matched dash with letter
            if (word.includes(letter)) {
                guessingWord = guessingWord.split('').map((char, index) => {
                    if (word[index] === letter) {
                        // if the letter is in the word countMove = false; wont decrease moves
                        countMove = false;
                        // if the letter is in the word, winCount will increase
                        winCount++;
                        // if winCount equals word lenth, change movesLeft text and disable all letters 
                        if (winCount == guessingWord.length) {
                            movesLeft.innerText = `You win`;
                            disableLettersButon(disableLetters);
                        }
                        return letter;
                    } else {
                        return char;
                    }
                }).join('');

                guessingWordDiv.innerHTML = guessingWord;
                // disable clicked buttons
                letterButton.disabled = true;
            } else {
                letterButton.disabled = true;
            };

            countingMoves(countMove);
        });

        alphabet.appendChild(letterButton);
    });

    // function for moves counting and game over
    function countingMoves(countable) {
        // if letter is not in the word, moves will increase
        if (countable) {
            moves++;
            // show that we have 10 moves - moves increment
            movesLeft.innerText = `Moves Left: ${10 - moves}`;
        } else {
            countMove = true;
        }
        // if moves higher than 10 execute gameOver function
        if (moves >= 10) {
            gameOver();

        };
    };

    // change movesLeft text and disable all letters 
    function gameOver() {
        movesLeft.innerText = `Game over.`;
        disableLettersButon(disableLetters);
    }

    // game restart
    restart.onclick = function () {
        // set moves and winCount value back to 0
        moves = 0;
        winCount = 0;
        // change movesLeft 
        movesLeft.innerText = `Moves Left: ${10 - moves}`;
        // call play function to generate new word
        play();
        // remove disabled form letters
        disableLettersButon();
    };

    // function for adding and removing disabled attribute from letters
    function disableLettersButon(disabled) {
        singleLetter = document.querySelectorAll('.single_letter');

        if (disabled) {
            for (let index = 0; index < singleLetter.length; index++) {
                singleLetter[index].disabled = true;
            };
        } else {
            for (let index = 0; index < singleLetter.length; index++) {
                singleLetter[index].disabled = false;
            };
        };
    };


});




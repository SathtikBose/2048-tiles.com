document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const movesDisplay = document.getElementById('moves');
    const timerDisplay = document.getElementById('timer');
    const restartButton = document.getElementById('restart-button');
    const darkModeButton = document.getElementById('dark-mode-button');
    let squares = [];
    const width = 4;
    let score = 0;
    let moves = 0;
    let timer = 0;
    let timerInterval;

    // Create the playing board
    function createBoard() {
        gridDisplay.innerHTML = '';
        squares = [];
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();

    // Generate a new number
    function generate() {
        const randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            addNumberClass(squares[randomNumber]);
            checkForGameOver();
        } else {
            generate();
        }
    }

    // Add a class to non-zero numbers
    function addNumberClass(square) {
        if (square.innerHTML != 0) {
            square.classList.add('non-zero');
        } else {
            square.classList.remove('non-zero');
        }
    }

    // Move right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                const totalOne = squares[i].innerHTML;
                const totalTwo = squares[i + 1].innerHTML;
                const totalThree = squares[i + 2].innerHTML;
                const totalFour = squares[i + 3].innerHTML;
                const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                const filteredRow = row.filter(num => num);
                const missing = 4 - filteredRow.length;
                const zeros = Array(missing).fill(0);
                const newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];

                addNumberClass(squares[i]);
                addNumberClass(squares[i + 1]);
                addNumberClass(squares[i + 2]);
                addNumberClass(squares[i + 3]);
            }
        }
    }

    // Move left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                const totalOne = squares[i].innerHTML;
                const totalTwo = squares[i + 1].innerHTML;
                const totalThree = squares[i + 2].innerHTML;
                const totalFour = squares[i + 3].innerHTML;
                const row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                const filteredRow = row.filter(num => num);
                const missing = 4 - filteredRow.length;
                const zeros = Array(missing).fill(0);
                const newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0];
                squares[i + 1].innerHTML = newRow[1];
                squares[i + 2].innerHTML = newRow[2];
                squares[i + 3].innerHTML = newRow[3];

                addNumberClass(squares[i]);
                addNumberClass(squares[i + 1]);
                addNumberClass(squares[i + 2]);
                addNumberClass(squares[i + 3]);
            }
        }
    }

    // Move up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            const totalOne = squares[i].innerHTML;
            const totalTwo = squares[i + width].innerHTML;
            const totalThree = squares[i + (width * 2)].innerHTML;
            const totalFour = squares[i + (width * 3)].innerHTML;
            const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill(0);
            const newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];

            addNumberClass(squares[i]);
            addNumberClass(squares[i + width]);
            addNumberClass(squares[i + (width * 2)]);
            addNumberClass(squares[i + (width * 3)]);
        }
    }

    // Move down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            const totalOne = squares[i].innerHTML;
            const totalTwo = squares[i + width].innerHTML;
            const totalThree = squares[i + (width * 2)].innerHTML;
            const totalFour = squares[i + (width * 3)].innerHTML;
            const column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            const filteredColumn = column.filter(num => num);
            const missing = 4 - filteredColumn.length;
            const zeros = Array(missing).fill(0);
            const newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0];
            squares[i + width].innerHTML = newColumn[1];
            squares[i + (width * 2)].innerHTML = newColumn[2];
            squares[i + (width * 3)].innerHTML = newColumn[3];

            addNumberClass(squares[i]);
            addNumberClass(squares[i + width]);
            addNumberClass(squares[i + (width * 2)]);
            addNumberClass(squares[i + (width * 3)]);
        }
    }

    // Combine row
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                const combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // Combine column
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                const combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + width].innerHTML = 0;
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin();
    }

    // Assign functions to keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }

    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
        moves++;
        movesDisplay.innerHTML = `Moves: ${moves}`;
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
        moves++;
        movesDisplay.innerHTML = `Moves: ${moves}`;
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
        moves++;
        movesDisplay.innerHTML = `Moves: ${moves}`;
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
        moves++;
        movesDisplay.innerHTML = `Moves: ${moves}`;
    }

    // Add touch events for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    document.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        handleGesture(touchStartX, touchStartY, touchEndX, touchEndY);
    });

    function handleGesture(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > absDeltaY) {
            if (deltaX > 0) {
                keyRight();
            } else {
                keyLeft();
            }
        } else {
            if (deltaY > 0) {
                keyDown();
            } else {
                keyUp();
            }
        }
    }

    // Check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'You win!';
                document.removeEventListener('keyup', control);
                document.removeEventListener('touchend', handleGesture);
                clearInterval(timerInterval);
                addRestartButton();
            }
        }
    }

    // Check if there are no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = 'You lose!';
            document.removeEventListener('keyup', control);
            document.removeEventListener('touchend', handleGesture);
            clearInterval(timerInterval);
            addRestartButton();
        }
    }

    // Restart game
    restartButton.addEventListener('click', restartGame);

    function restartGame() {
        score = 0;
        moves = 0;
        timer = 0;
        scoreDisplay.innerHTML = score;
        movesDisplay.innerHTML = `Moves: ${moves}`;
        timerDisplay.innerHTML = `Time: ${timer}s`;
        resultDisplay.innerHTML = '';
        clearInterval(timerInterval);
        createBoard();
        startTimer();
        document.addEventListener('keyup', control);
        document.addEventListener('touchend', handleGesture);
    }

    // Timer
    function startTimer() {
        timerInterval = setInterval(() => {
            timer++;
            timerDisplay.innerHTML = `Time: ${timer}s`;
        }, 1000);
    }

    startTimer();

    // Dark mode toggle
    darkModeButton.addEventListener('click', toggleDarkMode);

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        darkModeButton.innerHTML = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    }

    // Add restart button when game ends
    function addRestartButton() {
        restartButton.style.display = 'inline-block';
    }
});

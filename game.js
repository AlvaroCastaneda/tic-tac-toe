const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

var singlePlayer = false;
const grid = () => Array.from(document.getElementsByClassName('q'));
const qNumId = (qEl) => Number.parseInt(qEl.id.replace('q', ''));
const emptyQs = () => grid().filter(_qEl => _qEl.innerText === '');
const usedQs = () => grid().filter(_qEl => _qEl.innerText === 'X' || _qEl.innerText === 'O');
const allSame = (arr) => arr.every(_qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== '');

const takeTurn = (index, letter) => grid()[index].innerText = letter;
const opponentChoice = () => qNumId(emptyQs()[Math.floor(Math.random() * emptyQs().length)]);

const single = () => singlePlayer = true;
const multi = () => singlePlayer = false;

const removeClass = () => {
    const a = grid().filter(_qEl => _qEl.classList.contains('winner'));
    a.forEach(_qEl => _qEl.classList.remove('winner'));
}

const resetBoard = () => {
    usedQs().forEach(_qEl => _qEl.innerText = '');
    removeClass();
}

const endGame = (winningSequence) => {
    winningSequence.forEach(_qEl => _qEl.classList.add('winner'));
    disableSecondPlayer();
    disableListeners();
};

const checkForVictory = () => {
    let victory = false;
    winningCombos.forEach(_c => {
        const _grid = grid();
        const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
        if (allSame(sequence)) {
            victory = true;
            endGame(sequence);
            setTimeout(() => {
                alert('Ahh pirro!!!')
            }, 500);
        }
    });
    return victory;
};

const clickFn = ($event) => {
    takeTurn(qNumId($event.target), 'X');
    if (!checkForVictory()) {
        if (singlePlayer) {
            disableListeners();
            opponentTurn();
        } else {
            enableSecondPlayer();
            disableListeners();
            secondPlayer();
        }
    }
};

const secondPlayer = ($event) => {
    takeTurn(qNumId($event.target), "O");
    if (!checkForVictory()) {
        enableListeners();
        disableSecondPlayer();
        clickFn();
    }
};

const opponentTurn = () => {
    disableListeners();
    setTimeout(() => {
        takeTurn(opponentChoice(), 'O');
        if (!checkForVictory())
            enableListeners();
    }, 700);
}

const enableListeners = () => grid().forEach(_qEl => _qEl.addEventListener('click', clickFn));
const disableListeners = () => grid().forEach(_qEl => _qEl.removeEventListener('click', clickFn));

const enableSecondPlayer = () => grid().forEach(_qEl => _qEl.addEventListener("click", secondPlayer));
const disableSecondPlayer = () => grid().forEach(_qEl => _qEl.addEventListener("click", secondPlayer));

disableSecondPlayer();
enableListeners();

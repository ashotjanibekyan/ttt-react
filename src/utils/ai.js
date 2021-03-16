export const availableMoves = (board) => {
    const moves = [];
    board.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === ' ') {
                moves.push([i, j]);
            }
        });
    });
    return moves;
};

export const whoWon = (board) => {
    let winner = ' ';
    let winningRow, winningCol, winningDiag;
    if (board.map(row => row.join('')).join('').includes(' ')) {
        winner = null;
    }

    board.map(row => row.join('')).some((el, i) => {
        if (el === 'XXX' || el === 'OOO') {
            winner = el[0];
            winningRow = i;
            return true;
        }
        return false;
    });
    [0, 1, 2].some((col) => {
        if (board[0][col] !== ' ' && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            winner = board[0][col];
            winningCol = col;
            return true;
        }
        return false;
    });
    if (board[1][1] !== ' ') {
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            winningDiag = -1;
            winner = board[1][1];
        }
        if (board[2][0] === board[1][1] && board[1][1] === board[0][2]) {
            winningDiag = 1;
            winner = board[1][1];
        }
    }
    return [winner, winningRow, winningCol, winningDiag];
};

export const minmax = (board, maximize = true) => {
    const result = whoWon(board);
    if (result[0] === 'X') {
        return 1;
    } else if (result[0] === 'O') {
        return -1;
    } else if (result[0] === ' ') {
        return 0;
    }
    const moves = availableMoves(board);
    if (maximize) {
        let val = -Infinity;
        moves.forEach((move) => {
            board[move[0]][move[1]] = 'X';
            let temp = minmax(board, maximize = false);
            board[move[0]][move[1]] = ' ';
            if (temp > val) {
                val = temp;
            }
        });
        return val;
    } else {
        let val = +Infinity;
        moves.forEach((move) => {
            board[move[0]][move[1]] = 'O';
            let temp = minmax(board, maximize = true);
            board[move[0]][move[1]] = ' ';
            if (temp < val) {
                val = temp;
            }
        });
        return val;
    }
};

export const nextMove = (board, isX = true) => {
    const moves = availableMoves(board);
    if (moves.length === 0) {
        return;
    }
    const wins = [];
    const draws = [];
    moves.forEach(move => {
        board[move[0]][move[1]] = isX ? 'X' : 'O';
        const val = minmax(board, !isX);
        board[move[0]][move[1]] = ' ';
        if (val === (isX ? 1 : -1)) {
            wins.push(move);
        } else if (val === 0) {
            draws.push(move);
        }
    });

    if (wins.length > 0) {
        return wins[Math.floor(Math.random() * wins.length)];
    } else if (draws.length > 0) {
        return draws[Math.floor(Math.random() * draws.length)]
    } else {
        return moves[Math.floor(Math.random() * moves.length)]
    }
};
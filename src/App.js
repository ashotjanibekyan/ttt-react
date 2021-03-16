import React, {Component} from 'react';
import Board from './components/Board';
import Modes from "./components/modes";
import {nextMove, whoWon} from './utils/ai'
import './App.css'


class App extends Component {
    state = {
        board: [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ],
        isXTurn: true,
        result: [null, undefined, undefined, undefined],
        xWin: 0,
        oWin: 0,
        draw: 0,
        mode: 'two'
    };


    moveHandler = (event, row, col) => {
        if (this.state.board[row][col] !== ' ' || this.state.result[0] !== null) {
            return;
        }
        const newBoard = this.state.board.map((row) => {
            return [...row];
        });
        const isXTurn = this.state.isXTurn;
        newBoard[row][col] = isXTurn ? 'X' : 'O';
        const result = whoWon(newBoard);
        let xWin = this.state.xWin;
        let oWin = this.state.oWin;
        let draw = this.state.draw;
        if (result[0] === 'X') {
            xWin++;
        } else if (result[0] === 'O') {
            oWin++
        } else if (result[0] === ' ') {
            draw++;
        }
        this.setState({
            board: newBoard,
            isXTurn: !isXTurn,
            result: result,
            xWin: xWin,
            oWin: oWin,
            draw: draw
        });
    };

    reset = () => {
        this.setState({
            board: [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ],
            isXTurn: true,
            result: [null, undefined, undefined, undefined]
        });
    };

    ai = () => {
        const move = nextMove(this.state.board.map((row) => {
            return [...row];
        }), this.state.isXTurn);
        if (move) {
            this.moveHandler('AI', ...move);
        }
    };

    componentDidUpdate() {
        if (this.state.mode === 'AIwithAI') {
            setTimeout(this.ai, 500);
        } else if (this.state.mode === 'withAI' && !this.state.isXTurn) {
            setTimeout(this.ai, 500);
        }
    }

    render() {
        return <div className="App">
            <p>X score: {this.state.xWin}</p>
            <p>O score: {this.state.oWin}</p>
            <p>draw: {this.state.draw}</p>
            <Board
                board={this.state.board}
                result={this.state.result}
                clicked={this.moveHandler}
            />
            <Modes mode={this.state.mode} change={(e) => this.setState({mode: e.target.value})}/>
            <button onClick={this.reset}>Reset</button>
            <button onClick={this.ai}>AI play</button>
        </div>
    }
}

export default App;

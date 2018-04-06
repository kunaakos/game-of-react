import React, { Component } from 'react';

import './Board.css'

import { X, Y } from '../../lib/GameOfLife/Data';
import Cell from './Cell'

function makeBoard(liveCells, viewport) {
    const board = Array.from(new Array(viewport.height),
        () => {
            return new Array(viewport.width)
                .fill(false)
        }
    )
    liveCells.forEach(cell => {
        const row = cell[Y] - viewport.origin[Y]
        const col = cell[X] - viewport.origin[X]
        board[row][col] = true
    })
    return board
}

class Board extends Component {

    state = {
        board: undefined
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            board: makeBoard(nextProps.liveCells, nextProps.viewport)
        }
    }

    render() {
        return (
            <div className="board">
                {this.state.board.map((row, index) => (
                    <div className='row'>
                        {row.map((cell) => (
                            <Cell alive={cell} />
                        ))}
                    </div>
                ))}
            </div>
        );
    }

}

export default Board

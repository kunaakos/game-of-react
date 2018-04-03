import React, { Component } from 'react';
import styled from 'styled-components';

import { X, Y, LIGHT_SPACESHIP } from '../../lib/GameOfLife/Data';
import { step, visibleCells } from '../../lib/GameOfLife/Game';

import Board from '../Board/Board'

const GameWrapper = styled.div`
    @media (orientation: landscape) {
        width: 80vh;
    }
    @media (orientation: portrait) {
        width: 80vw;
    }
`

class Game extends Component {
    state = {
        cells: LIGHT_SPACESHIP,
        view: {
            startX: -5,
            startY: -5,
            endX: 10,
            endY: 10
        },
        stepper: undefined
    }

    constructor(props) {
        super(props)
        this.stepper = setInterval(() => {
            this.setState({
                cells: step(this.state.cells)
            })
        }, 1000)
    }

    makeBoardFrom(cells, view) {
        const width = view.endX - view.startX
        const height = view.endY - view.startY

        const board = Array.from(new Array(height),
            () => {
                return new Array(width)
                    .fill(false)
            }
        )

        visibleCells(cells, view)
            .forEach(cell => {
                board[cell[Y] - view.startY][cell[X] - view.startX] = true
            })

        return board
    }

    render() {
        const board = this.makeBoardFrom(this.state.cells, this.state.view)
        return (
            <GameWrapper className="game-wrapper">
                <Board board={board}/>
            </GameWrapper>
        );
    }
}

export default Game

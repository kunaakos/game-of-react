import React, { Component } from 'react';
import styled from 'styled-components';

import { X, Y, LIGHT_SPACESHIP } from '../../lib/GameOfLife/Data';
import { step, clip } from '../../lib/GameOfLife/Game';

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
        viewport: {
            origin: [-5, -5],
            width: 20,
            height: 20
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

    makeBoardFrom(cells, viewport) {
        const board = Array.from(new Array(viewport.height),
            () => {
                return new Array(viewport.width)
                    .fill(false)
            }
        )
        clip(cells, viewport)
            .forEach(cell => {
                const row = cell[Y] - viewport.origin[Y]
                const col = cell[X] - viewport.origin[X]
                board[row][col] = true
            })

        return board
    }

    render() {
        const board = this.makeBoardFrom(this.state.cells, this.state.viewport)
        return (
            <GameWrapper className="game-wrapper">
                <Board board={board}/>
            </GameWrapper>
        );
    }
}

export default Game

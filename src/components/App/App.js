import React, { Component } from 'react';
import styled from 'styled-components';

import { X, Y, LIGHT_SPACESHIP } from '../../lib/GameOfLife/Data';
import { step, visibleCells } from '../../lib/GameOfLife/Game';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Board = styled.div`
    border: 1px solid #000;
    display: flex;
    flex-flow: column nowrap;
    @media (orientation: landscape) {
        width: 80vh;
    }
    @media (orientation: portrait) {
        width: 80vw;
    }
`

const Row = styled.div`
    margin: 0;
    width: 100%;    
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
`

const Cell = styled.div`
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    &:before {
        content:'';
        float:left;
        padding-top:100%;
    }
    margin: 0;
    background: ${props => props.alive ? '#000' : 'transparent'};
`

class App extends Component {
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

    renderCell(isAlive) {
        return (
            <Cell alive={isAlive} />
        )
    }

    renderRow(row) {
        const cells = row.map(cell => this.renderCell(cell))
        return (
            <Row>
                {cells}
            </Row>
        )
    }

    renderBoard(board) {
        const rows = board.map(row => this.renderRow(row))
        return (
            <Board>
                {rows}
            </Board>
        )
    }

    render() {
        const board = this.makeBoardFrom(this.state.cells, this.state.view)
        return (
            <Wrapper>
                {this.renderBoard(board)}
            </Wrapper>
        );
    }
}

export default App;

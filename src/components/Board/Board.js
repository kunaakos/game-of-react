import React, { Component } from 'react';
import styled from 'styled-components';

const BoardWrapper = styled.div`
    border: 1px solid #000;
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
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

class Board extends Component {

    renderCell(isAlive, key) {
        return (
            <Cell key={key} alive={isAlive} />
        )
    }

    renderRow(row, key) {
        const renderCell = this.renderCell.bind(this)
        return (
            <Row key={key}>
                {row.map(renderCell)}
            </Row>
        )
    }

    render() {
        const board = this.props.board
        const renderRow = this.renderRow.bind(this)
        return (
            <BoardWrapper className="board-wrapper">
                {board.map(renderRow)}
            </BoardWrapper>
        );
    }
}

export default Board

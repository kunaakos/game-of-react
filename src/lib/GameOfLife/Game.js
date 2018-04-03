import _ from 'lodash'

import { X, Y, NEIGHBOR_OFFSETS } from './Data'

function neighborOf(cell) {
    return (offset) => [offset[X] + cell[X], offset[Y] + cell[Y]]
}

function neighborsOf(cell) {
    const neighbor = neighborOf(cell)
    return NEIGHBOR_OFFSETS
        .map(neighbor)
}

function isAmong(referenceCells, cell) {
    return referenceCells.some((referenceCell) => referenceCell[X] === cell[X] && referenceCell[Y] === cell[Y])
}

function countLiveCells(cells, liveCells) {
    return cells.reduce((acc, cell) => {
        return isAmong(liveCells, cell)
            ? ++acc
            : acc
    }, 0)
}

function cellStepper(liveCells) {
    // returns true is cell will be alive in the next generation, false if not
    return (cell) => {
        let liveNeighborCount = countLiveCells(neighborsOf(cell), liveCells)

        return isAmong(liveCells, cell)
            ? liveNeighborCount >=2 && liveNeighborCount <= 3
                ? true
                : false
            : liveNeighborCount === 3
                ? true
                : false
    }
}

export function step(previous) {

    let willLive = cellStepper(previous)

    return _(previous)
        .map(neighborsOf)
        .flatten()
        .uniqBy(JSON.stringify)
        .filter(willLive)
        .value()

}

function isIn(view) {
    const { startX, startY, endX, endY } = view
    return (cell) => cell[X] >= startX && cell[X] <= endX && cell[Y] >= startY && cell[Y] <= endY
}

export function visibleCells(allCells, view) {
    const isVisible = isIn(view)
    return allCells
        .filter(isVisible)
}

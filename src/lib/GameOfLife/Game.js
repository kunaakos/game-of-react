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
    return (cell) => {
        let liveNeighborCount = countLiveCells(neighborsOf(cell), liveCells)
        return isAmong(liveCells, cell)
            ? liveNeighborCount >= 2 && liveNeighborCount <= 3
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

function isIn(viewport) {
    const { origin, width, height } = viewport
    const end = [
        origin[X] + width,
        origin[Y] + height
    ]
    return (cell) =>
        cell[X] >= origin[X] &&
        cell[X] < end[X] &&
        cell[Y] >= origin[Y] &&
        cell[Y] < end[Y]
}

export function clip(cells, viewport) {
    const isVisible = isIn(viewport)
    return cells
        .filter(isVisible)
}

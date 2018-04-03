export const BLINKER = [[1, 0], [1, 1], [1, 2]]
export const GLIDER = [[2, 0], [2, 1], [2, 2], [1, 2], [0, 1]]
export const LIGHT_SPACESHIP = [[2, 0], [4, 0], [1, 1], [1, 2], [1, 3], [4, 3], [1, 4], [2, 4], [3, 4]]

export const X = 0
export const Y = 1

export const NEIGHBOR_OFFSETS = [
    [0, -1], // above
    [1, -1], // above right
    [1, 0], // right
    [1, 1], // below right 
    [0, 1], // below
    [-1, 1], // below left  
    [-1, 0], // left
    [-1, -1], // above left 
]

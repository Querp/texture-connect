//  Indexes
//  0: top-left         1 : top          2: top-right
//  7: left             99: center       3: right
//  6: bottom-left      5 : bottom       4: bottom-right

export class Connections {
    constructor(x, y) {
        this.connections = {
            99: {
                label: "center",
                pos: { x: x, y: y },
                connections: [],
            },
            0: {
                label: "top-left",
                pos: { x: x - 1, y: y - 1 },
                connections: [],
            },
            1: {
                label: "top",
                pos: { x: x, y: y - 1 },
                connections: [],
            },
            2: {
                label: "top-right",
                pos: { x: x + 1, y: y - 1 },
                connections: [],
            },
            3: {
                label: "right",
                pos: { x: x + 1, y: y },
                connections: [],
            },
            4: {
                label: "bottom-right",
                pos: { x: x + 1, y: y + 1 },
                connections: [],
            },
            5: {
                label: "bottom",
                pos: { x: x, y: y + 1 },
                connections: [],
            },
            6: {
                label: "bottom-left",
                pos: { x: x - 1, y: y + 1 },
                connections: [],
            },
            7: {
                label: "left",
                pos: { x: x - 1, y: y },
                connections: [],
            },
        };
    }
}

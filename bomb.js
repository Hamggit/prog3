class bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.timer = 0;
        this.directions = [
            [this.x, this.y],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y],
            [this.x - 2, this.y],

        ];

    }

    explode() {
        let found = []
        this.timer++
        if (this.timer == 5 && found) {
            for (let i = 0; i < this.directions.length; i++) {
                let x = this.directions[i][0]
                let y = this.directions[i][1]
                if (x !== undefined && x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                    found.push(this.directions[i])
                    for (let i = 0; i < found[0].length; i++) {
                        matrix[y][x] = 0
                    }
                    
                }
            }
        }

    }
}
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiplay = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    }

    search(character) {
        let found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;

    }
    mul() {
        let found = this.search(0)
        let foundRand = random(found)
        this.multiplay++
        if (this.multiplay >= 10 && foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 1
            let gr1 = new Grass(x, y)
            grassArr.push(gr1)
            this.multiplay = 0

        }
    }
}

class GrassEater {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];

    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    search(character) {
        this.getNewCoordinates()
        let found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let found = this.search(0)
        let foundRand = random(found)
        if (foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 2
            let gr1 = new GrassEater(x, y)
            GrassEaterArr.push(gr1)
            this.energy = 8


        }

    }
    move() {
        this.energy-=2
        let found = this.search(0)
        let foundRand = random(found)
        if (foundRand && this.energy >= 0) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
        } else {
            this.die()
        }
    }

    eat() {
        let found = this.search(1)
        let foundRand = random(found)
        if (foundRand) {
            this.energy++
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            this.x = x
            this.y = y
            for (let i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 20) {
                this.mul()
            }
        } else {
            this.move()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (var i in GrassEaterArr) {
            if (this.x == GrassEaterArr[i].x && this.y == GrassEaterArr[i].y) {
                GrassEaterArr.splice(i, 1);
                break;
            }
        }

    }
}
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 4;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    search(char) {
        this.getNewCoordinates();
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }
    move() {
        this.energy--;
        let found = this.search(0);
        let foundRand = random(found);
        if (foundRand && this.energy > 0) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        else {
            this.die()
        }
    }
    mul() {
        let found = this.search(0);
        let foundRand = random(found);
        if (foundRand) {
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            let newPredator = new Predator(x, y);
            GrassEaterArr.push(newPredator);
            this.energy = 4;
        }
    }
    eat() {
        let found = this.search(1);
        let foundRand = random(found);
        let found1 = this.search(2);
        let foundRand1 = random(found1);
        if (foundRand) {
            this.energy++;
            let x = foundRand[0];
            let y = foundRand[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }


            if (this.energy >= 15) {
                this.mul();

            }
        }
        else if (foundRand1) {
            this.energy++;
            let x = foundRand1[0];
            let y = foundRand1[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            for (var i in GrassEaterArr) {
                if (x == GrassEaterArr[i].x && y == GrassEaterArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }
            }


            if (this.energy >= 15) {
                this.mul();

            }
        } else {
            this.move();
        }
    }
    die() {

        matrix[this.y][this.x] = 0;
        for (var i in predatorArr) {
            if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}
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
class water{
        constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    search(character) {
        let found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix.length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    GrassCreate(){
        let found = this.search(0)
        let foundRand = random(found)
        this.energy--
        if (this.energy >= 0 && foundRand) {
            let x = foundRand[0]
            let y = foundRand[1]
            matrix[y][x] = 1
            grassArr.push(new Grass(x,y))

    }else{
        this.die()
    }
}
    die() {
        for (var i in waterArr) {
            if (this.x == waterArr[i].x && this.y == waterArr[i].y) {
                matrix[this.y][this.x] = 0
                waterArr.splice(i, 1);
                break;
            }
        }
    
     
    }
}
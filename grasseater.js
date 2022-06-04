class GrassEater extends LivingCreature{
    constructor(x, y) {
        super(x,y)
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

search(ch){
    this.getNewCoordinates();
    return super.search(ch)

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
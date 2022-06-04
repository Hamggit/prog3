class Predator extends LivingCreature{
    constructor(x, y) {
        super(x,y)
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

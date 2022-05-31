let matrix = []


function createMatrix(matlen) {

    for (let i = 0; i < matlen; i++) {
        matrix[i] = []
        for (let j = 0; j < matlen; j++) {
            matrix[i][j] = 0
        }
    }
}

function fills(gr) {
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * 80)
        let y = Math.floor(Math.random() * 80)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
        }
    }
}

function fills1(gr) {
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * 80)
        let y = Math.floor(Math.random() * 80)
        if (matrix[y][x] == 0 || 1) {
            matrix[y][x] = 2
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                GrassEaterArr.push(gre)
            }
        }
    }
}

function fills2(gr) {
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * 80)
        let y = Math.floor(Math.random() * 80)
        if (matrix[y][x] == 0 || 1 || 2) {
            matrix[y][x] = 3
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                predatorArr.push(pr)
            }
        }
    }
}
function fills3(grs) {
    for (let i = 0; i < grs; i++) {
        let x = Math.floor(Math.random() * 80)
        let y = Math.floor(Math.random() * 80)
        if (matrix[y][x] == 0 || 1 || 2 || 3) {
            matrix[y][x] = 4
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 4) {
                let pr = new bomb(x, y)
                bombArr.push(pr)
            }
        }
    }

}
function fills4(gr) {
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * 80)
        let y = Math.floor(Math.random() * 80)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }
    }
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 5) {
                let gr = new water(x, y)
                waterArr.push(gr)
            }
        }
    }
}

createMatrix(80)

let side = 11
let grassArr = []
let GrassEaterArr = []
let predatorArr = []
let bombArr = []
let waterArr = []

function setup() {

    frameRate(10)
    createCanvas(side * matrix[0].length, side * matrix.length)
    background('#acacac')
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let gr = new Grass(x, y)
                grassArr.push(gr)
            }
            if (matrix[y][x] == 2) {
                let gre = new GrassEater(x, y)
                GrassEaterArr.push(gre)
            }
            if (matrix[y][x] == 3) {
                let pr = new Predator(x, y)
                predatorArr.push(pr)
            }
            if(matrix[y][x] == 4){
                let bm = new bomb(x,y)
                bombArr.push(bm)
            }
        }

    }
}

function draw() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            } else if (matrix[y][x] == 2) {
                fill("yellow")
            } else if (matrix[y][x] == 3) {
                fill("red")
            }else if (matrix[y][x] == 4) {
                fill("black")
            }else if(matrix[y][x] == 5){
                fill("blue")
            }

            rect(x * side, y * side, side, side);
        }
    }


    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in GrassEaterArr) {
        GrassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for(let i in bombArr){
        bombArr[i].explode()
    }
    for(let i in waterArr){
        waterArr[i].GrassCreate()
    }
    
} 


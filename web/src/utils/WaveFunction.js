import {add, matrix} from "mathjs";


export class WaveFunction {
    //the index of the delta is also the name of the face
    static deltaXY = [
        matrix([[0], [-1]]),
        matrix([[-1], [0]]),
        matrix([[0], [1]]),
        matrix([[1], [0]]),
    ]
    _numTiles = 0
    _tiles = null //array [i][j] storing the tiles to give to the app
    _tileSuperPositions = null //array [i][j] that stores the superpositions of each tile
    _tileSocketInfo = null //key: tileName, value: map of socket -> socketID
    _tileAdjInfo = null //key: tileName, value: listOfGoodNeighbors
    _tileIsObserved = null

    constructor(numTiles, tileSocketInfo) {
        this._numTiles = numTiles
        this._tiles = new Array(this._numTiles)
        this._tileSuperPositions = new Array(this._numTiles)
        this._tileIsObserved = new Array(this._numTiles)
        this._tileSocketInfo = tileSocketInfo;
        this._tileAdjInfo = this.generateTileAdjInfo()
        for(let i = 0; i < this._numTiles; i++) {
            this._tiles[i] = new Array(this._numTiles)
            this._tileSuperPositions[i] = new Array(this._numTiles)
            this._tileIsObserved[i] = new Array(this._numTiles)
            for(let j = 0; j < this._numTiles; j++) {
                this._tileIsObserved[i][j] = false;
                this._tiles[i][j] = {"x": i, "y": 0, "z": j, "type": "empty"}
                this._tileSuperPositions[i][j] = new Set() //set that stores available positions
                Object.keys(this._tileSocketInfo).forEach((tileName) => {
                    this._tileSuperPositions[i][j].add(tileName)
                })
            }
        }
    }

    gridCoordinateOutOfBounds(gridCoordinates) {
        const x = gridCoordinates.get([0, 0])
        const z = gridCoordinates.get([1, 0])
        return (x < 0 || z < 0 || x >= this._numTiles || z >= this._numTiles)
    }

    generateTileAdjInfo() {
        const tileData = {};
        const tileList = Object.keys(this._tileSocketInfo)
        for(let i = 0; i < tileList.length; i++) {
            const tileName = tileList[i];
            const tileInfo = this._tileSocketInfo[tileName]

            //init DS
            tileData[tileName] = {}

            for(let socket = 0; socket < 4; socket++) {
                //init the list for adj
                tileData[tileName][socket] = new Set()
            }

            //search other tiles for compatible sockets
            //loop over other tiles, if (socket + 2) % 4 matches socket, add it to each other adj
            for(let socket = 0; socket < 4; socket++) {
                let otherSocket = (socket + 2) % 4

                for(let j = i; j >= 0; j--) {
                    const otherTileName = tileList[j];
                    const otherTileInfo = this._tileSocketInfo[otherTileName]

                    //checks if the other tile's corresponding socket has matching sockets
                    //can rewrite with sets if required, this is expensive
                    if (otherTileInfo[otherSocket] === tileInfo[socket]) {
                        if (!tileData[tileName][socket].has(otherTileName)) {
                            tileData[tileName][socket].add(otherTileName)
                        }
                        if (!tileData[otherTileName][otherSocket].has(tileName)) {
                            tileData[otherTileName][otherSocket].add(tileName)
                        }
                    }
                }
            }
        }
        return tileData
    }

    iterate() {
        //get position with lowest entropy, picking one at random
        const listOfTilesByEntropy = []
        for(let i = 0; i < this._numTiles; i++) {
            for(let j = 0; j < this._numTiles; j++) {
                if (this._tileIsObserved[i][j]) continue;
                listOfTilesByEntropy.push({"entropy": this._tileSuperPositions[i][j].size, "position": matrix([[i], [j]])})
            }
        }

        if(listOfTilesByEntropy.length === 0) return false;
        //sort by lowest entropy
        listOfTilesByEntropy.sort((a, b) => {
            return a.entropy - b.entropy
        })
        const lowestEntropy = listOfTilesByEntropy[0].entropy
        //remove all tiles that don't have lowest entropy
        const listOfTilesWithLowestEntropy = listOfTilesByEntropy.filter((tile) => {
            return tile.entropy === lowestEntropy
        })

        const randomIndex = Math.floor(Math.random() * listOfTilesWithLowestEntropy.length);
        this._tileIsObserved[listOfTilesWithLowestEntropy[randomIndex].position.get([0,0])][listOfTilesWithLowestEntropy[randomIndex].position.get([1,0])] = true
        this.observe(listOfTilesWithLowestEntropy[randomIndex].position)
        return true;
    }

    observe(tileCoordinates) {
        //look at tile coordinates, select one from superpositions
        // console.log('observing ' + tileCoordinates.get([0,0]) + ' ' + tileCoordinates.get([1,0]))
        const superPositions = this._tileSuperPositions[tileCoordinates.get([0,0])][tileCoordinates.get([1,0])]
        const superPositionsAsArray = Array.from(superPositions)
        const randomPosition = Math.floor(Math.random() * superPositionsAsArray.length)
        superPositions.clear()
        superPositions.add(superPositionsAsArray[randomPosition])

        this._tiles[tileCoordinates.get([0,0])][tileCoordinates.get([1,0])].type = superPositionsAsArray[randomPosition]
        this.propagate(tileCoordinates)
    }

    propagate(tileCoordinates) {
        //remove all not in adj from tileCoordinates
        // console.log('propagating ' + tileCoordinates.get([0,0]) + ' ' + tileCoordinates.get([1,0]))
        const stack = []
        stack.push(tileCoordinates)
        while (stack.length > 0) {
            const currentTileCoordinates = stack.pop()
            const currentTileSuperPositions = this._tileSuperPositions[currentTileCoordinates.get([0,0])][currentTileCoordinates.get([1,0])]
            for(let i = 0; i < 4; i++) {
                const neighborTileCoordinates = add(currentTileCoordinates, WaveFunction.deltaXY[i])
                if(this.gridCoordinateOutOfBounds(neighborTileCoordinates)) continue;

                //currentTile's i face points to the neighbor
                //neighbor's (i + 2) % 4  face points to current tile
                const neighborSuperPositions = this._tileSuperPositions[neighborTileCoordinates.get([0,0])][neighborTileCoordinates.get([1,0])]

                //for each neighbor position, it must be adjacent to one of the current positions
                //if one of current positions contains the neighbor, mark it to be saved
                neighborSuperPositions.forEach((neighborPosition) => {
                    let removeFlag = true;
                    currentTileSuperPositions.forEach((currentPosition) => {
                        if (this._tileAdjInfo[currentPosition][i].has(neighborPosition)) {
                            removeFlag = false;
                        }
                    })
                    if(removeFlag) {
                        neighborSuperPositions.delete(neighborPosition)
                    }
                })
            }
        }
    }

    //getters
    get tiles() {
        return this._tiles
    }

    get tileSocketInfo() {
        return this._tileSocketInfo
    }

    get tileAdjInfo() {
        return this._tileAdjInfo
    }

    get tileSuperPositions() {
        return this._tileSuperPositions
    }
}

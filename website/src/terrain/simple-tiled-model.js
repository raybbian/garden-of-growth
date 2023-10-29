import {Model} from './model'

/**
 *
 * @param {object} data Tiles, subset and constraints definitions
 * @param {string} subsetName Name of the subset to use from the data, use all tiles if falsy
 * @param {int} width The width of the generation
 * @param {int} height The height of the generation
 * @param {boolean} periodic Whether the source image is to be considered as periodic / as a repeatable texture
 *
 * @constructor
 */
export const SimpleTiledModel = function SimpleTiledModel (data, subsetName, width, height, periodic) {

  this.FMX = width;
  this.FMY = height;
  this.FMXxFMY = width * height;

  this.periodic = periodic;

  this.tiles = [];
  this.tileLimits = [];
  this.weights = [];
  this.propagator = new Array(4);
  this.T = data.tiles.length

  for (let dir = 0; dir < 4; dir++) {
    this.propagator[dir] = new Array(data.tiles.length)
    for (let i = 0; i < data.tiles.length; i++) {
      this.propagator[dir][i] = []
    }
  }

  for (let i = 0; i < data.tiles.length; i++) {
    const tile = data.tiles[i];
    this.tiles[i] = tile.name;

    this.weights.push(tile.weight || 1)
    this.tileLimits.push(tile.limit || Infinity)

    let ban = new Array(4)
    if (tile.ban) ban = [tile.ban.u, tile.ban.l, tile.ban.d, tile.ban.r]

    const sockets = [tile.u, tile.l, tile.d, tile.r]
      for(let j = i; j >= 0; j--) {
        const oTile = data.tiles[j]

        const oSockets = [oTile.d, oTile.r, oTile.u, oTile.l]
        //check if reversed socket is in oSockets[i]
        for(let dir = 0; dir < 4; dir++) {

          if (ban[dir] && ban[dir].includes(oTile.name)) continue

          for(let s = 0; s < sockets[dir].length; s++) {
            const reversedName = [...sockets[dir][s]].reverse().join("")
            if (oSockets[dir].includes(reversedName)) {
              //add to propagator
              this.propagator[dir][i].push(j)
              this.propagator[(dir + 2) % 4][j].push(i)
            }
          }

      }
    }
  }
};

SimpleTiledModel.prototype = Object.create(Model.prototype);
SimpleTiledModel.prototype.constructor = SimpleTiledModel;

/**
 *
 * @param {int} x
 * @param {int} y
 *
 * @returns {boolean}
 *
 * @protected
 */
SimpleTiledModel.prototype.onBoundary = function (x, y) {
  return !this.periodic && (x < 0 || y < 0 || x >= this.FMX || y >= this.FMY);
};

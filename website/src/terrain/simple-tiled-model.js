import {Model} from './model'
import test from "./japanese";

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
    this.propagator[dir] = new Array(this.T)
    for (let i = 0; i < this.T; i++) {
      this.propagator[dir][i] = []
    }
  }

  const tileToIdx = {}

  for (let i = 0; i < this.T; i++) {
    const tile = data.tiles[i];
    this.tiles[i] = tile.name;
    this.weights[i] = tile.weight
    this.tileLimits[i] = tile.count
    tileToIdx[tile.name] = i;
  }

  for (let i = 0; i < this.T; i++) {
    const tile = data.tiles[i];
    tile.adj.tl.forEach((tile) => {
      this.propagator[0][i].push(tileToIdx[tile]);
    })
    tile.adj.bl.forEach((tile) => {
      this.propagator[1][i].push(tileToIdx[tile]);
    })
    tile.adj.br.forEach((tile) => {
      this.propagator[2][i].push(tileToIdx[tile]);
    })
    tile.adj.tr.forEach((tile) => {
      this.propagator[3][i].push(tileToIdx[tile]);
    })
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

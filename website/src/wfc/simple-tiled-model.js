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

/*
/!**
 * Retrieve the RGBA data
 *
 * @param {Array|Uint8Array|Uint8ClampedArray} [array] Array to write the RGBA data into (must already be set to the correct size), if not set a new Uint8Array will be created and returned
 * @param {Array|Uint8Array|Uint8ClampedArray} [defaultColor] RGBA data of the default color to use on untouched tiles
 *
 * @returns {Array|Uint8Array|Uint8ClampedArray} RGBA data
 *
 * @public
 *!/
SimpleTiledModel.prototype.graphics = function (array, defaultColor) {
  array = array || new Uint8Array(this.FMXxFMY * this.tilesize * this.tilesize * 4);

  if (this.isGenerationComplete()) {
    this.graphicsComplete(array);
  } else {
    this.graphicsIncomplete(array, defaultColor);
  }

  return array;
};

/!**
 * Set the RGBA data for a complete generation in a given array
 *
 * @param {Array|Uint8Array|Uint8ClampedArray} [array] Array to write the RGBA data into, if not set a new Uint8Array will be created and returned
 *
 * @protected
 *!/
SimpleTiledModel.prototype.graphicsComplete = function (array) {
  for (let x = 0; x < this.FMX; x++) {
    for (let y = 0; y < this.FMY; y++) {
      const tile = this.tiles[this.observed[x + y * this.FMX]];

      for (let yt = 0; yt < this.tilesize; yt++) {
        for (let xt = 0; xt < this.tilesize; xt++) {
          const pixelIndex = (x * this.tilesize + xt + (y * this.tilesize + yt) * this.FMX * this.tilesize) * 4;
          const color = tile[xt + yt * this.tilesize];

          array[pixelIndex] = color[0];
          array[pixelIndex + 1] = color[1];
          array[pixelIndex + 2] = color[2];
          array[pixelIndex + 3] = color[3];
        }
      }
    }
  }
};

/!**
 * Set the RGBA data for an incomplete generation in a given array
 *
 * @param {Array|Uint8Array|Uint8ClampedArray} [array] Array to write the RGBA data into, if not set a new Uint8Array will be created and returned
 * @param {Array|Uint8Array|Uint8ClampedArray} [defaultColor] RGBA data of the default color to use on untouched tiles
 *
 * @protected
 *!/
SimpleTiledModel.prototype.graphicsIncomplete = function (array, defaultColor) {
  if (!defaultColor || defaultColor.length !== 4) {
    defaultColor = false;
  }

  for (let x = 0; x < this.FMX; x++) {
    for (let y = 0; y < this.FMY; y++) {
      const w = this.wave[x + y * this.FMX];
      let amount = 0;
      let sumWeights = 0;

      for (let t = 0; t < this.T; t++) {
        if (w[t]) {
          amount++;
          sumWeights += this.weights[t];
        }
      }

      const lambda = 1 / sumWeights;

      for (let yt = 0; yt < this.tilesize; yt++) {
        for (let xt = 0; xt < this.tilesize; xt++) {
          const pixelIndex = (x * this.tilesize + xt + (y * this.tilesize + yt) * this.FMX * this.tilesize) * 4;

          if (defaultColor && amount === this.T) {
            array[pixelIndex] = defaultColor[0];
            array[pixelIndex + 1] = defaultColor[1];
            array[pixelIndex + 2] = defaultColor[2];
            array[pixelIndex + 3] = defaultColor[3];
          } else {
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;

            for (let t = 0; t < this.T; t++) {
              if (w[t]) {
                const c = this.tiles[t][xt + yt * this.tilesize];
                const weight = this.weights[t] * lambda;
                r+= c[0] * weight;
                g+= c[1] * weight;
                b+= c[2] * weight;
                a+= c[3] * weight;
              }
            }

            array[pixelIndex] = r;
            array[pixelIndex + 1] = g;
            array[pixelIndex + 2] = b;
            array[pixelIndex + 3] = a;
          }
        }
      }
    }
  }
};*/

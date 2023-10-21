const Jimp = require('jimp/browser/lib/jimp')

function loadTileBitmapData (basePath, tile, number) {
    const unique = number !== null;
    const tilePath = basePath + tile.name + (unique ? ' ' + number : '') + '.png';

    console.log('loading ' + tilePath)

    return Jimp.read(tilePath).then(function (result) {
        if (unique) {
            tile.bitmap[number] = new Uint8Array(result.bitmap.data); //add the bitmap data in each tile variant
        } else {
            tile.bitmap = new Uint8Array(result.bitmap.data); //add the bitmap data in each tile
        }

        return true;
    });
}

export function addBitmapDataToStructure (structure, callback) {
    const promises = [];
    const path = structure.path;
    const unique = !!structure.unique;

    structure.tiles.map(function (tile) {
        if (unique) {
            if (tile.symmetry === 'X') {
                tile.bitmap = new Array(1);
                promises.push(loadTileBitmapData(path, tile, 0));
            } else {
                tile.bitmap = new Array(4);
                promises.push(loadTileBitmapData(path, tile, 0));
                promises.push(loadTileBitmapData(path, tile, 1));
                promises.push(loadTileBitmapData(path, tile, 2));
                promises.push(loadTileBitmapData(path, tile, 3));
            }
        } else {
            promises.push(loadTileBitmapData(path, tile, null));
        }
    });

    Promise.all(promises).then(function () {
        callback(null, structure);
    }, function (error) {
        callback(error, null);
    });
}


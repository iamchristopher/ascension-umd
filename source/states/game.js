// https://phaser.io/examples/v2/bitmapdata/draw-sprite
// https://phaser.io/phaser3/devlog/99

import qs from 'querystring';
import Pathfinder from '../components/Pathfinder';
import PawnManager from '../components/PawnManager';

let controls;
let pathfinder;
let sprite;
let busy = false;

export function preload () {
    this.load.tilemapTiledJSON('map', '/source/data/map/level_01.json');
    this.load.image('tiles', '/source/assets/tile/level01.png');
    this.load.image('player', '/source/assets/pawn/skeleton.png');
}

export function update (time, delta) {}

export function create () {
    const {
        room,
        x = 50,
        y = 50
    } = qs.parse(window.location.search.substr(1));
    const store = window.AscensionStore || {
        getState: () => ({ user: {} }),
        subscribe: () => {},
        dispatch: () => {}
    };

    const {
        user
    } = store.getState();

    const tilemap = this.make.tilemap({
        key: 'map'
    });
    const tileset = tilemap.addTilesetImage('level01', 'tiles');
    const levelData = tilemap.createStaticLayer('map', tileset);
    const blockedLayer = tilemap.createStaticLayer('blocked', tileset);

    pathfinder = Pathfinder.init({
        tilesPerRow: tilemap.width,
        map: levelData.layer.data,
        blocked: blockedLayer.layer.data
    });
    const pawnManager = new PawnManager({
        scene: this,
        store,
        pathfinder
    });
    sprite = pawnManager.add({
        owner: user.session,
        position: {
            x: parseInt(x, 10),
            y: parseInt(y, 10)
        },
        sync: true
    });
    pawnManager.add({
        owner: user.session,
        position: {
            x: parseInt(300, 10),
            y: parseInt(300, 10)
        },
        sync: true
    });
}

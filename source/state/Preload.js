export default class {
    constructor () {
        this.ready = false;
        this.loader;
    }

    preload () {
        this.loader = this.add.sprite(0, 0, 'loader');

        const gridData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAYklEQVRoQ+3RIQ6AQBAEQY7w/y8vFkOwfaRKrRjT2TUzc/zA+TXYxfW41+tqA7/5iJAaITVCaoTUCKkRUiOkRkiNkBohNUJqhNQIqRFSI6RGSI2QGiE1QmqE1AipEVIjpOYGrcgEY9lLRGgAAAAASUVORK5CYII=';
        const background = new Image();

        background.src = gridData;
        this.game.cache.addImage('grid', gridData, background);

        this.load.image('background', 'source/assets/scene/star_field.png');
        this.load.image('player_pawn', 'source/assets/pawn/nathan.png');
        this.game.load.tilemap('level02', 'source/data/map/level02.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('map_image', 'source/assets/tile/level01.png');

        this.load.onLoadComplete.add(() => this.ready = true);
    }

    update () {
        if (!this.ready) {
            return;
        }

        this.state.start('Game');
    }
}

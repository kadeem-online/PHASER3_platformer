/**
 *
 * test-level-01.ts: This scene is for use to test basic aspects of the gameplay.
 *
 */

// phaser
import Phaser from "phaser";

// utilities
import { ASSETS, SCENES } from "../util/variables";

export default class PrototypeLevel extends Phaser.Scene {
	// Variables
	layer_level_outline!: Phaser.Tilemaps.TilemapLayer;
	level_tilemap!: Phaser.Tilemaps.Tilemap;

	constructor() {
		super(SCENES.prototype_level);
	}

	create() {
		this.__CREATE_level_tilemap();
	}

	__CREATE_level_tilemap(): void {
		try {
			// create map
			this.level_tilemap = this.make.tilemap({
				key: ASSETS.TILEMAP.prototype_level,
			});

			// create tileset
			const prototype_tileset = this.level_tilemap.addTilesetImage(
				"prototype-tileset",
				ASSETS.SPRITESHEET.prototype_tiles
			);

			if (!prototype_tileset) {
				throw new Error("Prototype tileset is null");
			}

			// create layers
			this.__CREATE_layer_level_outline(this.level_tilemap, prototype_tileset);
		} catch (error) {
			throw new Error(`${error}`);
		}
		return;
	}

	__CREATE_layer_level_outline(
		map: Phaser.Tilemaps.Tilemap,
		tileset: Phaser.Tilemaps.Tileset
	) {
		const layer = map.createLayer("level-outline", tileset);

		if (!layer) {
			throw new Error("outline_tilemap_layer is null");
		}

		layer.setCollisionByProperty({ colllides: true });
		this.layer_level_outline = layer;
	}

	/**
	 * Debug function to show that we are on the test_level_01 scene using a text
	 * banner.
	 */
	__DEBUG_banner() {
		const debug_text = this.add.text(
			Number(this.game.config.width) / 2,
			Number(this.game.config.height) / 2,
			"Test Level 01",
			{
				fontSize: 32,
				color: "#fafafa",
				stroke: "#272727",
				strokeThickness: 2,
			}
		);
		debug_text.setOrigin(0.5);
	}
}

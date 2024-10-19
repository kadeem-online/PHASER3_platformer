/**
 *
 * preload.ts: This file is in charge of loading the main game assets for the
 * game and displaying the loading progress to the player. It then transitions to
 * the next scene after load. Any assets you wish to use on the preload scene
 * should be preloaded in the boot scene and should be very lightweight.
 *
 */

// Phaser
import Phaser from "phaser";

// Utilities
import { ASSETS, SCENES } from "../util/variables";
import { UTIL_getPublicDirectoryURLPrefix } from "../util/functions";

// Assets
import SPRITESHEET_CHARACTERS from "../assets/images/tilemap-characters_packed.png";
import SPRITESHEET_PROTOTYPE_TILE from "../assets/images/tilemap-prototype_packed.png";
import TILEMAP_PROTOTYPE_LEVEL from "../assets/tilemaps/prototype-level.json";

export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super(SCENES.preload_scene);
	}

	/**
	 * Load game assets in this function.
	 */
	preload() {
		this.load.setBaseURL(UTIL_getPublicDirectoryURLPrefix());

		// characters and enemies spritesheet
		this.load.spritesheet(
			ASSETS.SPRITESHEET.characters,
			SPRITESHEET_CHARACTERS,
			{
				frameWidth: 24,
				frameHeight: 24,
				spacing: 0,
				margin: 0,
			}
		);

		// Load these if prototype env is set
		if (import.meta.env.VITE_SHOW_PROTOTYPE === "true") {
			// prototype spritesheet
			this.load.spritesheet(
				ASSETS.SPRITESHEET.prototype_tiles,
				SPRITESHEET_PROTOTYPE_TILE,
				{
					frameWidth: 18,
					frameHeight: 18,
					margin: 0,
					spacing: 0,
				}
			);

			// prototype level tilemap
			this.load.tilemapTiledJSON(
				ASSETS.TILEMAP.prototype_level,
				TILEMAP_PROTOTYPE_LEVEL
			);
		}
	}

	/**
	 * This function is run once preloading is complete.
	 */
	create() {
		this.__start_next_scene();
	}

	/**
	 * Changes to the next queued scene after the preloader.
	 */
	__start_next_scene() {
		this.scene.start(SCENES.prototype_level);
	}
}

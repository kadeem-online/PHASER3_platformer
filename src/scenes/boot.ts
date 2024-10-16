/**
 *
 * boot.ts: This scene is responsible for loading any assets required by the preload
 * scene such as a splashscreen or logo. These assets should be lightweight to
 * prevent delaying the showing of the preload scene.
 *
 */

// Phaser
import Phaser from "phaser";

// Utilities
import { SCENES } from "../util/variables";
import { UTIL_getPublicDirectoryURLPrefix } from "../util/functions";

// Assets
import IMG_DEBUG_TILE from "../assets/images/debug_tile.png";
import IMG_DEBUG_BACKGROUND from "../assets/images/debug_background.jpg";

export default class BootScene extends Phaser.Scene {
	constructor() {
		super(SCENES.boot_scene);
	}

	/**
	 * Preload any assets required by the preload scene here.
	 */
	preload() {
		this.load.setBaseURL(UTIL_getPublicDirectoryURLPrefix());
	}

	/**
	 * This function is run once any preloaded assets are ready.
	 */
	create() {
		this.__start_next_scene();
	}

	/**
	 * Changes to the next queued scene after the preloader.
	 */
	__start_next_scene() {
		this.scene.start(SCENES.preload_scene);
	}
}

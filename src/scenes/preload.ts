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
import { SCENES } from "../util/variables";
import { UTIL_getPublicDirectoryURLPrefix } from "../util/functions";

export default class PreloadScene extends Phaser.Scene {
	constructor() {
		super(SCENES.preload_scene);
	}

	/**
	 * Load game assets in this function.
	 */
	preload() {
		this.load.setBaseURL(UTIL_getPublicDirectoryURLPrefix());
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
		this.scene.start(SCENES.test_level_01);
	}
}

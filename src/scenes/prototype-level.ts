/**
 *
 * test-level-01.ts: This scene is for use to test basic aspects of the gameplay.
 *
 */

// phaser
import Phaser from "phaser";

// utilities
import { SCENES } from "../util/variables";

export default class PrototypeLevel extends Phaser.Scene {
	constructor() {
		super(SCENES.prototype_level);
	}

	create() {
		this.__DEBUG_banner();
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

import Phaser from "phaser";
import { SCENES } from "../util/variables";

export default class TestLevel01 extends Phaser.Scene {
	constructor() {
		super(SCENES.test_level_01);
	}

	create() {
		this.__DEBUG_banner();
	}

	__DEBUG_banner() {
		// confirm the scene is viewable
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

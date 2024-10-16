// SCENES
import BootScene from "./scenes/boot";
import PreloadScene from "./scenes/preload";
import TestLevel01 from "./scenes/test-level-01";

// Utilities
import { UTIL_getGameHTMLElement } from "./util/functions";
import { GAME_HEIGHT, GAME_WIDTH } from "./util/variables";

/**
 * Use to initialize the main game.
 *
 * @returns {Phaser.Game}
 */
export function runGame(): Phaser.Game | null {
	try {
		const game_element = UTIL_getGameHTMLElement();

		if (typeof game_element === "undefined" || game_element === null) {
			throw new Error("Failed to locate game element");
		}

		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			width: GAME_WIDTH,
			height: GAME_HEIGHT,
			parent: game_element,
			fullscreenTarget: game_element.parentElement || game_element,

			pixelArt: true,

			physics: {
				default: "arcade",
				arcade: {
					debug: true,
				},
			},

			scale: {
				mode: Phaser.Scale.ScaleModes.FIT,
				autoCenter: Phaser.Scale.CENTER_BOTH,
			},

			scene: [BootScene, PreloadScene, TestLevel01],
		};

		const game = new Phaser.Game(config);

		return game;
	} catch (error) {
		console.error("Failed to initialize game: ", error);
		return null;
	}
}

function onPageLoad() {
	runGame();
}

window.addEventListener("load", onPageLoad);

import { GAME_ELEMENT } from "./variables";

export function DEBUG_show_tilemap_layer_collisions(
	scene: Phaser.Scene,
	tilemapLayer: Phaser.Tilemaps.TilemapLayer,
	{
		lineWidth = 1,
		color = 0xff0000,
		alpha = 1,
	}: {
		lineWidth?: number;
		color?: number;
		alpha?: number;
	},
	collidingTileColor: Phaser.Display.Color = new Phaser.Display.Color(
		237,
		145,
		64,
		100
	),
	nonCollidingTileColor: Phaser.Display.Color | null = null,
	faceColor: Phaser.Display.Color = new Phaser.Display.Color(0, 255, 0, 200)
) {
	// create graphics
	const graphics = scene.add.graphics();

	// set oultine
	graphics.lineStyle(lineWidth, color, alpha);

	// render collision boxes for the collision layer
	tilemapLayer.renderDebug(graphics, {
		tileColor: nonCollidingTileColor,
		collidingTileColor,
		faceColor,
	});

	return;
}

/**
 * Returns a reference to the element that is to house the game, if the element
 * exists within the DOM it will be returned, otherwise it will return null. This
 * function is meant to help prevent placing the game at the base of the body if
 * the game element does not exist.
 *
 * @returns {HTMLElement|null}
 */
export function UTIL_getGameHTMLElement(): HTMLElement | null {
	return document.getElementById(GAME_ELEMENT);
}

/**
 * Returns the prefix for the public directory for the given build mode.
 */
export function UTIL_getPublicDirectoryURLPrefix(): string {
	// TODO: url for itch.io if needed
	if (import.meta.env.MODE === "itchio") {
		return "./";
	}

	// TODO: url for wordpress plugin
	if (import.meta.env.MODE === "wp") {
		try {
			if (typeof WORDPRESS_DATA === "undefined") {
				throw new Error("WORDPRESS_DATA is not defined");
			}

			return WORDPRESS_DATA?.PLUGIN_ASSET_URL || "";
		} catch (error) {
			console.error("Failed to get WordPress Asset URL: ", error);
		}
	}

	return "";
}

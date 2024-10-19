/**
 *
 * player.ts: this class creates a player gameobject which it the main way the player
 * will interact with the game world.
 *
 */

// phaser
import Phaser from "phaser";

// utilities
import { ASSETS, PLAYER } from "../../util/variables";
import { CharacterType } from "../../util/definitions";

export default class Player extends Phaser.Physics.Arcade.Sprite {
	// variables
	idleAnimation!: Phaser.Animations.Animation;
	walkAnimation!: Phaser.Animations.Animation;
	characterType: CharacterType;

	constructor(
		scene: Phaser.Scene,
		character: CharacterType | "RANDOM",
		x: number,
		y: number
	) {
		super(scene, x, y, ASSETS.SPRITESHEET.characters);
		this.characterType =
			character === "RANDOM" ? this.__random_character_selection() : character;
		this.__set_default_frame();
		this.__initialize_animations();
		this.__initialize_player();
	}

	/**
	 * Handles any actions to setup the player within the scene and physics world.
	 *
	 * @returns void
	 */
	private __initialize_player(): void {
		this.scene.add.existing(this);
		this.scene.physics.world.enable(this, Phaser.Physics.Arcade.DYNAMIC_BODY);

		if (this.body instanceof Phaser.Physics.Arcade.Body) {
			this.body.setSize(13, 20);
			this.body.setOffset(6, 4);
		}

		this.setGravityY(PLAYER.gravity);
		return;
	}

	/**
	 * Creates animations that are local to the player game object.
	 *
	 * @returns void
	 */
	private __initialize_animations(): void {
		// idle animation
		let idle_frame: number;
		switch (this.characterType) {
			case 1:
				idle_frame = 0;
				break;
			case 2:
				idle_frame = 2;
				break;
			case 3:
				idle_frame = 4;
				break;
			case 4:
				idle_frame = 6;
				break;
			case 5:
				idle_frame = 9;
				break;
		}

		const idle = this.anims.create({
			key: "idle",
			frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEET.characters, {
				frames: [idle_frame],
			}),
			frameRate: 1,
		});

		if (!idle) {
			throw new Error("failed to create player idle animation");
		}

		this.idleAnimation = idle;

		// walk animation
		let walk_frame_start: number;
		let walk_frame_end: number;
		switch (this.characterType) {
			case 1:
				walk_frame_start = 0;
				walk_frame_end = 1;
				break;
			case 2:
				walk_frame_start = 2;
				walk_frame_end = 3;
				break;
			case 3:
				walk_frame_start = 4;
				walk_frame_end = 5;
				break;
			case 4:
				walk_frame_start = 6;
				walk_frame_end = 7;
				break;
			case 5:
				walk_frame_start = 9;
				walk_frame_end = 10;
				break;
		}

		const walk = this.anims.create({
			key: "walk",
			frames: this.anims.generateFrameNumbers(ASSETS.SPRITESHEET.characters, {
				start: walk_frame_start,
				end: walk_frame_end,
			}),
			frameRate: 6,
			repeat: -1,
		});

		if (!walk) {
			throw new Error("failed to create player idle animation");
		}

		this.walkAnimation = walk;

		// set default animation
		this.play("idle");

		return;
	}

	/**
	 * Utitlity method for selecting a character type for the player object at random.
	 *
	 * @returns CharacterType
	 */
	private __random_character_selection(): CharacterType {
		const characterTypes: CharacterType[] = [1, 2, 3, 4, 5];
		const randomIndex = Math.floor(Math.random() * characterTypes.length);
		return characterTypes[randomIndex];
	}

	/**
	 * Sets the default frame for the player game object based on the character
	 * type.
	 *
	 * @returns void
	 */
	private __set_default_frame(): void {
		switch (this.characterType) {
			case 1:
				this.setFrame(0);
				break;
			case 2:
				this.setFrame(2);
				break;
			case 3:
				this.setFrame(4);
				break;
			case 4:
				this.setFrame(6);
				break;
			case 5:
				this.setFrame(9);
				break;
		}

		return;
	}
}

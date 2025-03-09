import { Howl } from "howler";

export const SFX = {
  COLLECT: "COLLECT",
  WIN: "WIN",
  TELEPORT: "TELEPORT",
  RUN: "RUN",
  LOSE: "LOSE",
  MENU: "MENU",
};

const SFX_FILES = {
  [SFX.COLLECT]: "/sfx/collect.mp3",
  [SFX.WIN]: "/sfx/win.mp3",
  [SFX.TELEPORT]: "/sfx/teleport.mp3",
  [SFX.RUN]: "/sfx/run.mp3",
  [SFX.LOSE]: "/sfx/lose.mp3",
  [SFX.MENU]: "/sfx/menu.mp3",
};

const THEME = "/sfx/themeSong.mp3";

export class Sounds {
  constructor() {
    this.howls = {};
    this.sfxVolume = 0.5;
    this.theme = null;
    this._isThemePlaying = false;
  }

  init() {
    Object.keys(SFX_FILES).forEach((key) => {
      const file = SFX_FILES[key];
      this.howls[key] = new Howl({
        src: [file],
      });
    });

    this.theme = new Howl({
      src: [THEME],
      loop: true,
      volume: 0.5,
    });
  }

  playSfx(key) {
    // Reference our sound in memory
    const howl = this.howls[key];

    // Play it with current volume setting
    howl.volume(this.sfxVolume);
    howl.play();
  }

  //*******************Theme Songs  */
  playTheme() {
    const themeHowl = this.theme;
    if (themeHowl && !this._isThemePlaying) {
      themeHowl.play();
      this._isThemePlaying = true;
    }
  }

  stopTheme() {
    const themeHowl = this.theme;
    if (themeHowl) {
      themeHowl.stop();
    }
    this._isThemePlaying = false;
  }

  get isThemePlaying() {
    return this._isThemePlaying;
  }

  setVolume(volume) {
    this.sfxVolume = volume;
    Object.values(this.howls).forEach((howl) => howl.volume(volume));
  }
}

const soundsManager = new Sounds();

export default soundsManager;

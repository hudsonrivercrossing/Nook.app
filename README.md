<p align="center">
  <img src="dist/assets/nook-icon.png" alt="Nook" width="96" height="96">
</p>

# Nook

A calm place for the few projects that matter.

[Website](https://hudsonrivercrossing.github.io/Nook.app/) · [Download for Mac](https://github.com/hudsonrivercrossing/Nook.app/releases/latest/download/Nook.dmg) · [Field notes](https://hudsonrivercrossing.github.io/Nook.app/blog/)

Nook is a board app for macOS. Paste a link and it becomes a card with its preview. Drop in images, write notes, group them in regions and columns, and draw arrows between them. Give each thing you're in the middle of its own board.

Every board is a plain file in a folder you choose. Put that folder in Dropbox and your boards sync like any other files. There's no account, and Nook collects nothing.

Requires macOS 15 or later, on Apple silicon or Intel.

## Install

1. Download `Nook.dmg`, open it and drag Nook into Applications.
2. Open Nook. The first time, macOS stops it because Nook isn't notarized by Apple. Go to System Settings › Privacy & Security, click **Open Anyway** under Security, and confirm.
3. To update, download the new DMG and drag Nook into Applications again to replace the old copy. Your boards stay where they are.

To check that your download matches the release, put `Nook.dmg` and `Nook.dmg.sha256` in the same folder and run:

```sh
shasum -a 256 -c Nook.dmg.sha256
```

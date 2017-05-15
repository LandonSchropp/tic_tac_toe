# Tic Tac Yo

A simple tic-tac-toe game. The main purpose of this project was for me to learn the Phaser game
engine.

## Commands

* `scripts/clean`: Remove the build artifacts.
* `scripts/build`: Build the project.
* `scripts/watch`: Watch the source files for changes and rebuild them. Also runs a small
  development server.
* `scripts/lint`: Run the project's linter.
* `scripts/test`: Run the project's tests.

### iOS

* `cordova requirements`: Ensures all of the dependencies for Cordova are installed.
* `cordova platform add ios`: Add iOS to the list of platforms.
* `cordova emulate ios`: Run the application in the iOS simulator.
* `cordova run ios`: Run the application on a connected iOS device.
* `cordova build ios --device --release`: Create a release `.ipa` build of the application for the
  App Store.

## Cordova Gotchas

There are a few gotchas in this project, all of which come with Cordova.

* The project's build directory must be `www`. Cordova doesn't allow you to configure a different
  directory.
* Whenever you run Cordova commands that update the packages, the formatting of the `config.xml` and
  `package.json` files gets screwed up. They must be fixed before they're committed.
* This project must use NPM. Cordova assumes you're using NPM, and bad things happen if you try to
  use Yarn instead.
* If you don't build the assets for the project before running any `cordova` commands, Cordova will
  complain that the project isn't Cordova-based.
* If you want to change the splash screen, you must re-add the platform from scratch. Rebuilding
  won't do it.
* The splash screen file can be located in any directory, but it must *exactly* follow the naming
  convention specified in the [repo](https://goo.gl/vQPVDr), or it won't work.
* If you run into an `Error: Error code 253 for command: ios-deploy` when running `cordova run ios`,
  it means the phone was locked. Unlock it before launching your app.

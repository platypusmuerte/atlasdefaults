# atlasdefaults
This will overwrite or update Atlas server files in the ShooterGame/Saved directory. Its intention is to simplify the process of updating a Game.ini in each of the grids, as the DefaultGame.ini should not be used.

## Usage
**npm install**

Installs the apps dependencies

**npm run help  
node help.js**

Shows the help contents

**npm run start  
node main.js**

Runs the app

## Config and Source Files
Create a data dir in app root, and add a config.json file, and any source files as explained in help. (if not already present)  
To update/append existing ini data, use merge: true in each config.

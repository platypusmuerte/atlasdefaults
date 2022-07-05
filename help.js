let chalk = require('chalk');
const { Utils } = require('./utils');
utils = new Utils();

let exampleconfig = [
	{
		"source":"Game.ini",
		"targetfile":"Game.ini",
		"gridfolderspath":"D:/testgrid",
		"folderstoignore":["A2","B5","B6","C7"]
	}
];


utils.line();
utils.log({msg:"[HELP]"});
utils.line();

utils.log({msg:"Your config belongs in the data folder, at the root of the app."});
utils.log({msg:"The data folder should contain a config.json file (explained below) and any files with the source content to update the target files with."});
utils.log({msg:"You will need to create these initially."});
utils.line();

utils.log({msg:"Example config.json file:"});
console.log(exampleconfig);

utils.line();
utils.log({msg:"The config JSON is an array, add as many config objects as needed in the array. ex: [{},{},{},...]"});
utils.line();
utils.log({msg:"config.source: 				This is the source content that will be used to overwrite the targets"});
utils.log({msg:"config.targetfile: 			This is the target file in the ShooterGame/Saved folders"});
utils.log({msg:"config.gridfolderspath: 		This is the path to the atlas ShooterGame/Saved directory."});
utils.log({msg:"config.folderstoignore: 		This is an array of folder names that will be skipped. The app will not look in these folders for a targetfile."});
utils.line();
utils.log({msg: "How to run: npm run start or node main.js"});
utils.line();
utils.log({msg:"Usage: Set files to writable, run the app, set files to read only."});
utils.line();
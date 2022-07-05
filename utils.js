let chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');


class Utils {
	constructor({} = {}) {
		this.exampleconfig = [
			{
				"source":"Game.ini", /* apppath/data/ - the contents of this file will replace the targetfile */
				"targetfile":"Game.ini", /* Game.ini, Engine.ini, or what ever file you intend to update */
				"gridfolderspath":"D:/path/to/shootergame/saved/folder", /* path to your server installation ShooterGame/Saved folder (folder with all the grids in them) */
				"folderstoignore":["A2","B1","B2","B7"] /* these folders will be skipped */
			}
		];
	}

	log({msg = "", color = "#ff9900"}) {
		console.log(chalk.hex(color)(msg));
	}

	line() {
		console.log(" ");
	}

	getConfig() {
		try {
			let config = fse.readJSONSync(path.join('./','/data/config.json'));
			
			this.log({msg:"Config loaded"});
		
			return config;
		} catch(e) {
			this.log({msg:"[ERROR] Failed to load config file " + e});
		}
	}

	getSrc({src = false}) {
		let file = path.join('./','/data/' + src);

		return new Promise((resolve, reject)=>{
			if(fse.pathExistsSync(file) && fse.statSync(file).isFile()) {
				resolve(fse.readFileSync(file, 'utf-8'));
			} else {
				this.log({msg:"[ERROR] Source file does not exist " + src});
				reject();
			}
		});		
	}

	confirmPath({filepath = false}) {
		return (fse.pathExistsSync(filepath));
	}

	writeToFile({file = "", contents = ""}) {
		try {
			fse.accessSync(file, fse.constants.W_OK);
			this.log({msg:"    success", color: "#00FF00"});

			fse.writeFileSync(file,contents);
			return true;
		} catch(e) {
			this.log({msg:"    not writable", color: "#FF0000"});
			return false;
		}		
	}
}

exports.Utils = Utils;
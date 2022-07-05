let chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');


class Utils {
	constructor({} = {}) {
		//this.buffer = new Buffer.alloc(1024);
	}

	log({msg = "", color = "#ff9900"}) {
		console.log(chalk.hex(color)(msg));
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
		let buffer = new Buffer.alloc(1024);
		let srcContents = false;

		return new Promise((resolve, reject)=>{
			fse.open(file, 'r', (err, fd) => {
				if(err) {
					this.log({msg:"[ERROR] Failed to open source " + err});
				}

				fse.read(fd, buffer, 0, buffer.length, 0, (err, bytes)=>{
					if (err) {
						this.log({msg:"[ERROR] Failed to read source " + err});
					}
		
					if (bytes > 0) {
						srcContents = buffer.slice(0, bytes).toString();
					}

					fse.close(fd, function (err) {
						if (err) {
							this.log({msg:"[ERROR] Failed to close source " + err});
						}
					});

					resolve(srcContents);
				});
			});
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
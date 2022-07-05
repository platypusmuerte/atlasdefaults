const fse = require('fs-extra');
const path = require('path');
const {Ini} = require('ini-api');

class ConfigWriter {
	constructor({src = "", config = {}, utils = {}} = {}) {
		this.srcContent = src;
		this.config = config;
		this.utils = utils;
	}

	run() {
		let dirContents = fse.readdirSync(path.join(this.config.gridfolderspath));

		this.loopFiles(dirContents).then((status)=>{
			if(status) {
				this.utils.log({msg:"Process finished. Dont forget to set files write only", color: "#00FF00"});
			} else {
				this.utils.log({msg:"Process had errors. Are all files writable?", color: "#FF0000"});
			}
		});		
	}

	loopFiles(files) {
		let status = true;

		return new Promise((resolve, reject)=>{
			files.forEach((f,i)=>{
				if(fse.statSync(path.join(this.config.gridfolderspath,f)).isFile()) {
					// skipp file
				} else {
					let targetPath = path.join(this.config.gridfolderspath,f,'/Config/WindowsServer/' + this.config.targetfile);

					if(!this.isIgnoredFolder(f) && fse.pathExistsSync(targetPath) && fse.statSync(targetPath).isFile()) {
						this.utils.log({msg:"Updating " + f + " " + this.config.targetfile});

						let fileContents = (this.config.merge) ? this.mergeFiles({srcContent: this.srcContent, targetPath: targetPath}):this.srcContent;

						status = (this.utils.writeToFile({file: targetPath, contents: fileContents})) ? status:false;						
					}
				}
			});

			resolve(status);
		});		
	}

	mergeFiles({srcContent = "", targetPath = ""}) {
		let existingConfig = new Ini(fse.readFileSync(targetPath).toString());
		let newConfig = new Ini(srcContent);

		return Ini.merge(existingConfig,newConfig).stringify();
	}

	isIgnoredFolder(f) {
		return this.config.folderstoignore.includes(f);
	}
}

exports.ConfigWriter = ConfigWriter;
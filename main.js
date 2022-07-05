const { Utils } = require('./utils');
const { ConfigWriter } = require('./configwriter');

let utils, config, configwriter;

utils = new Utils();


utils.log({msg:"[LOADING]"});


config = utils.getConfig();

console.log(config);


config.forEach((config)=>{
	utils.log({msg:"Processing Config for " + config.source});

	utils.getSrc({src: config.source}).then((srcContent)=>{
		if(srcContent) {
			if(utils.confirmPath({filepath: config.gridfolderspath})) {
				utils.log({msg:"Found grid folders path " + config.gridfolderspath});
	
				configwriter = new ConfigWriter({src: srcContent, config: config, utils: utils}).run();
			} else {
				utils.log({msg:"[ERROR] Failed to find grid folders path " + config.gridfolderspath});
			}
		}
	});	
});
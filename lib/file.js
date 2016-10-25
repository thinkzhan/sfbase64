var fs = require('fs');

module.exports = {
	isFile: function (filePath) {
		return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
	}
}
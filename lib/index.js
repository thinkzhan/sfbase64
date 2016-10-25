var fs = require('fs');
var path = require('path');
var fileUtil = require('./file');
var console = require('sfconsole')("INDEX");

module.exports = {
  run: function (config) {

    var pic = config.pic;
    var file = config.file;
    if (!pic) {
      console.err('Please use -p specific a picture !');
      return;
    }
    if (fileUtil.isFile(pic)) {
      if (!/\.(png|jpg|jpeg|gif)/i.test(pic)) {
        console.err(pic + ' is not pic !');
        return;
      }

      console.log('start....');
      var res = ['data:image/png;base64,'];
      var stream = fs.createReadStream(pic);

      stream.on('data', function (chunk) {
        res.push(new Buffer(chunk, 'binary').toString('base64'));
      });

      stream.on('end', function () {
        console.log('done!');
        console.info(res.join(''));
        if (file) {
          fs.writeFileSync(file, res.join(''));
        }

      });

    } else {
      console.err(pic + ' not exists !');
    }

  }
}
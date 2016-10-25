var fs = require('fs');
var path = require('path');
var fileUtil = require('./file');
var console = require('sfconsole')("INDEX");

module.exports = {
  run: function (config) {

    var input = config.input;
    var out = config.out;
    if (!input) {
      console.err('Please use -p specific a picture !');
      return;
    }
    if (fileUtil.isFile(input)) {
      if (!/\.(png|jpg|jpeg|gif)/i.test(input)) {
        console.err(input + ' is not pic !');
        return;
      }

      console.log('start....');
      var res = ['data:image/png;base64,'];
      var stream = fs.createReadStream(input);

      stream.on('data', function (chunk) {
        res.push(new Buffer(chunk, 'binary').toString('base64'));
      });

      stream.on('end', function () {
        console.log('done!');
        console.info(res.join(''));
        if (out) {
          fs.writeFileSync(out, res.join(''));
        }

      });

    } else {
      console.err(input + ' not exists !');
    }

  }
}
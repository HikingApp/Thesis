var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../client'))

var port = process.env.PORT || 8000;
app.set('port', port);
module.exports = app;

require('./config/middleware')(app, express);

app.listen(app.get('port'), function(){
  console.log("Applet listening on port " + port);
});

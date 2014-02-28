var express = require('express'),
    db = require('./utils').db,
    expConfig = require('./utils').express,
    app = express(), 
    routes = require('./routes');

db.on('error', function(err){
    console.log('db error ...', err);
});

// Express Config
expConfig(app);

routes(app);

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

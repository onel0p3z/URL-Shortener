var express = require('express')
    , mongoStore = require('connect-mongo')(express)
    , db = require('./utils').db
    , Url = require('./utils').Url
    , getShort = require('./utils').string
    , _ = require('lodash')
    , app = express()
    , routes = require('./routes')
    ;

db.on('error', function(err){
    console.log('db error ...', err);
});

app.configure(function(){
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: 'MEAN',
        store: new mongoStore({
            url: 'mongodb://localhost/shortener',
            collection: 'sessions'
        })
    }));
    //app.use(express.cookieSession());
    //app.use(express.csrf());
});

routes(app);

app.listen(8080, function(){
    console.log('Server started at 8080 ...');
});

var mongoose = require('mongoose'),
    express = require('express'),
    mongoStore = require('connect-mongo')(express),
    path = require('path');

//mongoose.connect('mongodb://koding:kC8wxQX2j41DBAi@ds037097.mongolab.com:37097/koding');
mongoose.connect('mongodb://localhost/shortener');

var urlSchema = new mongoose.Schema(
    {
        _id: String,
        url: String,
        shortcut: String,
        clicks: Number,
        user: String
    },
    { collection: 'urls' },
    { safe: 'safe' }
);

exports.db = mongoose.connection;
exports.Url = mongoose.model('url', urlSchema);
exports.string = function(){
    var set = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-',
        url = '',
        length = 5;

    for(var i = 0; i < length; i++){
        var p = Math.floor(Math.random() * set.length);
        url += set[p];
    };

    return url;
};
exports.express = function(app){
    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('views', path.join(__dirname + '/views'));
        app.set('view engine', 'jade');
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
        app.use(app.router);
        app.use(express.static(path.join(__dirname, 'public')));
        //app.use(express.cookieSession());
        //app.use(express.csrf());
    });
};

var mongoose = require('mongoose');

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


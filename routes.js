// TODO: modulerarize routes 

var _ = require('lodash'),
    inspect = require('util').inspect,
    Url = require('./utils').Url,
    getShort = require('./utils').string;

module.exports = function(app){
    app.get('/', function(req, res){
        Url.find().exec(function(err, docs){
            console.log('doc: ', docs);
            if(err){ 
                console.log(err);
                throw new Error(err);
            } else if(docs){
                res.json({ 'docs': docs });
            }
        });
    });

    app.get('/google', function(req, res){
        res.redirect('http://www.google.com');
    });

    app.get('/:url', function(req, res){
        var short = _.escape(req.params.url);
        
        Url.findOne({ '_id': short }).exec(function(err, doc){
            doc.clicks += 1;
            doc.save();
            console.log(inspect(doc, { depth: 8, colors: true }));
            if(err){ 
                console.log(err);
                res.json(500, {
                    msg: 'Internal error',
                    err: err
                });
            } else if(doc){
                res.redirect(doc.url);
            }
        });
    });

    app.post('/create', function(req, res){
        var url = _.escape(req.body.url),
        user = req.body.user,
        short = getShort();
        
        Url.findOne({ '_id': short }).lean().exec(function(err, doc){
            console.log('doc: ', doc);
            if(err){ 
                console.log(err);
                res.json(500, {
                    msg: 'Internal error',
                    err: err
                });
            } else if(doc){
                console.log('doc', doc);
                short = getShort();
            }
            
            var shortcut = new Url({
                '_id': short,
                'url': url,
                'user': user,
                'clicks': 1
            });
            
            shortcut.save(function(err){
                if(err){ 
                    console.log(err);
                    throw new Error(err);
                }

                res.json(201, {
                    '_id': short,
                    'url': _.unescape(url),
                    'user': user,
                    'clicks': 1
                });
            });
        });
    });
};

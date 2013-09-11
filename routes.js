var _ = require('lodash'), 
    Url = require('./utils').Url,
    getShort = require('./utils').string;

module.exports = function(app){
    app.get('/', function(req, res){
        res.json({
            'hello': 'app',
            'World': 'koding'
        });
    });

    app.get('/google', function(req, res){
        res.redirect('http://www.google.com');
    });

    app.get('/:url', function(req, res){
        var short = _.escape(req.params.url);
        
        Url.findOne({ '_id': short }).exec(function(err, doc){
            console.log('doc: ', doc);
            if(err){ 
                console.log(err);
                throw new Error;
            } else if(doc){
                // TODO: Increment clicks !!
                res.redirect(doc.url);
            };
        });
    });

    app.post('/create', function(req, res){
        var url = _.escape(req.body.url),
        user = req.body.user,
        short = getShort();
        //console.log('1', short);
        
        /*
        TODO: Check if URL to shorten is already in
        Url.find({ 'url': url }).lean().exec(function(err, doc){
            if(err){ console.log(err); throw New Error }
            else{ res.end('url already exists!'); };
        });
        */
        
        Url.findOne({ '_id': short }).lean().exec(function(err, doc){
            console.log('doc: ', doc);
            if(err){ 
                console.log(err);
                throw new Error;
            } else if(doc){
                console.log('doc', doc);
                short = getShort();
            };
            
            var shortcut = new Url({
                '_id': short,
                'url': url,
                'user': user,
                'clicks': 1
            });
            
            shortcut.save(function(err){
                if(err){ 
                    console.log(err);
                    throw new Error; 
                };
            
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

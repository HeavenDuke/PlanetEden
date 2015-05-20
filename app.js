/**
 * Created by heavenduke on 15-5-20.
 */

var restify = require('restify');
var config = require('./config').config;
var controllers = require('./controllers');
var restify_session = require('restify-session')({
    debug: true,
    ttl: 60 * 60
});

var server = restify.createServer({
    name: 'PlanetEden',
    version: '1.0.0'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify_session.sessionManager);

global.db = require('./database')(
    config.dbConfig.name,
    config.dbConfig.username,
    config.dbConfig.password,
    config.dbConfig.config
);

global.db.sync();


//user module
server.get('/users', controllers.user.getInfo);
server.post('/users', controllers.user.register);
server.delete('/users', controllers.user.logout);
server.put('/users/:user_id', controllers.user.updateInfo);
server.patch('/users/:user_id', controller.user.updatePassword);

//journal module
server.get('/journals', controllers.journal.getJournal);
server.get('/journals/:journal_id', controllers.journal.getList);
server.get('/journals/categories/:category_id', controllers.journal.getCategoryList);
server.post('/journals', controllers.journal.create);
server.put('/journals', controllers.journal.update);
server.delete('/journals/:journal_id', controllers.journal.delete);

//category module
server.get('/categories', controllers.category.getList);
server.post('/categories', controllers.category.create);
server.delete('/categories/:category_id', controllers.category.delete);
server.put('/categories/:category_id', controllers.category.update);

//music module
server.post('/musics', controllers.music.create);
server.get('/musics', controllers.music.getList);
server.delete('/musics/:music_id', controllers.music.delete);
server.put('/musics/:music_id', controllers.music.update);

server.get('/', function (req, res, next) {
    console.log(req.session);
    res.json({
        code: 1,
        message: 'hello!'
    });
});

server.listen(config.serverConfig.port, function () {
    console.log('%s listening at %s', server.name, server.url);
});
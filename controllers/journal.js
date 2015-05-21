/**
 * Created by heavenduke on 15-5-20.
 */
var config = require('../config').config;

exports.create = function (req, res, next) {
    var Journal = global.db.models.journal;
    var form = {
        title: req.body.title,
        content: req.body.content
    }
    Journal.create(form).then(function(journal) {
        res.json({
            journal_id: journal.id,
            message: 'success'
        });
    });
};

exports.update = function (req, res, next) {
    var journal_id = req.params.journal_id;
    var Journal = global.db.models.journal;
    Journal.find(journal_id).then(function(journal) {
        if(!journal) {
            throw new Error('日志不存在!');
        }
        if(req.body.title) journal.title = req.body.title;
        if(req.body.content) journal.content = req.body.content;
        journal.save().then(function() {
            res.json({
                message: 'success'
            });
        });
    });
};

exports.delete = function (req, res, next) {

};

exports.getList = function (req, res, next) {
    console.log(2333);
    var Journal = global.db.models.journal;
    var form = {
        page: req.body.page,
        limit: config.businessConfig.page_limit
    };
    Journal.findAll({
        order: [
            ['updated_at', 'DESC']
        ]
    }).then(function(journals) {
        res.json({
            message: 'success',
            list: journals
        });
    });
};

exports.getCategoryList = function (req, res, next) {

};

exports.getJournal = function (req, res, next) {

};

exports.comment = require('./journal.comment');

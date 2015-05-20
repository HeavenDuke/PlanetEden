/**
 * Created by heavenduke on 15-5-20.
 */

var Sequelize, models, path;

Sequelize = require('sequelize');

path = require('path');

models = require('./models');

module.exports = function (database, username, password, config) {
    var Category, Tag, User, Journal, Music, Comment;
    sequelize = new Sequelize(database, username, password, config);
    Category = sequelize["import"](path.join(__dirname, 'models/category'));
    Tag = sequelize["import"](path.join(__dirname, 'models/tag'));
    User = sequelize["import"](path.join(__dirname, 'models/user'));
    Journal = sequelize["import"](path.join(__dirname, 'models/journal'));
    Music = sequelize["import"](path.join(__dirname, 'models/music'));
    Comment = sequelize["import"](path.join(__dirname, 'models/comment'));

    Journal.hasMany(Tag);
    Journal.hasMany(Comment);
    Comment.belongsTo(Journal);
    Comment.hasMany(Comment, {
        constraint: false
    });
    Category.hasMany(Journal);

    return sequelize;
};
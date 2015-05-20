/**
 * Created by heavenduke on 15-5-20.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true
    });
};
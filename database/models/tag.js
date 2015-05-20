/**
 * Created by heavenduke on 15-5-20.
 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('tag', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        underscored: true
    });
};
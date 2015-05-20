/**
 * Created by heavenduke on 15-5-20.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('journal', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        heat: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        underscored: true
    });
};
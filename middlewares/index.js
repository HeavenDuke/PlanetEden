/**
 * Created by heavenduke on 15-5-21.
 */

exports.validateUserByBody = function(req, res, next) {
    if(req.session.uid == null || req.session.uid != req.body.user_id){
        throw new Error('Unauthorized Access');
    }
    next();
};

exports.validateUserByParam = function(req, res, next) {
    if(req.session.uid == null || req.session.uid != req.params.user_id){
        throw new Error('Unauthorized Access');
    }
    next();
};
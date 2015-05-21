/**
 * Created by heavenduke on 15-5-20.
 */

var passwordHash = require('password-hash');

exports.register = function(req,res,next) {
    var User = global.db.models.user;
    var form = {
        username: 'HeavenDuke',
        password: passwordHash.generate('win32.luhzu.a'),
        email: '773799131@qq.com',
        head: 'default.jpg',
        description: 'This is home for heaven duke',
        headline: 'In order to touch heaven, i will burn my soul.',
        institution: '北京航空航天大学',
        occupation: '学生'
    }
    User.create(form).then(function(user) {
        res.json({
            user_id: user.id
        });
    });
}

exports.login = function (req, res, next) {
    var User = global.db.models.user;
    var form = {
        username: req.body.username
    }
    User.find({
        where: form
    }).then(function(user) {
        if (!user) {
            throw new Error('用户不存在！');
        }
        if(!passwordHash.verify(req.body.password, user.password)) {
            throw new Error('密码错误！');
        }
        req.session.uid = user.id
        global.redis_client.set(req.session.sid, req.session);
        res.json({
            user_id: user.id,
            message: '登录成功！'
        });
    });
};

exports.updateInfo = function (req, res, next) {
    var User = global.db.models.user;
    User.find(user_id).then(function(user) {
        if(!user) {
            throw new Error('用户不存在！');
        }
        if(req.body.username) user.username = req.body.username;
        if(req.body.email) user.email = req.body.email;
        if(req.body.introduction) user.introduction = req.body.introduction;
        if(req.body.institution) user.institution = req.body.institution;
        if(req.body.occupation) user.occupation = req.body.occupation;
        if(req.body.headline) user.headline = req.body.headline;
        user.save().then(function() {
            res.json({
                message: 'success'
            });
        });
    });
};

exports.updatePassword = function (req, res, next) {
    var User = global.db.models.user;
    User.find(user_id).then(function(user) {
        if(!user) {
            throw new Error('用户不存在！');
        }
        if (!(req.body.oldPwd && passwordHash.verify(req.body.oldPwd, user.password))){
            throw new Error('密码错误！');
        }
        if(!(req.body.newPwd && req.body.confirmPwd && req.body.newPwd == req.body.confirmPwd)) {
            throw new Error('两次输入密码不一致！');
        }
        user.password = passwordHash.generate(req.body.newPwd);
        user.save().then(function() {
            res.json({
                message: 'success'
            });
        });
    });
};

exports.logout = function (req, res, next) {

};

exports.getInfo = function (req, res, next) {
    var User = global.db.models.user;
    var user_id = 1;
    User.find(user_id).then(function(user) {
        if(!user) {
            throw new Error('用户不存在！');
        }
        res.json({
            user_id: user.id,
            username: user.username,
            email: user.email,
            head: user.head,
            introduction: user.description,
            institution: user.institution,
            occupation: user.occupation,
            headline: user.headline
        });
    });
};
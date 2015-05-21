/**
 * Created by heavenduke on 15-5-20.
 */

var config = {
    dbConfig: {
        name: 'planeteden',
        username: 'root',
        password: 'alimengmengda',
        config: {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306,
            timezone: '+08:00',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        }
    },
    serverConfig: {
        port: 3000
    },
    businessConfig: {
        page_limit: 20
    }
}

exports.config = config;
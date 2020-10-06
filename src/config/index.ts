const configObject = {
    environment: process.env.NODE_ENV,
    database: {
        mysql: {
            uri: process.env.MYSQL_URI_LOCAL || '',
        },
    },
    analytics: {
        Sentry: {
            url: process.env.SENTRY_URL,
        },
    },

};
// Todo Joi validation
const mysqlDbConfig = Object.freeze(configObject);

export default mysqlDbConfig;
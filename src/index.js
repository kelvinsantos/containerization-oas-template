const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const port = process.env.PORT || 3000;
const logger = require('./config/winston');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

var whitelist = [
    'http://localhost:3000'
];

const corsOptions = {
    origin: function (origin, callback) {
        if (Array.isArray(whitelist)) {
            if (
                whitelist.indexOf(origin) !== -1 ||
                whitelist.indexOf('*') !== -1 ||
                !origin
            ) {
                callback(null, true);
            } else {
                logger.error(new Error('Not allowed by CORS'));
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            logger.error(new Error('Please check CORS configuration'));
            callback(new Error('Please check CORS configuratio'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    exposedHeaders: ['Content-Disposition']
};
app.use(cors(corsOptions));

// support parsing of application/json type post data
app.use(bodyParser.json({ limit: '50mb' }));

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

/**
 * [Morgan](https://github.com/expressjs/morgan)
 * Use logger before routes so it logs all requests
 *
 * By default, morgan sends the output to stdout which is the console
 *  `app.use(morgan('common'));`
 *
 * Custom log output example:
 *  `app.use(morgan(':date[iso] :method :url :response-time'));`
 *
 * Configure morgan to send the output to our logger's stream instead
 */
app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message)
        }
    })
);

// use compression
app.use(compression());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

if (['development'].includes(process.env.NODE_ENV)) {
    const swaggerDocument = YAML.load(`${__dirname}/docs/openapi.yml`);
    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );
  }

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function (req, res) {
    res.status(404).json({ message: 'Not Found' });
});

app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
});

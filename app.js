// Start Up Setting
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const port = process.env.PORT || 1812;

// extra security package
const cors = require('cors');
const helmet = require('helmet');
const expressLimiter = require('express-rate-limit');
const xss = require('xss-clean');

// extra packages for swagger ui
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// connect data base mongoDB
const connectDB = require('./db/connectDB');

// Routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');

// error Handler middleware
const errorHandler = require('./middleware/error-handler');
const notFoundError = require('./middleware/notFoundMiddleware');

// middleware for authentication bearer token
const authMiddleware = require('./middleware/authMiddleware');

// middleware use to body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// to push app to heroku
app.set('trust proxy', 1);

// default security 
app.use(expressLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    }
));
app.use(cors());
app.use(helmet());
app.use(xss());



// for Swagger Ui StartUp an running live server
app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// our API
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/product', authMiddleware, productRoute);

// middleware errorhandler
app.use(errorHandler);
app.use(notFoundError);

// run server
const start = async () => {
    try {
        await connectDB(process.env.URL_DB)
        app.listen(port, () => console.log(`Listen on http://localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
};
start();
import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

import routes from './routes.js';
import mongoose from 'mongoose';
import { auth } from './middlewares/auth-middleware.js';
import { tempData } from './middlewares/temp-data-middleware.js';

const app = express();

// Config handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        setTitleOnPage(title){
            this.pageTitle = title;
        }
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
}));

// Setup DB mongoose
try{
    const uri = 'mongodb://127.0.0.1/';
    await mongoose.connect(uri, { dbName: 'home-cooking-recipes' });

    console.log('Success DB connect');
}catch(err){
    console.error('Cannot connect to DB');
    console.log(err.message);
}

app.set('view engine', 'hbs');
app.set('views', 'src/views');

// Express Setup
app.use(express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressSession({
    secret: 'dasfr*vHJIdhjio()FB549324',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
  }));
app.use(auth);
app.use(tempData);
app.use(routes);

// Start Express
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));
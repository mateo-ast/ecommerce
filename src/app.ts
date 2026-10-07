import express from 'express';
import path from 'path';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import { router } from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('layout extractStyles', true);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'ecommerce-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  }),
);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

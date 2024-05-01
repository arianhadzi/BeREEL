import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';

import configRoutesFunction from './routes/index.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  name: 'AuthState',
  secret: 'some secret string!', 
  resave: false,
  saveUninitialized: false
}));

app.use((req, res, next) => {
  const isAuthenticated = !!req.session.user;
  const currentPath = req.path.toLowerCase();

  console.log(`[${new Date().toUTCString()}]: ${req.method} ${currentPath} (${isAuthenticated ? 'Authenticated User' : 'Non-Authenticated User'})`);

  const publicPaths = ['/login', '/register', '/about'];

  if (!isAuthenticated && !publicPaths.includes(currentPath)) {
    return res.redirect('/about');
  } else if (isAuthenticated && currentPath === '/') {
    return res.redirect(`/user/${encodeURIComponent(req.session.user.username)}`);
  }

  next();
});

configRoutesFunction(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`We've now got a server!`);
  console.log(`Your routes will be running on http://localhost:${PORT}`);
});

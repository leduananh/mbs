'use strict';

import { app } from './init.js';

import { UserRouter } from './routes/function/user.router.js';
import { ProductRouter } from './routes/function/product.router.js';
import { AppRouter } from './routes/view/app.router.js';
import config from './config.js';

app.use('/', AppRouter);
app.use('/api', UserRouter);
app.use('/api', ProductRouter);

app.use(function (req, res, next) {
  res.status(404).render('404');
});

app.listen(config.port, () => console.log('app run on'));

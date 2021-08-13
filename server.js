'use strict';

import app from './init.js';
import UserRouter from './routes/UserRouter.js';
import config from './config.js';

app.use('/api', UserRouter);
app.listen(config.port, () => console.log('app run on'));

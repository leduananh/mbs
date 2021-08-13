'use strict';

const app = require('./init');
const UserRouter = require('./routes/UserRouter');
const config = require('./config');

app.use('/api', UserRouter.routes);
app.listen(config.port, () => console.log('app run on'));

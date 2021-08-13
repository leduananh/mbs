'use strict';

import express from 'express';
import cors from 'cors';
const app = express();

app.listen();
app.use(express.json());
app.use(cors());

export default app;

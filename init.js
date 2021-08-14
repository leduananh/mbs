'use strict';

import express from 'express';
import cors from 'cors';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/static', express.static(__dirname + '/resource/public'));

app.set('views', __dirname + '/resource/pages');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());

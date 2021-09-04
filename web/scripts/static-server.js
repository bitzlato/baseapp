const express = require('express');
const path = require('path');

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3002;
const public = path.resolve(__dirname, '..', 'build');

const app = express();
app.use(express.static(public));
app.get('*', (_, res) => res.sendFile(public + '/index.html'));
app.listen(port, host, () => console.log('Press Ctrl+C to exit...\n'));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts);

const uye = require('./routes/api/uye');
app.use('/api/uye', uye);

const urun = require('./routes/api/urun');
app.use('/api/urun', urun);

const sort = require('./routes/api/sort');
app.use('/api/sort', sort);

const sepet = require('./routes/api/sepet');
app.use('/api/sepet', sepet);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
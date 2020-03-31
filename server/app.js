import express, { json } from 'express';
import path from 'path';

//const port = process.env.PORT;
const port = config.get('port');

const app = express();

app.use(json());

app.use('/', express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
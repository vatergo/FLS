import express, { json } from 'express';
import path from 'path';
import statistics from './routes/statistics';

const port = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use('/api', statistics);
app.use('/', express.static(path.join(__dirname, '../public')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

app.listen(port, () => console.log(`Сервер запущен на порту: ${port}`));
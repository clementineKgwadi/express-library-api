import bodyParser from 'body-parser';
import express, {Express} from 'express'
import { loggerMiddleware } from './middleware/logger';
import router from './routes/author';
import bookRouter from './routes/books';

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use("/authors", router);
app.use("/books", bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


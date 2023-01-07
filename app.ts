import express, { Express } from 'express';
import notesRouter from "@notes/routes/notes.routes";

const app: Express = express();
const port = 5000;

app.use(express.json());
app.use('/api/notes', notesRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export {
  app
}
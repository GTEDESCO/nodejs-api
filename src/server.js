import app from './app';

console.info(`Started on: http://localhost:${process.env.PORT || 33333}`);

app.listen(process.env.PORT || 3333);

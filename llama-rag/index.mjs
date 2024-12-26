import express from 'npm:express@4.21.2';
import basicRouter from './routers/basicRouter.mjs'
import bodyParser from 'npm:body-parser@1.20.3';
import cors from 'npm:cors@2.8.5';
// import express from 'express'
const port = process.env.PORT || 4001;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', basicRouter);

// app.get("/", (req, res) => {
//     res.send("Welcome to the Dinosaur API!");
//   });

app.listen(port, () => {
    console.log('Listening on 4001')
});

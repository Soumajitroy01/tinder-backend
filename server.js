import express from "express";
import mongoose from "mongoose";
import Cors from 'cors';
import Cards from "./dbCards.js";

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url ='mongodb+srv://admin:Babi2003@cluster0.n2ikjgd.mongodb.net/tinderdb?retryWrites=true&w=majority';

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.set('strictQuery', true);
mongoose.connect(connection_url);

//API Endpoints
app.get('/', (req, res) => res.status(200).send('Hello Clever Programmers!!!'));

app.post('/tinder/card', (req, res) =>{
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

//Listeners
app.listen(port, () => console.log(`listening on localhost: ${port}`));
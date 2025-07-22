const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb+srv://dramanard:FoOfEvndy152zdM6@cluster0.zmfjoen.mongodb.net/";
const client = new MongoClient(mongoURL);
const app = express();
const port = 3000;

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/user/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user_type = req.body.user_type;

    // controllo dei dati inseriti
    if(!username) {
      res.status(400).json({ error: "Username mancante"});
      return;
    }

    if(!password) {
      res.status(400).json({ error: "Password mancante"});
      return;
    }

    if(user_type == "undefined") {
      res.status(400).json({ error: "Scegli tipo di utente"});
      return;
    }

    // recupero credenziali da mongodb
    await client.connect();
    const filter = { username: username, password: password, user_type: user_type }
    const user = await client
    .db('Fastfood')
    .collection('users')
    .findOne(filter);


    if (user) {
        res.json(user)
    } else {
        res.status(401).json({ error: "Credenziali Errate" })
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

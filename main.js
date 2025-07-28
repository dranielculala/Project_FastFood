const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;

const mongoURL = "mongodb+srv://dramanard:FoOfEvndy152zdM6@cluster0.zmfjoen.mongodb.net/";
const client = new MongoClient(mongoURL);
const app = express();
const port = 3000;
const DB_NAME = 'FastFood';

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
    .db(DB_NAME)
    .collection('users')
    .findOne(filter);


    if (user) {
        res.json(user)
    } else {
        res.status(401).json({ error: "Credenziali Errate" })
    }
});

function hash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.post('/user/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const user_type = req.body.user_type;

    // controllo dei dati inseriti
    if(!username || username.length < 3) {
        res.status(400).json({ error: "Username non valido (deve essere lungo almeno 3 caratteri)" });
        return;
    }

    if(!email) {
        res.status(400).json({ error: "Email mancante" });
        return;
    }

    if(!password || password.length < 8) {
        res.status(400).json({ error: "Password non valida (deve essere lunga almeno 8 caratteri)" });
        return;
    }

    if(user_type == "undefined") {
        res.status(400).json({ error: "Scegli tipo di utente" });
        return;
    }

    // controllo se username già usata
    const existing_Username = await client.db(DB_NAME).collection('users').findOne({ username: username });
    if (existing_Username) {
        res.status(400).json({ error: "Username già in uso" });
        return;
    }

    // controllo se l'email esiste già
    const existing_Email = await client.db(DB_NAME).collection('users').findOne({ email: email });
    if (existing_Email) { 
        res.status(400).json({ error: "Email già in uso" });
        return;
    }

    // inserimento nuovo utente
    const user = {
        username: username,
        password: hash(password),
        email: email,
        user_type: user_type
    };
    await client.db(DB_NAME).collection('users').insertOne(user);
    res.status(200).json({ message: "Utente registrato con successo" });

    await client.close();
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

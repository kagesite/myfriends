const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const friends = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/getCurrentDate', (req, res) => {
    const date = new Date()
    res.json({ 'currentDate': date });
})

app.post('/addFriend', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const age = req.body.age
    const friend = {
        name: name,
        email: email,
        phone: phone,
        age: age
    }
    friends.push(friend);
    res.json({ 'friends': friends })
})

app.post('/findFriend', (req, res) => {
    console.log('Request body:', req.body);
    console.log('Friends List:', friends);

    const { findFriend } = req.body;
    const foundFriend = friends.find((f) => f.email === findFriend)

    if (foundFriend) {
        res.send(`User Found: ${foundFriend.name}`);
    } else {
        res.send(`User not found`);
    }
})




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
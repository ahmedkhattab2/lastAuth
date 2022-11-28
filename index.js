const exprss = require('express');
const app = exprss();
const bodyparser = require('body-parser');
const authRouter = require('./Route/authRouter');
const Chick_user = require("./middelware/verify-user");
const Chick_Admin = require("./middelware/verify-admin");
const mongoose = require('mongoose');
const cor = require('cors')
mongoose.connect('mongodb+srv://auth4:StTUOyR3iK2AynEt@cluster0.snwrnod.mongodb.net/?retryWrites=true&w=majority', () => {
    console.log('server connected succssefully with monogoDB')
})
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }), exprss.json(), cor(), exprss.urlencoded({ extended: true }));
app.get('/contactUser', Chick_user)
app.post('/contactAdmin', Chick_Admin)
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json({ hi: "hello at new server" })

})

app.listen(2222, () => {
    console.log('server is created')
})
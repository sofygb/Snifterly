const express = require('express')
const app = express();
const jwt = require('jsonwebtoken')
const keys = require('../settings/Keys')

app.set('key', keys.key)
app.use(express.urlencoded({extended:false}))
app.use(express.json())


const payload = {
    check:true
}
const token = jwt.sign(payload, app.get('key'),{
    expiresIn: '7d'
})
res.json({
    message: 'AUTENTICACIÓN EXITOSA',
    token: token
})
console.log('el token es: ', token)
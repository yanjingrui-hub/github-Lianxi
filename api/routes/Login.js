const express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var { LoginModel } = require('../model/model')

/* GET users listing. */
router.get('/login', async (req, res) => {
    const login = await LoginModel.findOne(req.query.username)
    if (login) {
        const token = "Bearer " + jwt.sign({ username: req.query.username }, "secret", { expiresIn: '1h' });
        res.send({
            code: 200,
            token: token
        })
    } else {
        res.send({
            code: 400,
            message: '用户名或密码错误'
        })
    }
});

module.exports = router;

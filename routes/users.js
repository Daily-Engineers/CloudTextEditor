'use strict';
const express = require('express');
const router = express.Router();

router.get('/users/login',(req,res)=>{
    res.send({username:'adam'})
});

module.exports = router;

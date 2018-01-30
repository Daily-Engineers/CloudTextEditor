const express = require('express');
const router = express.Router();

router.get('/pages/:page_id',(req,res)=>{
  res.send({page:req.params});
});

module.exports = router;

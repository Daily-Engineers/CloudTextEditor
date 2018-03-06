const Page = require('../models/page');
let save = async function(req, res) {
  let pageContent = req.body.content;
  let isInDB = (req.body.isInDB == 'true')
    //If in db update
  if (isInDB) {
    let pageID = req.headers.referer.slice(-5);
    let query = {'page_id':pageID}
    Page.update({'page_id':pageID},{'content':pageContent},(err, pageChanges)=>{
      if(err)
        res.sendStatus(500);
      else
        res.sendStatus(202);
    });
  } else {
    //else create new page
    let newPage = new Page();
    newPage.content = req.body.content;
    newPage.page_id = await generateUniqueID();
    newPage.published_by = req.user;
    newPage.save((err, page) => {
      if (err)
        res.sendStatus(500);
      else
        res.status(201).json(page);
    });
  }
}

//Function generates random and guaranteed unique page IDs
async function generateUniqueID() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let iDArray = [];
  for (let i = 0; i < 5; i++) {
    iDArray.push(chars.charAt(Math.floor(Math.random() * 62)));
  }
  let pageID = iDArray.join('');
  //Invalid if there is a collision
  let invalid = await Page.find({
    'page_id': pageID
  }).length > 0;
  //If there is a collision a new one is generated
  if (invalid)
    return generateUniqueID();
  else {
    return pageID;
  }
}

module.exports = save;

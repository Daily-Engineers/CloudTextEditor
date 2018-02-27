var url=require('url');
var fs = require('fs');

function renderHTML(path,res){
    fs.readFile(path,null, function(err, data){
        if(err){

        }
    });
}

module.exports={
    handleRequest: function(req,res){
        var path = url.parse(req.url).pathname;
        if(path==='faq'){
            renderHTML('./faqPage.handlebars',res)
        }
    }
}
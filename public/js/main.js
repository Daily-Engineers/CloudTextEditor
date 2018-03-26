

if (docSaved) {
    var socket = io();
    socket.on('welcome', function(data) {
        console.log(data.msg);
    });

    socket.on('updated text', function(newText) {
        editor.getDoc().setValue(newText);
    });
}
//Auto-save every 8 seconds if the doc is in the database already
if (docSaved) {
    setInterval(function() {
        savePage();
    }, 8000);
}

function displayLoginMsg(msg, valid) {
    if(valid == true){
        $('#loginReturnText').attr('style', 'color:green');
    }else {
        $('#loginReturnText').attr('style', 'color:red');
    }
    $('#loginReturnText').text('');
    document.getElementById('loginReturnBlock').style.display = 'block';
    $('#loginReturnText').text(msg);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Save/re-saves page
function savePage() {
    var docExists = false; //TODO verify if doc exists
    var editorText = editor.getValue();
    var page = {
        content: editorText,
        isInDB: docSaved
    };
    $.ajax({
        method: 'post',
        url: '/save',
        data: page,
        datatype: 'json',
        success: function(page, textStatus, xhr) {
            if (xhr.status == 200) {
                showSuccessMessage('Saved!');
            } else if(xhr.status == 201){
                window.location.href = '/doc/' + page.page_id;
            }else if(xhr.status == 401){

            }
        },
        error: function(err) {
            console.error(err);
        }
    });
}
$(document).ready(function() {
    $('#brand').on('click', function() {
        $('#sidebar').toggleClass('active');
        $('#brand > svg').toggleClass('fa-chevron-circle-left fa-chevron-circle-right');
    });
});

function invalidField(item, remove) {
    $(item).addClass('invalid');
    if (remove)
        $(item).removeClass('invalid');
}

function validField(item, remove) {
    $(item).addClass('valid');
    if (remove)
        $(item).removeClass('valid');

    $(item).blur();
}

$(document).ready(loadPageNav());
$(document).ready(getPagePermissions());



function loadPageNav() {
    $('#ownersDocsSubmenu').empty();
    $('#editorsDocsSubmenu').empty();
    $('#viewersDocsSubmenu').empty();
    $.ajax({
        method: 'post',
        url: '/pages',
        datatype: 'json',
        success: function(pages, textStatus, xhr) {
            if(xhr.status == 200){
                loadFileName()
                pages.owners.forEach(function (page, index, arr) {
                    $('#ownersDocsSubmenu').append('<li><a href=\"/doc/'+ page.page_id +'">' + page.filename + '</a></li>');
                });
                pages.editors.forEach(function (page, index, arr) {
                    $('#editorsDocsSubmenu').append('<li><a href=\"/doc/'+ page.page_id +'">' + page.filename + '</a></li>');
                });
                pages.viewers.forEach(function (page, index, arr) {
                    $('#viewersDocsSubmenu').append('<li><a href=\"/doc/'+ page.page_id +'">' + page.filename + '</a></li>');
                });
            }
        },
        error: function(err) {
            console.error(err);
        }
    })
}



function getPagePermissions() {
    if(docSaved){
        $.ajax({
            method: 'post',
            url: '/getPagePermissions',
            datatype: 'json',
            success: function(auth, textStatus, xhr) {
                if(xhr.status == 200) {
                    //auth checking for UI, this will be loaded when page list is loaded
                    //This is UI only please if you use this authenticate on server side
                    if(auth === 'owner') {
                        document.getElementById('displayNameAbleFile').style.display = 'block';
                    }else if(auth === 'editor'){

                    }else if(auth === 'viewer'){

                    }else{

                    }
                }else{

                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
}

function loadFileName() {
    if(docSaved){
        $.ajax({
            method: 'post',
            url: '/findname',
            datatype: 'json',
            success: function(filename, textStatus, xhr) {
                if(xhr.status == 200) {
                    $('#filename').attr('placeholder', filename);
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
}

function showSuccessMessage(msg) {
    $('#MessageItem').text(msg).removeClass('invisible').hide().fadeIn(300);
    setTimeout(() => $('#MessageItem').fadeOut(300), 3000);
}

// creating global variables as they will be accessed in other function like download
var modlang;
var typeext;
var editor;
$(document).ready(function () {
    // the initial language mode of the editor will be javascript
    modlang="javascript";
    // initial value of the typeext
    typeext='js';

    // codemirror text editor initiates
    var code = $(".codemirror-textarea")[0];
    editor = CodeMirror.fromTextArea(code, {
        lineNumbers: true,
        mode: modlang
    });
    // Listing the language options and appending them to the datalist with id='langs'
    for(var i=0; i<languages.length; i++){
        $('#langs').append("<option id='"+i+"' class='"+languages[i].mode+"' value='"+languages[i].name+"'>");
    }

    // when selecting a language
    $('#langBtn').on('click', function () {
        modlang = $('#plangid').val(); // getting the value of the selected option
        // based on the value obtained above, we get the value of the id and parse it to integer as the index number
        var langIndex = parseInt($('option[value="'+modlang+'"]').attr('id'));
        // setting the mode of the text editor to the language selected
        if($.type(languages[langIndex].mime) == 'undefined'){
            editor.setOption("mode", languages[langIndex].mimes[0]);
        }else{
            editor.setOption("mode", languages[langIndex].mime);
        }
        // creating a script tag to insert as the library for the selected language
        var script = document.createElement('script');
        // the type of script is text/javascript
        script.type = "text/javascript";
        // the path to the language library
        script.src = "/public/libs/codemirror/mode/"+languages[langIndex].mode+"/"+languages[langIndex].mode+".js";
        // appending the script to the head
        document.head.appendChild(script);
        // assigning the corresponding extention to the typeext
        typeext = languages[langIndex].ext[0];
    });
});

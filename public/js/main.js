//init line numbers
$(function() {
    // Target all classed with ".lined"
    $("#EditorArea").linedtextarea({
        selectedLine: 1
    })
});

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

// Save/re-saves page
function savePage() {
    var docExists = false; //TODO verify if doc exists
    var editorText = editor.getValue();
    console.log(editorText);
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
}

$(document).ready(loadPageNav());
$(document).ready(getPagePermissions());



function loadPageNav() {
    $('#ownersSubmenu').empty();
    $('#editorsSubmenu').empty();
    $('#viewersSubmenu').empty();
    $.ajax({
        method: 'post',
        url: '/pages',
        datatype: 'json',
        success: function(pages, textStatus, xhr) {
            if(xhr.status == 200){
                loadFileName()
                pages.owners.forEach(function (page, index, arr) {
                    $('#ownersSubmenu').append('<li><a href=\"/doc/'+ page.page_id +'">' + page.filename + '</a></li>');
                });
                pages.editors.forEach(function (page, index, arr) {
                    $('#editorsSubmenu').append('<li><a href=\"/doc/'+ page.page_id +'">' + page.filename + '</a></li>');
                });
                pages.viewers.forEach(function (page, index, arr) {
                    $('#viewersSubmenu').append('<li><a href=\"/doc/'+ page.page_id +'">' + page.filename + '</a></li>');
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

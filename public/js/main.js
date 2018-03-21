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
            if (xhr.status == 201) {
                window.location.href = '/doc/' + page.page_id;
            } else {
                showSuccessMessage('Saved!');
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
$(document).ready(function () {
    $.ajax({
        method: 'post',
        url: '/pages',
        datatype: 'json',
        success: function(pages, textStatus, xhr) {
            if(xhr.status == 200) {
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

});

function showSuccessMessage(msg) {
    $('#MessageItem').text(msg).removeClass('invisible').hide().fadeIn(300);
    setTimeout(() => $('#MessageItem').fadeOut(300), 3000);
}

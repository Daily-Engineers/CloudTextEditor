'use strict';
var lightTheme = true;


//Clears editor's textarea
$('#NewBtn').on('click', function() {
    var editor = $('#EditorArea').val();
    if (confirm('Are you sure? You will lose any unsaved progress.')) {
        window.location = "/";
    }
});


$('form.addUserForm').on('submit', function(e) {
    var email = $('#AddUserEmailField').val();
    var permLevel = parseInt($('#AddUserPermissionLevelSelect :selected').val());
    console.log(typeof permLevel)
    var data = {
        username: email,
        permLevel: permLevel
    }
    $.ajax({
        method: 'post',
        url: '/users/invite',
        data: data,
        datatype: 'json',
        success: function(status) {
            showSuccessMessage('Invited!');
            $('#AddUserModal').modal('hide');
        },
        error: function(err) {
            console.log('User already added');
            $('#AddUserModal').modal('hide');
        }
    });
    console.log('submitted');
    console.log($('#AddUserPermissionLevelSelect :selected').text());
    e.preventDefault();
});

//Saves file
$('#SaveBtn').on('click', function() {
    savePage()
});


//login + register form
$('form.signin-form').on('submit', function(e) {
    e.preventDefault();
    var action = $("input[type=submit][clicked=true]").prevObject[0].activeElement.value;
    var username = $('#UsernameField').val().trim();
    var password = $('#PasswordField').val();

    if ($('#UsernameField').hasClass('invalid') || !validateEmail(username) || username.length < 1 || password.length < 1) {
        displayLoginMsg("Invalid Email Address or Password");
    } else {
        //rest password on login attempt
        $('#PasswordField').val('');

        var user = {
            username: username,
            password: password
        }

        $.ajax({
            method: 'post',
            url: '/' + action,
            data: user,
            datatype: 'json',
            success: function(msg, Status, xhr) {
                if (action === 'login') {
                    //If login secsefull
                    if (xhr.status == 200) {
                        displayLoginMsg(msg)
                    } else if (xhr.status == 201) {
                        window.location = "";
                    }
                }else if(action === 'register'){
                    if (xhr.status == 200) {
                        displayLoginMsg(msg);
                    } else if (xhr.status == 201) {
                        displayLoginMsg(msg, true);
                    }
                    $('#UsernameField').removeClass('invalid');
                    //rest password on register attempt
                    $('#PasswordField').val('');
                }
            },
            error: function(err) {
                invalidField('.login');
            }
        });
    }
});

$('#LogoutBtn').on('click', function() {
    var editorText = editor.getValue();
    var page = {
        content: editorText,
        isInDB: docSaved
    };

    $.ajax({
        method: 'get',
        url: '/logout',
        data: page,
        datatype: 'json',
        success: function(page, textStatus, xhr) {
            window.location = "/";
        },
        error: function(err) {
            console.error(err);
        }
    })
});


//Download button
$('#DownloadBtn').on('click', function() {
    var editorText = editor.getValue();
    console.log(editorText);

    var page = {
        type: typeext,
        content: editorText,
        isInDB: docSaved
    };
    $.ajax({
        method: 'post',
        url: '/page/download',
        data: page,
        datatype: 'json',
        success: function(page, textStatus, xhr) {
            console.log('callll')
            if (xhr.status == 201) {
                window.location.href = '/page/download/?pageId=' + page.page_id + '&type=' + page.type + '&docSaved=' + page.docSaved;
            }
        },
        error: function(err) {
            console.log(err);
        }
    })
});

//namefile
$(document).on('keyup', '#filename', function() {
    var item = '#filename';
    var filename = document.getElementById('filename');
    var filter = /^(?!\s*$)[a-z0-9.]+$/i;

    if (!filter.test(filename.value)) {
        $(item).removeClass('valid');
        invalidField(filename);
    } else {
        $(item).removeClass('invalid');
        validField(filename);
    }
})


$('#nameFileBtn').on('click', function() {
    if ($('#filename').hasClass('invalid')) {
        alert("Invalid characters detected, Please use alphanumeric and period characters");
    }
    var filename = $('#filename').val().trim();
    var filter = /^(?!\s*$)[a-z0-9.]+$/i;
    if (filename != '' && filter.test(filename)) {
        var page = {
            filename: filename
        };
        $.ajax({
            method: 'post',
            url: '/namefile',
            data: page,
            datatype: 'json',
            success: function(newpage, textStatus, xhr) {
                if (xhr.status == 201) {
                    $('#filename').val('');
                    $(item).removeClass('valid');
                    loadPageNav();
                }
            },
            error: function(err) {
                console.log(err);
            }
        })
    }
});

//Deleting a file
$('#DelBtn').on('click', function() {
    $.ajax({
        method: 'post',
        url: '/page/deleteFile',
        success: function(page, textStatus, xhr) {
            window.location = "/";
        },
        error: function(err) {
            console.log(err);
        }

    });
});

'use strict';
var lightTheme = true;


//Clears editor's textarea
$('#NewBtn').on('click', function() {
    var editor = $('#EditorArea').val();
    if (confirm('Are you sure? You will lose any unsaved progress.')) {
        window.location = "/";
    }
});
//Toggles between light and dark css files
$('#StlyeBtn').on('click', function() {
    lightTheme = !lightTheme;
    var editor = $("#EditorArea");
    if (lightTheme) {
        editor.css({
            "background-color": "white",
            "color": "#23272a"
        });
        this.innerHTML = 'Dark';
    } else {
        editor.css({
            "background-color": "#333",
            "color": "white"
        });
        this.innerHTML = 'Light';
    }
});

$('form').on('submit', function(e) {
    var email  = $('#AddUserEmailField').val();
    var permLevel = parseInt($('#AddUserPermissionLevelSelect :selected').val());
    console.log(typeof permLevel)
    /*$.ajax({
        method:'post',
        url:'/users/invite',

    })*/
    console.log('submitted');
    console.log($('#AddUserPermissionLevelSelect :selected').text());
    e.preventDefault();
});

//Sets link to clipboard
$('#ShareBtn').on('click', function() {
    //get full url of page
    var url = window.location.href;
    //creates dummy element
    var copyFrom = document.createElement("textarea");
    //adds text to dummy element
    copyFrom.textContent = url;
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(copyFrom);
    //select dummy
    copyFrom.select();
    //pushes test from dummy to clipboard
    document.execCommand('copy');
    //removes dummy
    body.removeChild(copyFrom);

    showSuccessMessage('Link copied!');
});

//Saves file
$('#SaveBtn').on('click', function() {
    savePage()
});

//validator for email
$(document).on('keyup', '#UsernameField', function () {
  var item = '#UsernameField';
  var email = document.getElementById('UsernameField');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        $(item).removeClass('valid');
        invalidField(email);
    }else{
        $(item).removeClass('invalid');
        validField(email);
    }
});

//login
$('#LoginBtn').on('click', function() {

      var username = $('#UsernameField').val().trim();
      var password = $('#PasswordField').val();

      //rest password on login attempt
      $('#PasswordField').val('');

      var user = {
          username: username,
          password: password
      }
      $.ajax({
          method: 'post',
          url: '/login',
          data: user,
          datatype: 'json',
          success: function (msg, Status, xhr) {
              //If login secsefull
              if(xhr.status == 200){
                  displayLoginMsg(msg)
              }else if (xhr.status == 201) {
                   window.location = "";
              }
          },
          error: function (err) {
              invalidField('.login');
          }
      })
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

$('#RegisterBtn').on('click', function() {
    var email = $('#UsernameField').val().trim();
    var password = $('#PasswordField').val();

    if($('#UsernameField').hasClass('invalid') || !validateEmail(email) || username.length < 1 || password.length < 1){
        displayLoginMsg("Invalid Email Address or Password");
    }else {
        //rest password on register attempt
        $('#PasswordField').val('');

        var user = {
            username: email,
            password: password
        }

        $.ajax({
            method: 'post',
            url: '/register',
            data: user,
            datatype: 'json',
            success: function (msg, textStatus, xhr) {
                console.log(msg);
                if(xhr.status == 200){
                    displayLoginMsg(msg);
                }else if(xhr.status == 201){
                    displayLoginMsg(msg, true);
                }
                $('#UsernameField').removeClass('invalid');
            },
            error: function (err) {
                console.log(err);
            }
        })
    }
});

//Download button
$('#DownloadBtn').on('click', function() {
    var editorText = ($('.CodeMirror-scroll')[0]).innerText;
    console.log(editorText);
    // var type = 'txt';



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
      if (xhr.status == 201)
        window.location.href = '/page/download/?pageId=' + page.page_id + '&type=' + page.type + '&docSaved=' + page.docSaved;
    },
    error: function(err) {
      console.log(err);
    }
  })
});

//namefile
$(document).on('keyup', '#filename', function () {
    var item = '#filename';
    var filename = document.getElementById('filename');
    var filter = /^(?!\s*$)[a-z0-9.]+$/i;

    if (!filter.test(filename.value)) {
        $(item).removeClass('valid');
        invalidField(filename);
    }else{
        $(item).removeClass('invalid');
        validField(filename);
    }
})


$('#nameFileBtn').on('click', function () {
    if($('#filename').hasClass('invalid')){
        alert("Invalid characters detected, Please use alphanumeric and period characters");
    }
    var filename = $('#filename').val().trim();
    var filter = /^(?!\s*$)[a-z0-9.]+$/i;
    if(filename != '' && filter.test(filename)){
        var page = {
            filename: filename
        };
        $.ajax({
            method: 'post',
            url: '/namefile',
            data: page,
            datatype: 'json',
            success: function(newpage, textStatus, xhr) {
                if(xhr.status == 201) {
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

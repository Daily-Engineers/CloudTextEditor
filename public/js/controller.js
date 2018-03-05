'use strict';
var lightTheme = true;


//Clears editor's textarea
$('#NewBtn').on('click', function() {
  var editor = $('#EditorArea').val();
  if (editor.trim().length > 0) {
    if (confirm('Are you sure? You will lose any unsaved progress.')) {
      $('#EditorArea').val('');
    }
  }
});
//Toggles between light and dark css files
$('#StlyeBtn').on('click', function() {
  lightTheme = !lightTheme;
  if (lightTheme) {
    $("#EditorArea").css({
      "background-color": "white",
      "color": "#23272a"
    });
  } else {
    $("#EditorArea").css({
      "background-color": "#333",
      "color": "white"
    });
  }
});

//Sets link to clipboard
$('#ShareBtn').on('click', function() {
  //get full url of page
  var url = window.locahttp;
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

//login
$('#LoginBtn').on('click',function(){

    var username = $('#username').val().trim()
    var password = $('#password').val().trim()
    var user = {
        username: username,
        password: password
    }
    $.ajax({
        method: 'post',
        url: '/login',
        data: user,
        datatype: 'json',
        success: function(user, Status, xhr){
            //If login secsefull
            if(xhr.status == 201){
                console.log("s")
            }
            //login failed
            else{
                console.log("f")
            }
        },
        error: function(err){
            console.log(err)
        }
    })

});

$('#LogoutBtn').on('click', function(){
    console.log("out")
    var user = {
        username: "temp"
    }

    $.ajax({
        method: 'get',
        url: '/logout',
        data: user,
        datatype: 'json',
        success: function (page, textStatus, xhr) {

        },
        error: function (err) {
            console.log(err);
        }
    })
})


$('#RegisterBtn').on('click', function () {
    var username = $('#username').val().trim()
    var password = $('#password').val().trim()

    var user = {
        username: username,
        password: password
    }

    $.ajax({
        method: 'post',
        url: '/register',
        data: user,
        datatype: 'json',
        success: function (page, textStatus, xhr) {

        },
        error: function (err) {
            console.log(err);
        }
    })

});


//Download button
$('#DownloadBtn').on('click', function () {
    var editorText = $('#EditorArea').val();
    var page = {
        content: editorText,
        isInDB: docSaved
    };
    $.ajax({
        method: 'post',
        url: '/page/download',
        data: page,
        datatype: 'json',
        success: function (page, textStatus, xhr) {
            console.log('posted! :)');
            if(xhr.status == 201)
                window.location.href = '/page/download/' + page.page_id;
            },
        error: function (err) {
            console.log(err);
            }
   })
})

//Saves file
$('#SaveBtn').on('click', function() {
    var docExists = false; //TODO verify if doc exists
    var editorText = $('#EditorArea').val();
    var page = {
        content: editorText,
        isInDB: docSaved
    };
    $.ajax({
        method: 'post',
        url: '/page/download',
        data: page,
        datatype: 'json',
        success: function (page, textStatus, xhr) {
            if (xhr.status == 201)
                window.location.href = '/page/download/' + page.page_id;
        },
        error: function (err) {
            console.error(err);
        }
    });
});

//Deleting a file
$('#DelBtn').on('click', function () {
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
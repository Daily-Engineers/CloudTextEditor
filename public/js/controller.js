'use strict';
var lightTheme = true;


//Clears editor's textarea
$('#NewBtn').on('click', function() {
  var editor = $('#EditorArea').val();
  if (editor.trim().length > 0) {
    if (confirm('Are you sure? You will lose any unsaved progress.')) {
      window.location = "/";
    }
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
    this.innerHTML= 'Dark';
  } else {
    editor.css({
      "background-color": "#333",
      "color": "white"
    });
    this.innerHTML = 'Light';
  }
});

//Sets link to clipboard
$('#ShareBtn').on('click', function() {
  console.log('ShareBtn');
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


//login
$('#LoginBtn').on('click',function(){

    var username = $('#UsernameField').val().trim()
    var password = $('#PasswordField').val().trim()
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
            if(xhr.status == 201)
                window.location = "";
        },
        error: function(err){
            console.log(err)
        }
    })

});

$('#LogoutBtn').on('click', function(){
    var editorText = $('#EditorArea').val();
    var page = {
        content: editorText,
        isInDB: docSaved
    };

    $.ajax({
        method: 'post',
        url: '/logout',
        data: page,
        datatype: 'json',
        success: function (page, textStatus, xhr) {
            window.location = "/";
        },
        error: function (err) {
            console.log(err);
        }
    })
})


$('#RegisterBtn').on('click', function () {
    var username = $('#UsernameField').val().trim();
    var password = $('#PasswordField').val();

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
          window.location = "";
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

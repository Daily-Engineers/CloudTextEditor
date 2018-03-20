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
    this.innerHTML = 'Dark';
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

function addUserToDoc(username){
  $.ajax({
    method: 'post',
    url: '/users/addViewer/' + username,
    success: function(users) {
      showSuccessMessage('invited '+username);
      $('#permissionsSubmenu').prepend('<li><a href="javascript:void(0);">'+username+'<i class="fas fa-trash-alt float-right"></i></a></li>');
    },
    error: function(err) {
      invalidField('#UserSuggest');
      console.log('no!');
    }
  });
}

$('#UserSearch').on('keyup', function(e) {
  let value = this.value;
  if (e.keyCode === 13) {
    addUserToDoc(value);
  } else {
    $.ajax({
      method: 'get',
      url: '/users?search=' + value,
      success: function(users, status, xhr) {

        invalidField(this, true);
        $('#UserSuggest').empty();
        users.forEach(function(user) {
          $('#UserSuggest').append('<option value="' + user.username + '"></option>')
        })

      },
      error: function(err) {
        invalidField(this);
      }
    });
  }
});


//login
$('#LoginBtn').on('click', function() {

  var username = $('#UsernameField').val().trim();
  var password = $('#PasswordField').val();
  var user = {
    username: username,
    password: password
  }
  $.ajax({
    method: 'post',
    url: '/login',
    data: user,
    datatype: 'json',
    success: function(user, Status, xhr) {
      //If login secsefull
      if (xhr.status == 201)
        window.location = "";
    },
    error: function(err) {
      invalidField('.login');
    }
  })

});

$('#LogoutBtn').on('click', function() {
  var editorText = $('#EditorArea').val();
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
})

$('#RegisterBtn').on('click', function() {
  var username = $('#UsernameField').val().trim();
  var password = $('#PasswordField').val();
  if (username.length < 1 || password.length < 1) {
    loginAlertFailed();
    return;
  }
  var user = {
    username: username,
    password: password
  }

  $.ajax({
    method: 'post',
    url: '/register',
    data: user,
    datatype: 'json',
    success: function(page, textStatus, xhr) {
      window.location = "";
    },
    error: function(err) {
      console.log(err);
    }
  })
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
})

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
// creating global variables as they will be accessed in other function like download
var modlang;
var typeext;
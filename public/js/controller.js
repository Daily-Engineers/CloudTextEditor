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

//Allows tabs to indent in textarea
$(document).on('keydown', '#EditorArea', function(e) {
  var keyCode = e.keyCode;
  var start = this.selectionStart;
  var end = this.selectionEnd;
  if (e.keyCode === 9) {
    e.preventDefault();
    $(this).val(
      $(this).val().substring(0, start) +
      '\t' +
      $(this).val().substring(end)
    );
    this.selectionStart = this.selectionEnd = start + 1;
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
    //23272a

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


//Download button
$('#DownloadBtn').on('click', function() {

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
    success: function(page, textStatus, xhr) {
      if (xhr.status == 201)
        window.location.href = '/page/download/' + page.page_id;
    },
    error: function(err) {
      console.error(err);
    }
  })
})

//Auto-save every 8 seconds if the doc is in the database already
if (docSaved) {
  setInterval(function() {
    savePage();
  }, 8000);
}
//Saves file
$('#SaveBtn').on('click', function() {
  savePage()
});

// save on browser closing
window.onunload = function() {
  savePage();
}

function savePage() {
  var docExists = false; //TODO verify if doc exists
  var editorText = $('#EditorArea').val();
  if (docExists) {
    //update page in db
  } else {
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
        if (xhr.status == 201)
          window.location.href = '/doc/' + page.page_id;
        else
          showSuccessMessage();
      },
      error: function(err) {
        console.error(err);
      }
    });
  }
}

function showSuccessMessage(msg) {
  $('#MessageItem').text(msg).removeClass('invisible').hide().fadeIn(300);
  setTimeout(() => $('#MessageItem').fadeOut(300), 3000);
}

$(function() {
  // Target all classed with ".lined"
  $("#EditorArea").linedtextarea({
    selectedLine: 1
  })
})

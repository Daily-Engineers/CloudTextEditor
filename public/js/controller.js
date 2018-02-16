'use strict';
//Clears editor's textarea
$('#NewBtn').on('click', function() {
  var editor = $('#EditorArea').val();
  console.log(editor);
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

//Saves file
$('#SaveBtn').on('click', function() {
  var docExists = false; //TODO verify if doc exists
  var editorText = $('#EditorArea').val();
  if (docExists) {
    //update page in db
  } else {
    var page = {
      content: editorText
    };
    $.ajax({
      method: 'post',
      url: '/save',
      data: page,
      datatype: 'json',
      success: function(page) {
        console.log('posted! :)');
        window.location.href = '/doc/' + page.page_id;
      },
      error: function(err) {
        console.log('error :(');
      }
    });
  }
});

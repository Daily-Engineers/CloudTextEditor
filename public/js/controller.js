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
      content: editorText,
      isInDB: docSaved
    };
    $.ajax({
      method: 'post',
      url: '/save',
      data: page,
      datatype: 'json',
      success: function(page,textStatus, xhr) {
        console.log('posted! :)');
        if(xhr.status == 201)
          window.location.href = '/doc/' + page.page_id;
        else
          showSuccessMessage();
      },
      error: function(err) {
        console.log('error :(');
      }
    });
  }
});

function showSuccessMessage(){
  $('#SuccessIcon').removeClass('invisible').hide().fadeIn(300);
  setTimeout(()=>$('#SuccessIcon').fadeOut(300),3000);
}

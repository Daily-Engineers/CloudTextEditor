//init line numbers
$(function() {
  // Target all classed with ".lined"
  $("#EditorArea").linedtextarea({
    selectedLine: 1
  })
});

//Auto-save every 8 seconds if the doc is in the database already
if (docSaved) {
  setInterval(function() {
    savePage();
  }, 8000);
}

// save on browser closing
window.onunload = function() {
  savePage();
}

function savePage() {
  var docExists = false; //TODO verify if doc exists
  var editorText = $('#EditorArea').val();
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
        showSuccessMessage('Saved!');
    },
    error: function(err) {
      console.error(err);
    }
  });
}
$(document).ready(function () {
    $('#brand').on('click', function () {
        $('#sidebar').toggleClass('active');
        console.log('h');
    });
});
function showSuccessMessage(msg) {
  $('#MessageItem').text(msg).removeClass('invisible').hide().fadeIn(300);
  setTimeout(() => $('#MessageItem').fadeOut(300), 3000);
}

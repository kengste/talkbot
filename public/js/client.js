/*global $ */

$('#mySearch').on('click', '.asdasd', function (ev) {
  $.ajax ({
    url: 'http://localhost:3000/query',
    // dataType: 'json',
    method: 'GET',
    data: {
      searchTerm: $(this).val()
    }
  }).done(function(dataFromServer) {
    $('#demo').append(
      "<div>result</div>"
    )
  }).fail(function(err) {
    console.log(err);
  })
});

$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "message__image", src="${message.image}">` : ``
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${message.user_name}</p>
                    <p class="message__upper-info__date">${message.created_at}</p>
                  </div>
                  <p class="message__text">
                  ${message.text}
                  </p>
                  ${addImage}
                <div>`
    return html;
  }
  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#input-box__text').val('');
      $('input[type=file]').val('');
      $('.submit-btn').prop('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
  })
});
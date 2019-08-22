$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "message__image", src="${message.image}">` : ``
    var html = `<div class="message" data-id=${message.id}>
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">${message.user_name}</p>
                    <p class="message__upper-info__date">${message.created_at}</p>
                  </div>
                    <p class="message__text">${message.text}</p>
                    ${addImage}
                  <div>`
    return html;
  };
  
  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  };
  
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $(".message").last().data("id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: { id: last_message_id }
      })
      .done(function(messages) {
        var insertHTML = "";
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        scroll();
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  
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
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('error');
      $('.submit-btn').prop('disabled', false);
    })
  });
  setInterval(reloadMessages, 5000);
});
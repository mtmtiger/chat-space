$(document).on("turbolinks:load",function() {
  var addResult = $("#user-search-result");

  function userHit(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                </div>`
    addResult.append(html);
  }
  function userNoHit(user) {
    var html = `<div class="chat-group-user clearfix">  
                  <p class="chat-group-user__name">${user}</p>  
                </div>`
    addResult.append(html);
  }

  var members = $(".chat-group-users");

  function addUser(id, name) {
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${id}">
                  <input name='group[user_ids][]' type=hidden value=${id}>
                  <p class="chat-group-user__name">${name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    members.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          userHit(user);
        });
      }else {
        userNoHit("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on("click", ".user-search-add", function() {
    var userId = $(this).data("user-id")
    var userName = $(this).data("user-name")
    addUser(userId, userName)
    $(this).parent().remove()
  });
  $(document).on("click", ".js-remove-btn", function() {
    $(this).parent().remove()
  });
});
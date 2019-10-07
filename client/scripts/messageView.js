const MessageView = {

  /* START SOLUTION */
  render: _.template(`
    <div class="chat">
      <div
        class="username <%= Friends.isFriend(username) ? 'friend' : '' %>"
        data-username="<%- username %>">
        <%- username %>
      </div>
      <div><%- text %></div>
    </div>
  `),
  /* ELSE
  render: _.template(`
    <div class="chat">
      <div class="username"></div>
      <div></div>
    </div>
  `)
  END SOLUTION */

};

window.MessageView = MessageView;

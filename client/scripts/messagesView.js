const MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    /* START SOLUTION */
    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
    /* END SOLUTION */
  },

  render: function() {
    /* START SOLUTION */
    MessagesView.$chats.html('');
    Messages
      .items()
      .filter(message => Rooms.isSelected(message.roomname))
      .each(message => MessagesView.renderMessage(message));
    /* END SOLUTION */
  },

  /* START SOLUTION */
  renderMessage: function(message) {
    const $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },
  /* END SOLUTION */

  /* START SOLUTION */
  handleClick: function(event) {
    // Get username from data attribute
    const username = $(event.target).data('username');
    if (username === undefined) { return; }

    Friends.toggleStatus(username, MessagesView.render);
  },
  /* END SOLUTION */

};

window.MessagesView = MessagesView;

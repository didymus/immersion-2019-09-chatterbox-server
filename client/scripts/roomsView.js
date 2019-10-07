const RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    /* START SOLUTION */
    RoomsView.$select.on('change', RoomsView.handleChange);
    RoomsView.$button.on('click', RoomsView.handleClick);
    /* END SOLUTION */
  },

  render: function() {
    /* START SOLUTION */
    RoomsView.$select.html('');
    Rooms
      .items()
      .each(RoomsView.renderRoom);
    RoomsView.$select.val(Rooms.selected);
    /* END SOLUTION */
  },

  /* START SOLUTION */
  renderRoom: function(roomname) {
    const $option = $('<option>').val(roomname).text(roomname);
    RoomsView.$select.append($option);
  },
  /* END SOLUTION */

  /* START SOLUTION */
  handleChange: function(event) {
    Rooms.selected = RoomsView.$select.val();
    MessagesView.render();
  },
  /* END SOLUTION */

  /* START SOLUTION */
  handleClick: function(event) {
    const roomname = prompt('Enter room name');
    if (roomname) {
      Rooms.add(roomname, () => {
        RoomsView.render();
        MessagesView.render();
      });
    }
  },
  /* END SOLUTION */

};

window.RoomsView = RoomsView;

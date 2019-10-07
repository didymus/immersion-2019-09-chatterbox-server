const FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    /* START SOLUTION */
    const message = {
      username: App.username,
      text: FormView.$form.find('#message').val(),
      roomname: Rooms.selected || 'lobby'
    };

    Parse.create(message, (data) => {
      _.extend(message, data);
      Messages.add(message, MessagesView.render);
    });
    /* ELSE
    console.log('click!');
    END SOLUTION */
  },

  setStatus: function(active) {
    const status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

};

window.FormView = FormView;

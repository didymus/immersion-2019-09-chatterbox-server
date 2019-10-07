const App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);

    /* START SOLUTION */
    // Poll for new messages every 3 sec
    setInterval(App.fetch, 3000);
    /* END SOLUTION */
  },

  fetch: function(callback = () => { }) {
    Parse.readAll((data) => {
      /* START SOLUTION */
      // Don't bother to update if we have no messages
      if (!data.results || !data.results.length) { return; }

      Rooms.update(data.results, RoomsView.render);
      Messages.update(data.results, MessagesView.render);
      /* ELSE
      // examine the response from the server request:
      console.log(data);
      END SOLUTION */

      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

};

window.App = App;

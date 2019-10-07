const Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,
 
  create: function(message, successCB, errorCB = null) {
    /* START SOLUTION */
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to create message', error);
      },
    });
    /* ELSE
    // TODO: Save a message to the server
    END SOLUTION */
  },

  readAll: function(successCB, errorCB = null) {
    /* START SOLUTION */
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      },
    });
    /* ELSE
    // TODO: Get messages from server
    END SOLUTION */
  },

};

window.Parse = Parse;
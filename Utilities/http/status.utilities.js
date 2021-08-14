export const HTTP_STATUS = {
 
  SUCCESSFUL_RESPONSES: {
    OK: {
      CODE: 200,
      MSG: (msg) => {
        return msg === undefined ? 'SUCCESSFUL' : 'SUCCESSFUL: ' + msg;
      },
    },
  },

  CLIENT_ERROR: {
    UNPROCESSABLE_ENTITY: {
      CODE: 422,
      MSG: (msg) => {
        return msg === undefined ? 'UNPROCESSABLE_ENTITY' : 'UNPROCESSABLE_ENTITY: ' + msg;
      },
    },
  },

  SERVER_ERROR: {
    INTERNAL_SERVER_ERROR: {
      CODE: 500,
      MSG: (msg) => {
        return msg === undefined ? 'INTERNAL_SERVER_ERROR' : 'INTERNAL_SERVER_ERROR: ' + msg;
      },
    },
  },

};

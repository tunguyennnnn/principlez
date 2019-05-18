export default {
  story: {
    properties: {
      title: {
        type: 'text',
      },
      tags: {
        type: 'keyword',
      },
      body: {
        type: 'text',
      },
      timestamp: {
        type: 'date',
        format: 'epoch_millis',
      },
    },
  },
  user: {
    properties: {
      fullname: {
        type: 'text',
      },
      tags: {
        type: 'keyword',
      },
      email: {
        type: 'text',
      },
    },
  },
};

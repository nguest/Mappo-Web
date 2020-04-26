const createNotification = ({ message, noteType }) => ({
  type: 'CREATE_NOTIFICATION',
  message,
  noteType,
  createdAt: new Date(),

});

export default createNotification;

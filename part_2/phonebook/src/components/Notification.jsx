const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null;
  }
  let notificationStyle;

  if (messageType === "positive") {
    notificationStyle = {
      color: "green",
      fontStyle: "bold",
      fontSize: 44,
      background: "lightgrey",
      borderStyle: "solid",
      borderRadius: 5,
    };
  } else if (messageType === "negative") {
    notificationStyle = {
      color: "red",
      fontStyle: "bold",
      fontSize: 44,
      background: "lightgrey",
      borderStyle: "solid",
      borderRadius: 5,
    };
  }

  return <div style={notificationStyle}>{message}</div>;
};

export default Notification;

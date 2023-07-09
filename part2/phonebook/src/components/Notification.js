const Notification = ({ notification, notificationType }) => {
    const color = notificationType === 'error' ? 'red' : 'blue'
    const style = {
        color: color,
        bordercolor: color,
        background: 'lightgrey',
        fontsize: '20px',
        borderstyle: 'solid',
        borderradius: '5px',
        padding: '10px',
        marginbottom: '10px'
      } 

    console.log("Notification text:", notification, "Notification type:", notificationType )
    
    if (notification === "") {
      return null
    }
  
    return (
      <div style = {style}>
        {notification}
      </div>
    )
  }

export default Notification
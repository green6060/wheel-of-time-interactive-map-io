import React from 'react'

export default function RightDrawer() {

  const generateSvg = (listItemName) => {
    switch (listItemName) {
      case 'Map':
        return 'Map'
      
      case 'About':
        return 'About'
      
      case 'Donate':
        return 'Donate'

      default:
        throw new Error()
    }
  }

  return (
      <div>
          Right
      </div>
  )
}

{/* <List>
    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List>
  <Divider />
  <List>
    {['All mail', 'Trash', 'Spam'].map((text, index) => (
      <ListItem button key={text}>
        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    ))}
  </List> */}

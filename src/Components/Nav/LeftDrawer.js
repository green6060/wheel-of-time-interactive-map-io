import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemIcon } from '@material-ui/core';
import ExploreIcon from '@material-ui/icons/Explore';
import InfoIcon from '@material-ui/icons/Info';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  linkText: {
    textDecoration: 'none',
    color: 'black',
  },
  hover: {
    '&:hover': {
      backgroundColor: 'rgb(200, 200, 200)'
    }
  }
});

export default function LeftDrawer() {
  const classes = useStyles()
  const generateSvg = (listItemName) => {
    switch (listItemName) {
      case 'Map':
        return <ExploreIcon/>
      
      case 'About':
        return <InfoIcon/>
      
      case 'Donate':
        return <CreditCardIcon/>

      default:
        throw new Error()
    }
  }

  return (
      <>
        <List>
          {['Map', 'About', 'Donate'].map((text) => (
            <Link to={`${text}`} className={classes.linkText}>
              <ListItem className={classes.hover} button key={text}>
                  <ListItemText primary={text} />
                  <ListItemIcon>{generateSvg(text)}</ListItemIcon>
              </ListItem>
            </Link>
          ))}
        </List>
      </>
  )
}
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import ExploreIcon from '@material-ui/icons/Explore';
import TimelineIcon from '@material-ui/icons/Timeline';
import LeftDrawer from './LeftDrawer'
import RightDrawer from './RightDrawer'
import BottomDrawer from './BottomDrawer'
import { FilterContext } from '../../Helper/common';
import zIndex from '@material-ui/core/styles/zIndex';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  flexWrapper: {
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: '0',
    left: '40%',
    zIndex: '100',
    margin: '0.5%',
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  hover: {
    backgroundColor: 'rgb(225, 225, 225)',
    '&:hover': {
      backgroundColor: 'rgb(200, 200, 200)'
    },
  },
  leftPosition: {
    position: 'fixed', left: '1%', top: '50%',
  },
  rightPosition: {
    position: 'fixed', right: '1%', top: '50%',
  },
  bottomPosition: {
    position: 'fixed', bottom: '1%', left: '50%',
  },
});

export default function Nav() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    bottom: false,
    right: false,
  });
  const formik = {}
  
  const renderList = (anchor) => {
    switch (anchor) {
      case 'left':
        return <LeftDrawer />
      
      case 'right':
        return( 
          <FilterContext.Provider value={{formikObj: formik}}>
            <RightDrawer />
          </FilterContext.Provider>
        )
      case 'bottom':
        return <BottomDrawer />
      default:
        throw new Error()
    }
  }

  const toggleDrawer = (anchor) => () => {
    setState({ ...state, [anchor]: !state[anchor] });
  };

  const generateArrow = (anchor) => {
    switch (anchor) {
      case 'left':
        // return <ArrowRightOutlinedIcon style={{fontSize: '50px'}}/>
        return <><div style={{fontSize: '20px'}}>Menu</div> <ExploreIcon style={{fontSize: '30px'}}/></>
      
      case 'right':
        // return <ArrowLeftOutlinedIcon style={{fontSize: '50px'}}/>
        return <><SearchIcon style={{fontSize: '30px'}}/><div style={{fontSize: '20px'}}>Filters</div></>

      case 'bottom': 
        // return <ArrowDropUpOutlinedIcon style={{fontSize: '50px'}}/>
        return <><div style={{fontSize: '20px'}}>Timeline</div><TimelineIcon style={{fontSize: '30px'}}/></>

      default:
        break;
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'bottom',
      })}
      role="presentation"
    >
      {renderList(anchor)}
    </div>
  );

  return (
      <div className={classes.flexWrapper} >
        {['left', 'bottom', 'right'].map((anchor) => (
          <div key={anchor}>
            <Button 
              className={classes.hover} 
              onClick={toggleDrawer(anchor)}
            >
              {generateArrow(anchor)}
            </Button>
            <div className={classes.textAlignCenter} key={anchor}>
              <Drawer variant="persistent" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor)}>
                {list(anchor)}
              </Drawer>
            </div>
          </div>
        ))}
      </div>
  );
}
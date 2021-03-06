import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles( ( theme: Theme ) => ( {
  headerPaneTitle: {
    paddingTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1.2rem'
  },
  headerPaneBody: {
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontSize: '.85rem',
    textAlign:'center'
  },
  paddingInLine: {
    paddingInline: theme.spacing( 3 ),
  },
  animatedOpacity:{
    animation: `$myEffect 1000ms ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes myEffect": {
    "0%": {
      opacity: 0,
      transform: "translateY(5%)"
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)"
    }
  },
} ) );

interface TabPanelHeaderProps {
  index: number;
  value: number;
  skillTitle: string;
  skillDescription: string;
  className: string;
}

function TabPanelHeader( props: TabPanelHeaderProps ) {
  const { skillTitle, skillDescription, value, index, className, ...other } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={ className }
      {...other} >
      {value === index && (
        <Box p={1}>
          <Typography>
            <div>
              <strong className={ classes.headerPaneTitle }>{ skillTitle }</strong>
              <div className={ classes.headerPaneBody }>{ skillDescription }</div>
            </div>
          </Typography>
        </Box>
      )}
    </div>
  );
}

interface DualTabPanelHeaderProps {
  skillTitleLeft: string;
  skillDescriptionLeft: string;
  skillTitleRight: string;
  skillDescriptionRight: string;
  value: number;
}

export default function DualTabPanelHeader( props: DualTabPanelHeaderProps ) {

  const {
    skillTitleLeft,
    skillDescriptionLeft,
    skillTitleRight,
    skillDescriptionRight,
    value
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.paddingInLine}>

      <TabPanelHeader 
        value={value} 
        index={0} 
        skillTitle={skillTitleLeft} 
        skillDescription={skillDescriptionLeft}
        className={classes.animatedOpacity}/>

      <TabPanelHeader 
        value={value} 
        index={1} 
        skillTitle={skillTitleRight} 
        skillDescription={skillDescriptionRight}
        className={classes.animatedOpacity}/>

    </div>
  )
}
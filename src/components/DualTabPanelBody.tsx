import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
//-----Components----
import ButtonCompletedKinedu from './ButtonCompletedKinedu';
import RowMilestone from './RowMilestone';

const azul = '#1FADDF';
const rosa = '#D43571';
const useStyles = makeStyles( ( theme: Theme ) => ( {
  padding: {
    padding: theme.spacing( 1 ),
  },
  centerButton: {
    display: 'flex',
    justifyContent: 'center',
    paddingBlock: '20px'
  },
  leftPanelFinised:{
    backgroundColor:azul,
  },
  rightPanelFinised:{
    backgroundColor:rosa,
  },
  animatedOpacity:{
    animation: `$opacityEffect 1600ms ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes opacityEffect": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    }
  },
  "@keyframes blueTansition": {
    "0%": {
      backgroundColor: rosa,
    },
    "100%": {
      backgroundColor: azul,
    }
  },
  "@keyframes pinkTansition": {
    "0%": {
      backgroundColor: azul,
    },
    "100%": {
      backgroundColor: rosa,
    }
  },
} ) );

interface TabPanelProps {
  children ? : React.ReactNode;
  index: number;
  value: number;
  className: string;
}

function TabPanel( props: TabPanelProps ) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={ className }
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type milestoneProps = {
  [id: string]: number
};

type handleMilestonesStateFn = ( props: milestoneProps ) => void;

interface DualTabPanelBodyProps {
  dataLeft: any[];
  dataRight: any[];
  value: number;
  ageRangeLeft: string;
  ageRangeRight: string;
  nextFunction: React.MouseEventHandler < HTMLButtonElement > ;
  finishFunction: React.MouseEventHandler < HTMLButtonElement > ;
  handleMilestonesState: handleMilestonesStateFn;
  milestonesStates: milestoneProps;
  isFinished: boolean;
}

export default function DualTabPanelBody( props: DualTabPanelBodyProps ) {
  const classes = useStyles();
  const {
    dataLeft,
    dataRight,
    value,
    ageRangeLeft,
    ageRangeRight,
    nextFunction,
    finishFunction,
    milestonesStates,
    handleMilestonesState,
    isFinished
  } = props;

  const classPanelLeft = isFinished ? classes.leftPanelFinised : '';
  const classPanelRight = isFinished ? classes.rightPanelFinised : '';

  return (
    <div>
      <TabPanel value={value} index={0} className={ `${ classPanelLeft } ${ classes.animatedOpacity }` }>

        { dataLeft.map((data:any, index: number)=>{
                                      const milestoneId=`left.${index}`;
                                      const stateButton = milestonesStates[milestoneId] ? milestonesStates[milestoneId] : 0;
                                      return (<RowMilestone 
                                              key={milestoneId} 
                                              _key={milestoneId} 
                                              title={data.title} 
                                              description={ ageRangeLeft }
                                              stateButton={ stateButton }
                                              handleMilestonesState={ handleMilestonesState } 
                                              isFinished={ isFinished }/> ) 
                                    } ) }

        <div className={classes.centerButton}>

          <Typography className={classes.padding} />
          
          <ButtonCompletedKinedu 
            label={'Next'} 
            style={{width:'300px'}} 
            onClick={ nextFunction }/>
        </div>

      </TabPanel>

      <TabPanel value={value} index={1} className={ `${ classPanelRight } ${ classes.animatedOpacity }` }>

        { dataRight.map((data:any, index: number)=>{
                                        
                                        const milestoneId=`right.${index}`;
                                        const stateButton = milestonesStates[milestoneId] ? milestonesStates[milestoneId] : 0;
                                        
                                        return (<RowMilestone 
                                                  key={`${milestoneId}`} 
                                                  _key={`${milestoneId}`}
                                                  title={data.title} 
                                                  description={ ageRangeRight } 
                                                  stateButton={ stateButton }
                                                  handleMilestonesState={ handleMilestonesState }
                                                  isFinished={ isFinished }/> ) 
                                      } ) }

        <div className={classes.centerButton}>
          
          <Typography className={classes.padding} />

          <ButtonCompletedKinedu 
            label={'Finish assessment'} 
            style={{width:'300px'}}
            onClick={ finishFunction }/>
        </div>

      </TabPanel>
    </div>
  )
}
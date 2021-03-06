import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';
//-----Components----
import ButtonsPillKinedu from '../components/ButtonsPillKinedu';
import DualTabPanelHeader from '../components/DualTabPanelHeader';
import DualTabPanelBody from '../components/DualTabPanelBody';
import ModalKinedu from '../components/ModalKinedu';
//----Services-----
import KineduService from '../services/KineduService';

const kineduService = KineduService.getInstance();
type AreasProps = {}

const azul = '#1FADDF';
const rosa = '#D43571';

const useStyles = makeStyles( ( theme: Theme ) => ( {
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing( 1 ),
  },
  paddingInLine: {
    paddingInline: theme.spacing( 3 )
  },
  physical_bck: {
    backgroundColor: azul,
  },
  social_bck: {
    backgroundColor: rosa,
  },
  selectedLeft: {
    borderBottomLeftRadius: '25px',
    borderTopLeftRadius: '25px',
    color: azul,
    backgroundColor: 'white'
  },
  unselectedLeft: {
    borderBottomLeftRadius: '25px',
    borderTopLeftRadius: '25px',
    color: 'white',
    backgroundColor: rosa
  },
  selectedRight: {
    borderBottomRightRadius: '25px',
    borderTopRightRadius: '25px',
    color: rosa,
    backgroundColor: 'white'
  },
  unselectedRight: {
    borderBottomRightRadius: '25px',
    borderTopRightRadius: '25px',
    color: 'white',
    backgroundColor: azul
  },
  centerSpinner: {
    display: 'flex',
    justifyContent: 'center',
    padding: '50px'
  }
} ) );

const protoSkillData = {
  milestones: [],
  title: '',
  description: '',
  age_range: ''
}
////////////////////
// Main View
////////////////////
const AreasView: React.FC < AreasProps > = () => {
  const classes = useStyles();
  const [ value, setValue ] = useState( 0 );
  const [ skillDataLeft, setSkillDataLeft ] = useState( protoSkillData );
  const [ skillDataRight, setSkillDataRight ] = useState( protoSkillData );
  const [ milestonesStates, setMilestonesStates ] = useState( {} );
  const [ isFinished, setIsFinished ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ showModal, setShowModal ] = useState( false );

  useEffect( () => {
    // Update the document title using the browser API
    document.title = `Skills | Kinedu`;
  } );

  useEffect( () => {
    if ( skillDataLeft.milestones.length === 0 ) {
      setupSkillLeft();
    }
  }, [ skillDataLeft ] );

  useEffect( () => {
    if ( skillDataRight.milestones.length === 0 ) {
      setupSkillRight();
    }
  }, [ skillDataRight ] );

  const classHeader = value === 0 ? classes.physical_bck : classes.social_bck;
  const classButtonLeft = value === 0 ? classes.selectedLeft : classes.unselectedLeft;
  const classButtonRight = value === 1 ? classes.selectedRight : classes.unselectedRight;

  const titleBtnLeft = 'Physical';
  const titleBtnRight = 'Social & Emotional';
  const titleHeader = 'Areas';

  const handleChange = ( event: React.ChangeEvent < {} > , newValue: number ) => {
    setValue( newValue );
    goTop();
  };

  const goTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const setupSkillLeft = async () => {
    const _skillDataLeft = await kineduService.getMilestones( 23 )
      .catch( ( e: any ) => ( { data: { data: { skill: protoSkillData } } } ) );
    setIsLoading( false );
    setSkillDataLeft( _skillDataLeft.data.data.skill );
  }; //setupSkillLeft

  const setupSkillRight = async () => {
    const _skillDataRight = await kineduService.getMilestones( 2 )
      .catch( ( e: any ) => ( { data: { data: { skill: protoSkillData } } } ) );
    setIsLoading( false );
    setSkillDataRight( _skillDataRight.data.data.skill );
  }; //setupSkillRight

  type milestoneProps = {
    [ id: string ]: number
  };

  const handleMilestonesState = ( newMilestonesState: milestoneProps ) => {
    const newMilestonesStates = { ...milestonesStates, ...newMilestonesState };
    setMilestonesStates( newMilestonesStates );
  }; //handleMilestonesState

  const finish = () => {
    if( !isFinished ){
      setIsFinished( true );
      openModal();
    } else{
      goTop();  
    }    
  };//finish

  const closeModal = () => {
    setShowModal(false);
  };//closeModal

  const openModal = () => {
    setShowModal(true);
  };//openModal

  return (
    <div>
      
      <div className={ classes.root }>
        
        <div className={ classHeader }>

          <ButtonsPillKinedu 
            titleHeader={ titleHeader }
            titleBtnLeft={ titleBtnLeft }
            classButtonLeft={ classButtonLeft }
            titleBtnRight={ titleBtnRight }
            classButtonRight={ classButtonRight }
            handleChange={ handleChange }
            value={ value }/>

          { !isLoading && <DualTabPanelHeader 
                            skillTitleLeft={`Skill: ${ skillDataLeft.title }`}
                            skillDescriptionLeft={`${ skillDataLeft.description }`}
                            skillTitleRight={`Skill: ${ skillDataRight.title }`}
                            skillDescriptionRight={`${ skillDataRight.description }`}
                            value={ value }/>
          }

          { isLoading && <div className={classes.centerSpinner}><CircularProgress color={'primary'} style={{color:'white'}}/></div> }

          <Typography className={classes.padding} />

        </div>

        <div className={classes.root}>
          { !isLoading && <DualTabPanelBody 
                          dataLeft={ skillDataLeft.milestones } 
                          ageRangeLeft={ `Usually achieved by ${ skillDataLeft.age_range } months` }            
                          dataRight={ skillDataRight.milestones } 
                          ageRangeRight={ `Usually achieved by ${ skillDataRight.age_range} months` }
                          value={ value }
                          handleMilestonesState={ handleMilestonesState }
                          milestonesStates={ milestonesStates }
                          nextFunction={ ( e: React.ChangeEvent < {} > ) => handleChange(e, 1) }
                          finishFunction={ finish }
                          isFinished={ isFinished }/>
          }

          { isLoading && <div className={classes.paddingInLine} >
                          <Skeleton style={{transform: 'scale(1, .95)'}} height={120} />
                          <Skeleton style={{transform: 'scale(1, .95)'}} height={120} animation={false} />
                          <Skeleton style={{transform: 'scale(1, .95)'}} height={120} />
                          <Skeleton style={{transform: 'scale(1, .95)'}} height={120} animation={false} />
                          <Skeleton style={{transform: 'scale(1, .95)'}} height={120} />
                          <Skeleton style={{transform: 'scale(1, .95)'}} height={120} animation={false} />
                        </div>
          }

          <ModalKinedu 
            open={showModal} 
            handleClose={closeModal} 
            title={'Congratulations !'}
            message={'You are finish this assessment'}
            txtButton={'Got it'}/>

        </div>
      </div>

    </div>
  )
};

export default AreasView;
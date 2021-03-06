import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
//-----Components----
import ButtonInitKinedu from './ButtonInitKinedu';
import ButtonUncompletedKinedu from './ButtonUncompletedKinedu';
import ButtonCompletedKinedu from './ButtonCompletedKinedu';

const rowMilestoneStyles = makeStyles( ( theme: Theme ) => ( {
  root: {
    flexGrow: 1,
    height: '65px',
    paddingTop: theme.spacing( 3 ),
    borderBottom: '1px solid #dadada'
  },
  descriptionBox: {
    float: 'left',
    height: '100%',
    paddingInline: theme.spacing( 3 ),
    maxWidth: '50%'
  },
  descriptionBoxTitle: {
    color: '#6b6b6b',
    fontSize: '.90rem',
    fontWeight: 500
  },
  descriptionBoxBody: {
    color: '#989eab',
    fontSize: '.82rem'
  },
  buttonBox: {
    float: 'right',
    paddingInlineEnd: '50px'
  },
  colorWhite:{
    color: 'white !important'
  },
  colorSemiWhite:{
    color: '#dadce0 !important'
  }
} ) );

type milestoneProps = {
  [ id: string ]: number
};

type handleMilestonesStateFn = ( props: milestoneProps ) => void;

interface RowMilestoneProps {
  title: string;
  description: string;
  stateButton: number;
  handleMilestonesState: handleMilestonesStateFn;
  _key: string;
  isFinished?: boolean;
}

export default function RowMilestone( props: RowMilestoneProps ) {
  const { title, description, _key, stateButton, handleMilestonesState, isFinished, ...other } = props;
  const rowStyles = rowMilestoneStyles();

  const handleStateButton = ( newStateButton: number ) => {
    const newMilestoneState = {
      [ `${ _key }` ]: newStateButton
    };

    handleMilestonesState( newMilestoneState );
  }; //handleStateButton

  const dumbFn = () => {};

  const onClickFn = isFinished ? dumbFn : handleStateButton;
  const classTitleOnFinished = isFinished ? rowStyles.colorWhite : '';
  const classBodyOnFinished = isFinished ? rowStyles.colorSemiWhite : '';

  return (
    <div {...other} className={rowStyles.root}>
       <div className={rowStyles.descriptionBox}>
         <div className={`${ rowStyles.descriptionBoxTitle } ${ classTitleOnFinished }`}>{title}</div>
         <div className={`${ rowStyles.descriptionBoxBody } ${ classBodyOnFinished }`}>{description}</div>
       </div>
       <div className={rowStyles.buttonBox}>
         { stateButton === 0 &&  <ButtonInitKinedu label={'Not answered'} onClick={ () => onClickFn(1) }/> }
         { stateButton === 1 &&  <ButtonUncompletedKinedu label={'Uncompleted'} onClick={ () => onClickFn(2) }/> }
         { stateButton === 2 &&  <ButtonCompletedKinedu label={'Completed'} onClick={ () => onClickFn(1) }/> } 
       </div>
    </div>
  );
}
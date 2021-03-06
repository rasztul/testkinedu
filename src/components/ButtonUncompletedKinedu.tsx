import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const verde = '#75B753';

const ButtonUncompletedKinedu = withStyles( () =>
  createStyles( {
    root: {
      backgroundColor: '#e2e2e2',
      height: '30px',
      color: verde,
      borderRadius: '25px',
      fontSize: '.65rem',
      fontWeight: 'bold',
      textTransform: 'none',
      width:'100px'
    }
  } ),
)( ( props: ButtonUncompletedKineduProps ) => <Button {...props}>{props.label}</Button> );

interface ButtonUncompletedKineduProps {
  label: string,
  onClick?:React.MouseEventHandler<HTMLButtonElement>
}

export default ButtonUncompletedKinedu;
import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const verde = '#75B753';

const ButtonCompletedKinedu = withStyles( () =>
  createStyles( {
    root: {
      backgroundColor: verde,
      height: '30px',
      color: 'white',
      borderRadius: '25px',
      fontSize: '.65rem',
      fontWeight: 'bold',
      textTransform: 'none',
      width:'100px',
      '&:hover':{
        textDecoration: 'none',
        backgroundColor: '#75b75340',
        color: verde
      }
    }    
  } ),
)( ( props: ButtonCompletedKineduProps ) => <Button {...props}>{props.label}</Button> );

interface ButtonCompletedKineduProps {
  label: string,
  style?: React.CSSProperties,
  onClick?:React.MouseEventHandler<HTMLButtonElement>
}
export default ButtonCompletedKinedu;
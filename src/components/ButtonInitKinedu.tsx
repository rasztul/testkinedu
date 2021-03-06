import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonInitKinedu = withStyles( () =>
  createStyles( {
    root: {
      backgroundColor: '#e2e2e2',
      height: '30px',
      color: '#5d5d5d',
      borderRadius: '25px',
      fontSize: '.65rem',
      fontWeight: 'bold',
      textTransform: 'none',
      width:'100px'
    }
  } ),
)( ( props: ButtonInitKineduProps ) => <Button {...props}>{props.label}</Button> );

interface ButtonInitKineduProps {
  label: string,
  onClick?:React.MouseEventHandler<HTMLButtonElement>
}

export default ButtonInitKinedu;
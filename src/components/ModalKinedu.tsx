import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
//-----Components----
import ButtonCompletedKinedu from './ButtonCompletedKinedu';

const rosa = '#D43571';
const useStyles = makeStyles( ( theme ) => ( {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[ 5 ],
    padding: theme.spacing( 2, 4, 3 ),
    borderRadius:'5px',
    textAlign: 'center',
    width:'350px',
    height:'300px',
    '&.Mui-focused ':{
      outline: 'none'
    }
  },
  title:{
    color: rosa,
    paddingTop: '40px'
  },
  message:{
    color:'#5a5a5a',
    fontSize: 'small',
    paddingTop:'30px'
  },
  boxButton:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:'40px'
  }
} ) );

interface ModalKineduProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  txtButton: string;
}


export default function ModalKinedu( props: ModalKineduProps ) {
  const classes = useStyles();
  const { open, handleClose, title, message, txtButton } = props;

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        disableEnforceFocus
        disableAutoFocus
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={`${ classes.paper }`}>
            
            <h2 id="transition-modal-title" className={`${ classes.title }`} >{title}</h2>
            <p id="transition-modal-description" className={`${ classes.message }`}>{message}</p>
            
            <div className={`${ classes.boxButton }`}>
              <ButtonCompletedKinedu onClick={()=>handleClose()} label={txtButton} />  
            </div>            
          </div>           
        </Fade>
      </Modal>
    </div>
  );
}
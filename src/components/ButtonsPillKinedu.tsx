import React from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles( ( theme: Theme ) => ( {
  padding: {
    padding: theme.spacing( 1 ),
  },
  headerTitle: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 800
  }
} ) );

///////////////////////////////////
/// Divider header
///////////////////////////////////
const DividerKinedu = withStyles( () =>
  createStyles( {
    root: {
      backgroundColor: '#ffffff8c',
      width: '450px',
      margin: 'auto',
      height: '1px'
    }
  } ),
)( ( props: DividerKineduProps ) => <Divider {...props}/> );

interface DividerKineduProps {}

const AntTabs = withStyles( {
  root: {
    borderBottom: 'none',
    '& div': {
      justifyContent: 'center'
    }
  },
  indicator: {
    height: 0
  },
} )( Tabs );

const AntTab = withStyles( ( theme: Theme ) =>
  createStyles( {
    root: {
      fontSize: 'small',
      fontWeight: theme.typography.fontWeightBold,
      fontFamily: "Helvetica Neue",
      textTransform: 'none',
      minWidth: 'none',
      width: '150px',
      margin: 0,
      border: '1px solid',
      borderColor: 'white',
      minHeight: 'auto',
      '&:hover': {
        opacity: 1,
      },
      '&$selected': {
        fontWeight: theme.typography.fontWeightBold,
      },
      '&:focus': {}
    },
    selected: { borderBottom: '0px' },
  } ),
)( ( props: StyledTabProps ) => <Tab disableRipple {...props} /> );

interface StyledTabProps {
  label: string;
  className: string;
}

type handleChangeFn = ( event: React.ChangeEvent < {} > , newValue: number ) => void;

interface ButtonsPillKineduProps {
  handleChange: handleChangeFn;
  titleHeader: string;
  titleBtnLeft: string;
  classButtonLeft: string;
  titleBtnRight: string;
  classButtonRight: string;
  value: number;
}

export default function ButtonsPillKinedu( props: ButtonsPillKineduProps ) {
  const classes = useStyles();

  const {
    titleHeader,
    titleBtnLeft,
    classButtonLeft,
    titleBtnRight,
    classButtonRight,
    handleChange,
    value
  } = props;

  return (
    <div>
      <span className={ classes.headerTitle }>{ titleHeader }</span>
      <AntTabs
        value={value}
        onChange={handleChange}
        aria-label={titleHeader}
      >
        <AntTab
          className={classButtonLeft}
          label={titleBtnLeft}
        />
        <AntTab
          className={classButtonRight}
          label={titleBtnRight}
        />
      </AntTabs>
      <Typography className={classes.padding} />
      <DividerKinedu />
    </div>
  )
}
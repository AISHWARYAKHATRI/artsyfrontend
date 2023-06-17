import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    // height: 0,
    paddingTop: '56.25%',
    paddingBottom: '56.25%',
    backgroundBlendMode: 'darken',
    height: '100px'
  },
  inspire: {
    fontFamily: 'Josefin Sans, sans-serif ',
    fontFamily: 'Roboto',
    fontWeight: 700,
    paddingTop: '15px',
    paddingBottom: '5px',
    fontSize: '2rem',
  }
}));
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progress: {

    marginTop: theme.spacing(20),
    marginBottom : theme.spacing(5)
  },
  errorMessage:{
    color: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    // height: 0,
    // paddingTop: '56.25%', // 16:9,
    // width: 200
    padding: '5%'
  },
  cardContent: {
    flexGrow: 1,
  },
  windIcon:{
    height: 20,
    float: 'left'
  }
});
export default styles;
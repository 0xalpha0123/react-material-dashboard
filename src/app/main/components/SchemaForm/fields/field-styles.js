// export default theme => ({
//   root: {
//     '&$withLabel': {
//       marginTop: theme.spacing.unit * 3,
//     },
//   },
//   textarea: {
//     '& textarea': {
//       height: 'initial',
//     },
//   },
//   description: {
//     transform: `translateX(-${theme.spacing.unit * 2}px)`,
//     fontSize: '80%',
//     color: theme.palette.grey[500],
//   },
//   withLabel: {},
//   label: {
//     height: '1rem',
//     display: 'inline-flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   // infoButton: {},
//   // infoPopover: {}
// });

export default theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    marginLeft: 0, 
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
});
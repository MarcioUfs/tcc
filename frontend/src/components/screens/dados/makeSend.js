import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(10),
    },
    listContainer: {
        width: '100vw',
        paddingTop: theme.spacing(0),
        paddingBottom: theme.spacing(0),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontFamily: 'roboto, arial, sans-serif',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    titulo: {
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '1.4em',
        padding: '8% 0 1% 0',
        "@media(max-width: 768px)": {
            margin: '3% 0 0 0',
            fontSize: '1.4em',
        },
        "@media(max-width: 425px)": {
            margin: '8% 0 0 0',
            fontSize: '1.3em'
        }
    },
    separador: {
        margin: '2% 0',
        "@media(max-width: 768px)": {
            margin: '3% 0 0 0',
        },
        "@media(max-width: 425px)": {
            margin: '6% 0 0 0',
        }
    },
    labels: {
        fontSize: '1.4em',
        "@media (max-width: 768px)": {
            fontSize: '1.3em',
        },
        "@media (max-width: 425px)": {
            fontSize: '1.2em',
        },
    },
    inputs: {
        display:'none'
        // margin: '0 10px 0 0',
        // borderRadius: '4px',
        // width: '70vw',
        // height: '35px',
        // maxWidth: '90vw',
        // background: '#ffffff',
        // boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        // border: '0 none',
        // fontSize: '1.3em',
        // cursor: 'pointer'
    },
    labelButton:{
        padding: '20px 10px',
        width: '200px',
        margin: '0 0 10px 0',
        background: '#313f9f',
        color:'#FFF',
        textTransform: 'uppercase',
        display: 'block',
        marginTop: '10px',
        fontFamili: 'Arial, Helvetica, sans-serrif',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.5s',
        borderRadius:'8px', 
        '&:hover': { 
          background: '#FFF', 
          color: 'green'
        },

    },
    textAreaStyle: {
        width: '98%',
        resize: 'none',
        textAlign: 'justify',
        height: '150px',
        padding: '1% 1%',
        margin: '10px 0',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        border: '0 none',
        borderRadius: '5px',
        fontSize: '1.3em',
        maxWidth: 'inherit',
    },
    textP: {
        textAlign: 'justify'
    }
}));

export default useStyles;
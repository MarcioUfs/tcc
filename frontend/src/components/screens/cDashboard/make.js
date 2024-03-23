import { makeStyles } from '@material-ui/core/styles';
const usestyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(10),
    },
    listContainer: {
        width: '90vw',
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
        margin: '1% 0',
        borderRadius: '4px',
        width: '100%',
        height: '35px',
        maxWidth: '90vw',
        background: '#ffffff',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        border: '0 none',
        fontSize: '1.3em',
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

export default usestyles;
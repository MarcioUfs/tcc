import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(10),
        width: '100vw',
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
    base: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '0',
    },
    container: {
        width: '80rem',
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '1.6em',
        padding: '2% auto 1% auto',
        "@media(max-width: 768px)": {
            margin: '3% 0 0 0',
            fontSize: '1.4em',
        },
        "@media(max-width: 425px)": {
            margin: '8% 0 0 0',
            fontSize: '1.3em'
        }
    },
    titulo: {
        display: 'flex',
        justifyContent: 'space-around',
        fontSize: '1.6em',
        padding: '2% 0 1% 0',
        "@media(max-width: 768px)": {
            margin: '3% 0 0 0',
            fontSize: '1.4em',
        },
        "@media(max-width: 425px)": {
            margin: '8% 0 0 0',
            fontSize: '1.3em'
        }
    },
    formestilo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selects: {
        width: '500px',
        height: '300px',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: ' row',
        padding: '1rem 2rem',
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
    },
    footer: {
        height: '20px',
        position: 'fixed',
        bottom: '0',
        fontSize: '0.8em',
    },
    boxFicha: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        background: '#ffffff',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        padding: '5px'
    },
    typoFicha: {
        mt: 4
    },
    textFieldFicha: {
        width: '100%',
        height: '50px'
    }

}));

export default useStyles;
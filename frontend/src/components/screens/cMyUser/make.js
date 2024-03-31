import { makeStyles } from '@material-ui/core/styles';
const usestyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(10),
    },
    divButtons:{
        width: '100%',
        display: 'flex',
        justifyContent:'space-around',
    }

})
)
export default usestyles;
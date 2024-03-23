import React from 'react';
import Typography from '@material-ui/core/Typography';
import './style.css'
function footer() {
    return (
        <>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                {'2023 - '}
                {new Date().getFullYear()}
                {''}
            </Typography>
            {/* <div className="footer">
                {'Copyright © '}
                {'2021 - '}
                {new Date().getFullYear()}
                {''}
            </div> */}
        </>
    )
}
export default footer;
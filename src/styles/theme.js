// global styles for MUI components

import { createTheme } from '@mui/material/styles';
import './_variables.scss';

const theme = createTheme({
    typography: {
        h2: {
            fontFamily: 'Helvetica',
            fontWeight: 300,
            fontSize: '48px',
            lineHeight: '124%',
            letterSpacing: '-2px',
            textAlign: 'center',
            verticalAlign: 'middle',
},
        h3: {
            fontFamily: 'Helvetica',
            fontWeight: 400,
            fontSize: '24px',
            lineHeight: '124%',
            letterSpacing: '1px',
            verticalAlign: 'middle',
        },
    },

    components: {

        MuiAccordion: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgba(217, 204, 188, 1)',
                },
            },
        },
        MuiAccordionSummary: {
            styleOverrides: {
                root: {
                    flexDirection: 'row-reverse', // move icon to the left
                },
                expandIconWrapper: {
                    marginRight: '15px',  // push title to the right
                    marginLeft: 0,
                    transform: 'rotate(-45deg)',
                    transition: 'transform 0.3s ease',
                    '&.Mui-expanded': {
                        transform: 'rotate(-135deg)',
                    },
                },
            },
        },
        MuiAccordionDetails: {
            styleOverrides: {
                root: {
                    paddingLeft: '56px',
                },
            },
        },



    },
});

export default theme;

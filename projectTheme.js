import { createTheme } from '@mui/material/styles';



const projectTheme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    // backgroundColor: '#00bcd4',
                },
            }
        },
    },
    palette: {
        primary: {
            main: '#00bcd4',
            contrastText: '#fff',
        }
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 14,
        fontWeight: 400,
        fontStyle: 'normal',
        letterSpacing: '0.25px',
        lineHeight: '1.5',
        color: '#fff',
    },
    // spacing: {
    //     unit: 8,
    // }
});

export default projectTheme;

export const navbarStyles = {
    brand: {
        fontSize: '1.25rem',
        letterSpacing: '0.1em',
        fontWeight: '400',
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    drawer: {
        width: 275,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: 275,
            boxSizing: 'border-box',
            backgroundColor: '#101f33',
            color: '#ddd',
        },
        '& .Mui-selected': {
            color: 'red',
        },
    },
    icons: { color: '#ddd', ml: 2 },
    text: { color: '#ddd', fontSize: '2rem !important', fontWeight: '600' },
}

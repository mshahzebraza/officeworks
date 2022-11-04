import { Grid } from "@mui/material"
import { checkDataType } from "../../../helpers/checkDataType"


export function SummaryRow({ label, value, ...rest }) {
    let containsNestedItems = false;
    if (checkDataType(value) !== 'string' && checkDataType(value) !== 'number') containsNestedItems = true
    // if (!checkDataType(value) === 'string' && !checkDataType(value) === 'number') 

    return (
        <Grid container {...rest} sx={{
            "&:nth-of-type(even)": {
                // border: '1px dashed red',
                background: '#f4f4f4'
            },
            '&:hover': {
                background: '#dfe4ff'
            }

        }}
        // justifyContent='center'
        // alignItems="center"
        >
            <Grid
                item xs={4}
                sx={{
                    // border: '1px dashed red',
                    p: 1
                }}
                container
            >
                {label}
            </Grid>
            <Grid
                item xs={containsNestedItems ? 12 : 8}
                sx={{
                    // border: '1px dashed red',
                    p: 1
                }}
                container
            >
                {value}
            </Grid>
        </Grid>
    )
}

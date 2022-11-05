import { Chip, Grid, Tooltip } from "@mui/material"
import { MTableBodyRow, MTableHeader } from "material-table"
import CellAvatar from "../../customMUI/tableComponents/CellAvatar"

// Components for Material Table UI
export const MTcomponents = {
    Header: props => {
        return (
            <MTableHeader {...props} />
        )
    }
}

// Components for data-items of the table columns
export const POitemsChips = ({ items: data, currency }) => (
    <Grid container gap={1}>
        {data.map(
            (item, index) => {
                const { id, qty, unitPrice } = item;
                return <Grid item key={index} component={Tooltip} title={`Qty-${qty} @ ${unitPrice}/- ${currency} each`} >
                    <Chip label={id || 'Null'} />
                </Grid>
            }
        )}
    </Grid>
)




export const POinitiatorBox = ({ data: initiatorID, options = {} }) => { // ? images can be added with this method
    const name = options?.[initiatorID]?.name
    const photoPath = options?.[initiatorID]?.photoPath

    return <CellAvatar
        tooltip={name ? `${name} | ${initiatorID}` : initiatorID}
        photoPath={photoPath ? photoPath : null}
    />
}


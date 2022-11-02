import { Chip, Grid } from '@mui/material';
import { MWOinitiatorBox, MWOitemsChips } from './components';


const statusLookup = {
    0: 'Rejected',
    1: 'Draft',
    2: 'Initiated',
    3: 'ERP Approved',
    4: 'Supplier Evaluated',
    5: 'Concurrence Approved',
    6: 'PO Approved',
    7: 'LC Opened',
    8: 'Delivery Confirmed',
    9: 'Closed',
}


/**
 * Creates a config object for each Initiator
 * @param  {string} name
 * @param  {string} photoPath the relative path to the Avatar Image
 */
class Initiator {
    constructor(
        name,
        photoPath = '/images/avatar.png',
    ) {
        this.name = name;
        this.photoPath = photoPath;
    }
}

const initiatorData = {
    7320: new Initiator('Shahzeb', '/images/avatar.png'),
    7321: new Initiator('Jane Doe'),
    7322: new Initiator('Jack Doe'),
    7323: new Initiator('Jill Doe'),
    7324: new Initiator('Joe Doe'),
    7325: new Initiator('Juan Doe'),
    7326: new Initiator('Julie Doe'),
    7327: new Initiator('Jenny Doe'),
    7328: new Initiator('John Doe'),
}


/**
 * Creates a config object for each of the Material-Table column
 * @param  {string} field
 * @param  {string} [title] ['Title']
 * @param  {string} [tooltip]='No tooltip'
 * @param  {Boolean} [grouping]=false
 * @param  {string} [defaultValue]='---'
 * @param  {Boolean} [sortable]=true
 * @param  {Boolean} [hidden]=false
 * @param  {number} [width]=null
 * @param  {number} [flex]=null
 * @param  {Object} [lookup]=null
 * @param  {Function} [render]=null
 */
class Column {
    constructor(
        field,
        title = 'Title',
        tooltip = 'No tooltip',
        grouping = false,
        defaultValue = '---',
        sortable = true,
        hidden = false,
        width = null,
        flex = null,
        lookup = null,
        render = null,
    ) {
        this.field = field;
        this.title = title;
        this.tooltip = tooltip;
        this.grouping = grouping;
        this.default = defaultValue;
        this.sortable = sortable;
        this.hidden = hidden;
        this.width = width;
        this.flex = flex;
        this.lookup = lookup;
        this.render = render;
    }
}



export const columns = [
    new Column(
        'id',
        'Sr.',
        'Serial Number',
        false
    ),
    //    mwoType e.g. TSR,WO,REQ, etc
    new Column(
        'mwoType',
        'MWO Type',
        'Type of Work Order',
        false,
    ),
    new Column(
        'mwoId',
        'MWO ID',
        'ID of Manufacturing WO',
        false,
        null,
        null,
        false
    ),
    new Column(
        'title',
        'MWO Title',
        'Description of Work',
        false,
    ),

    new Column(
        'items',
        'Item(s)',
        'What modules are to be manufactured',
        false,
        '-',
        false,
        false,
        null,
        null,
        null,
        (rowData) => <MWOitemsChips items={rowData.items} />
    ),
    new Column(
        'status',
        'Status',
        'Current Status of MWO',
        false,
        false,
        false,
        false,
        false,
        false,
        statusLookup
    ),
    new Column(
        'initiatorID',
        'Initiator',
        'Initiator of Purchase Case',
        false,
        null,
        null,
        null,
        null,
        null,
        null,
        (rowData) => <MWOinitiatorBox data={rowData?.initiatorId} options={initiatorData} />
    ),
    // {
    // field: 'initiatorID',
    // title: 'Initiator',
    // grouping: false,
    // tooltip: 'Initiator of Manufacturing WO',
    // render: (rowData) => { // ? images can be added with this method
    //     const initiatorID = rowData.initiator;
    //     const initiator = initiatorData[initiatorID];
    //     let fallback = false;
    //     if (!initiator) {
    //         fallback = initiatorID;
    //     }
    //     console.log('')

    //     return <CellAvatar
    //         data={initiator}
    //         fallback={fallback}
    //         text={initiator?.name ?? initiatorID ?? 'NULL'}
    //     />
    // }
    // },

];

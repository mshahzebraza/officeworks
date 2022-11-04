import { POinitiatorBox, POitemsChips } from './components';


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
    new Column(
        'refType',
        'Source',
        'Source of Data',
        true,
        null,
        null,
        true
    ),
    new Column(
        'refId',
        'Source ID',
        'ID of Data Source',
        false,
        null,
        null,
        true,
        '-'
    ),
    new Column(
        'ID',
        'Reference ID',
        'Type & ID of Data Source',
        false,
        null,
        null,
        null,
        null,
        null,
        null,
        (rowData) => (`${rowData.refType} ${rowData.refId}`)
    ),
    new Column(
        'category',
        'Category',
        'Category of Purchase',
        false,
    ),
    new Column(
        'items',
        'Item(s)',
        'What type of items were procured',
        false,
        null,
        false,
        null,
        null,
        null,
        null,
        (rowData) => <POitemsChips items={rowData.items} currency={rowData.currency} />
    ),

    new Column(
        'status',
        'Status',
        'Current Status of PO',
        null,
        null,
        null,
        null,
        null,
        null,
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
        (rowData) => <POinitiatorBox data={rowData?.initiatorId} options={initiatorData} />
    ),
];

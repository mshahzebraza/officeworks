import styles from './Summarize.module.scss';

// to render item: {qty,item} structures
export function RepeatedItemJSX({ item }) {
    if (!item)
        return <span>No items</span>;
    return (<li className={styles.dataItem}>
        <span className={styles.dataItemQty}> {item.qty} </span>
        <span className={styles.dataItemType}>{item.item}</span>
    </li>);
}

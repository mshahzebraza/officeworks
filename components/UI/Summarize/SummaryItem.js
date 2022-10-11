import DetailItem from "../../Detail&Summary/DetailItem";
import styles from './Summarize.module.scss';
import { RepeatedItemJSX } from "./RepeatedItemJSX";

export function SummaryItem({ field = 'noField', value = 'noValue', isList = false }) {

    // Check for List (Array)
    if (isList) {
        if (value?.length > 0) {
            value = value.map(
                (item, idx) => <RepeatedItemJSX
                    key={idx}
                    item={item} />
            );
        } else {
            value = <RepeatedItemJSX />;
        }
    }

    // Check for empty strings
    value = value === '' ? '---' : value;



    return (
        <DetailItem>

            <div className={styles.data}>
                {/* Place Keys in span */}
                <span className={styles.dataField}>{field}:</span>
                {
                    // Check for list items
                    !isList
                        // Place strings in span
                        ? <span className={styles.dataValue}>{value}</span>
                        // Place list items in ul
                        : <ul className={styles.dataValue}>{value}</ul>}
            </div>
        </DetailItem>
    );
}

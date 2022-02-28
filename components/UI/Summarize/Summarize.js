
import { checkDataType } from '../../../helpers/reusable.js'

export default function Summarize(data = {}) {


  // Convert the data object into an array of objects
  // Each object will have a field and value
  // check each value's data-type and convert accordingly

  Object.entries(data).forEach(([key, value]) => {
    const valDataType = checkDataType(value);

    if (valDataType === 'array') {
      console.log('Array detected');
      // value = <ul>
      //   {value}
      // </ul>
    }

    data[key] = <p className={styles.data}>
      <span className={styles.dataField}>{key}:</span>
      <span className={styles.dataValue}>{value}</span>
    </p>
  })



  return (
    <div className={styles.entry}>

      <span className={styles.entryKey}>
        {field}:
      </span>

      {
        !isList
          ? <span className={styles.entryValue}>{value}</span>
          // To accommodate list items in case of nested items
          : <ul className={styles.entryValue}>{value}</ul>
      }
    </div>
  )
}





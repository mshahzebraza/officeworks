
function Summarize(data = {}) {


  // Convert the data object into an array of objects
  // Each object will have a field and value
  // check each value's data-type and convert accordingly

  const dummyData = {
    refId: 'PO-001', //* String
    totalCost: '$1,000', //* String
    tags: ['tag1', 'tag2'], //* Array of Strings
    parts: //* Array of Objects - required key is a string : 'name'
      [
        { name: "Ball Lead Screw" },
        { name: "Screw" },
        { name: "Screw" },
        { name: "Screw" },
      ]
  }



  // data[key] = <p className={styles.data}>
  //   <span className={styles.dataField}>{key}:</span>
  //   <span className={styles.dataValue}>{value}</span>
  // </p>




  return (
    <div className={styles.entry} >

      <span className={styles.entryKey}>
        {field}:
      </span>

      {
        !isList
          ? <span className={styles.entryValue} > {value}</span>
          // To accommodate list items in case of nested items
          : <ul className={styles.entryValue}>{value}</ul>
      }
    </div >
  )
}



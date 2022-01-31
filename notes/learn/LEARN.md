# poData undefined

I want to fetch the poDetails before the component loads.

1. I can't use the useEffect as fetching requires using useSelector from redux. But one hook can't be use inside the other.
2. Can't use the useSelector in getStaticProps as it is not allowed there as well.
3. Trying to use the useSelector in function body before render method to fetch the data on every component load and before rendering elements. This works when i fetch the complete data object.
   However, as soon as i try to acccess the nested data, it fails and throws an error.
   This mostly happens with any poData other than the first one. The first entry is actually the initial state and is hard coded in the database.

## structure of PO Data

`poData = { refId, cost, ... etc }`

`poData` can be logged or accessed. However, accessing the 'refId' or 'cost' throws error.

## Component

`

export default function POdetail(pProps) {

const poData = useSelector(state => { return state.po.find(item => item.refId === pProps.pid) })

console.log(poData);<!-- This runs perfectly, and returns the data as usual -->

console.log(poData.refId); <!-- However, as soon as i want to fetch the nested data, the app breaks -->

return (

<main>

      <section  >
        <h1>PO Data:{poData ? poData.refId : 'Not found'} </h1>
        <h1>PO ID:{poData ? poData.refId : 'Not found'} </h1>
      </section>

</main>

)
}

`

# PO Detail Page

Can't delete the PO from within the PO-Detail Page. Bcz after deleting the current PO there is no PO to be rendered and an error is thrown.
A fix would be to check the content presence inside before accessing the data.

# Portal

### need of useEffect

The code would not work bcz it couldn't find the matching selector in the DOM. Therefore, useEffect was needed to wait for the first render and then check for the selector as now, the DOM would have been rendered.

1. Redux to Apollo
2. Lean Page Structure

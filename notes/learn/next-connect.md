next-connect can be used to make the process of sending http request easier.

### Request Method Filtering Approach

Conventionally, we make a API server request by first checking the `method` of request and then returning a status accordingly:

```
async function handler (req,res) {
  connectDB() // handles the connection logic

  if (req.method === 'GET') {
    data= GetData() // fetches data from database
  }

  if (req.method === 'POST') {
    data= PostData(req.body) // posts data to database
  }

  res.status(200).json(data)
}

```

using next-connect, we let our next-handler function automatically filter the req.method and execute a specific controller function accordingly. The controller function is usually refactored.

```

connectDB() // handles the connection logic

const handler = nc()
handler.get(
  async function (req,res) {
      data= GetData() // fetches data from database
    res.status(200).json(data)
  }
)

export default handler; // DO NOT FORGET THIS STEP
```

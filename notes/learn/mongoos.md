This document is based on a mongoose crash course by **WebDevSimplified**.

## Introduction

### Setting up

Before we jump into the concepts, let's discuss how to set things up with mongoose.

- Import mongoose: `const mongoose = require('mongoose')`

- Establish a connection

  ```
  mongoose.connect(
    mongooseURI,
    connectionFunction,
    errorFunction
    )
  ```

  - `mongooseURI` is a required parameter. It is usually a collection of mongo-host and DB Name. E.g. `mongodb://localhost:27017/OfficeWorks`
  - `connectionFunction` and `errorFunction` are functions that run on connection and connection-error respectively. Think of it as a `tryCatch`.

### Mongoose Basics

Mongoose is basically about three things.

1. Schema
2. Models
3. Queries

There are a bit advance concepts to it as well but that is not the main idea. However, the advanced topics are also discussed below.

## Schema

You can create a schema by instantiating a `mongoose.Schema` class.
Example:

```
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
})

module.exports = mongoose.model('User', userSchema)
```

You may have noticed that we create a model before exporting the schema.

### Heads Up

#### Exporting Models

The export line code above says, create a modal `User` based on `userSchema` and export it. But this line runs on each execution cycle. However, our `User` modal is already created on the first execution. Trying to recreate the modal will cause error. Therefor we modify our code to:

```
const userModel = mongoose.models.userModal || mongoose.modal('User', userSchema)
module.exports = userModel;
```

This tells the server to check if our **mongoose models**(not **model**) contain any model named `User` already before exporting it. If there is none, create a new one and then export it

#### Naming Models

A very important thing while naming the models is that mongoose automatically finds the collection in the database that is **lowercase** and **plural** version of the model name. E.g `Xtra` Model will be linked to `xtras` collection in the database. Therefor it is wise to name the models accordingly.

## Model

A schema itself is of no use. It has to be linked with a model. A model can be thought of as a document structure class.
The first param of `mongoose.model()` is the name of the **model** and the second is the **schema** for it. Once a model is created, there are many document functions and methods (from mongoDB) made available to it like `find()`, `where()` etc.

Once a model is created, it can be instantiated to create the document, a user in this case.
There are 2 ways to go about it.

1. Class instantiation
2. Object.create()

**Class Instantiation**

```
const User = require('/...schemaExportPath...)

const newUser = new User({
  name: "Shahzeb",
  age: 26
})

```

As soon as we create the `newUser`, the model is based on the input data. This data is also validated based on the schema assigned to the model, `userSchema` in this case.

However, just creating a user like above won't do us any good. We still have to save it in the database and for that we have to:

```
newUser.save() // async task
```

This is an async task just like any other database operation and must be handled that way.

**`Object.create()`**

Both the creation and saving of the newly created document can be done in one step:

```
const user = await User.create({...userData})
```

## Schema Advanced

### Schema Types

Let's revisit the user Schema and make it more interesting

```
const userSchema = new mongoose.Schema({
  name: [
   type: String,
   required: true,
   validate: {
     validator: validateFunc,
     message: function(props) {...message...}
   }
   ],
  age: [
    type:Number,
    max:100
  ],
  email: {
    type: String,
    minLength: 5,
    lowercase // converts to lowercase
  },
  createdAt: {
    type: Date,
    default: Date.now() // This would assign one single date to every instance of the model. Using a function  would solve the problem, as on each instantiation the function would be called and Date at the time of document creation would be saved instead of Date at the time of model creation.
  },
  updatedAt: {
    type: Date,
    default: ()=>Date.now()
  },
  bestFriend: mongoose.SchemaTypes.objectId, // reference to the 'best friend' user id,
  hobbies: [String] // [] would mean array of <any> type,
  address: addressSchema, // to avoid deeper nesting

})
```

- **Joins**: `populate()` query can be used to get the full object data against referenced objects. Like bestFriend in this case.
- **Nested Schema** : In above example, `address` schema can be defined independently. The difference is that when nested schema object is defined independently, an objectId is assigned to it. This is not the case in the nested object schema.

### More on Validation

Custom validate functions can be used for the validation. It may be noted that the validation logic is run only for `create` method.
Methods like `find`,`findAndUpdate` etc. skip the validation logic. Therefore, avoid using these.

## Queries

### Basics

Some basic queries are
`find`,`findOne`,`findOneAndUpdate`,**`where`**,`exists`,`updateOne`,`updateMany`,`deleteOne`

**Note:** mongoose validation doesn't run with methods other than `create`.

`where` is a mongoose query. Usage example:

```
  where('name')
  .equals('Shahzeb')
  .where('age')
  .gt(12)
  .lt(20)
  .limit(5) // limit results to 5 docs
  .select('age') // returns selected field against matching docs instead of complete docs
  .populate() // replaces the objectId of nested objects with the corresponding data
```

`populate()` method works only if a `ref` prop is defined the schema for nested objects pointing to a certain model.

### Advanced

Advance concepts of Queries and methods will be discussed here. Before we continue let's differentiate b/w a **method** and **query**.

- `method` is a class function for a model that is called directly on a `model`.
  E.g `find()`,`deleteOne()`,`updateMany()`,`create()`,`where()`
- `query` is a class function that can be chained to the results obtained after executing `method` on a `model` i.e running a query.
  E.g `limit()`,`select()`,`populate()`,`equals()`,`lt()`,`gt()`

#### Custom Methods

We can create custom methods and attach them to out models.
For this we have to keep 2 things in mind

1. To attach the `method` on the **modelSchema** (before creation of model).
2. Do not use arrow functions. Because methods are the functions attached to a class and arrow functions don't work there.

Before we move on to code, we have to understand the difference b/w **`methods`** and **`statics`**. Both are actually methods but

- `method` is the function accessible only from **_model instance_** i.e document.
- `statics` is the function accessible **_directly from model_**.

**Methods**
Creating methods

```
userSchema.methods.sayHello = function() {
  console.log(`Hello World! My name is ${this.name}`) // name is the property of the userModel
}
```

Using methods:

```
const newUser = new User(...userData)
newUser.sayHello()
```

**Statics**
Creating Statics:

```
userSchema.statics.findByName = function(nameInput) {
  nameInputCaseInsensitive =new RegExp(name,'i'); // this is merely to make the input case insensitive.
  return this.find({name: nameInputCaseInsensitive })
}
```

Using Statics:
`User.findByName('Shahzeb')`

#### Custom Queries

Just like custom methods/statics, custom queries can also be chained to the models. However, they will be accessible only after a method has been called i.e. a query is made

Creating a query:

```
userSchema.query.byName = function(nameInput) {
  return this.where({name: newRegExp(nameInput, 'i')})
}
```

Using query:

`User.find().byName('Shahzeb')`

#### Virtuals

Sometimes we may want to fetch some data property but don't want it to be saved in the original structure. Maybe bcz it is based on other properties or just random info.
In these cases we define a `virtual` property/field of the document.

Created as:

```
userSchema.virtual('namedEmail').get(function(){
  return `Email for ${this.name} is ${this.email}`
})
```

Used as:

```
newUser
.find({name:'Shahzeb', email: {test@gmail.com}}
.namedEmail() // 'Email for Shahzeb is test@gmail.com'
```

#### Middlewares

##### Pre

If we want to run a logic before we execute a `save()` method.

```
userSchema.pre('save',function(next){
  this.updatedAt = Date.now()
  next() // tells the user to proceed to save()
})

```

This will run whenever we save a document i.e.
`await newUser.save()`

##### Post

If we want to run a logic after we execute a `save()` method.

```
userSchema.post('save',function(doc,next){
  doc.sayHi() // 'doc' is available instead of 'this'
  next()
})

```

This will run whenever we save a document i.e.
`await newUser.save()`

## Resources

```
userSchema.pre('save',function(next){
  this.updatedAt = Date.now()
  next() // tells the user to proceed to save()
})

```

This will run whenever we save a document i.e.
`await newUser.save()`

[WebDev Video Link](https://www.youtube.com/watch?v=DZBGEVgL2eE)
[WebDev Mongo CheatSheet](https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbm5WZkRmRXQ0aDFFN0tCMnNyQS1kNG1la0ctZ3xBQ3Jtc0trR2tJc1NCNmoteU1PNWJtcWp6TEtfOHpWVWNiLWxZWmZtakx5X0ZQRXhFU3BjeXgzTnZ0cHBrNDhhNWlLYmQ5LXVkNmxLZDlGVV8yRWJDRTU4cVZlc1RTdnRleUI3MGh3N2hBbmpseGlkMEtVY0FFMA&q=https%3A%2F%2Fwebdevsimplified.com%2Fmongodb-cheat-sheet.html)

Useful Articles

1. [Setting up MongoDB Connection - FreeCodeCamp](https://zellwk.com/blog/local-mongodb/)
2. [Mongoose 101: An Introduction to the Basics, Subdocuments, and Population - FreeCodeCamp](https://www.freecodecamp.org/news/mongoose101/)
3. [MongoDB Article - WebDevSimplified](https://blog.webdevsimplified.com/2022-02/mongo-db/)
4. [Updating Documents with ReplaceOne - GfG](https://www.geeksforgeeks.org/mongoose-replaceone-function/)
5. [Updating Documents with ReplaceOne - Mongoose Docs](https://mongoosejs.com/docs/api.html#model_Model.replaceOne)

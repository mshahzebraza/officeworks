### Code

There's a PO-Detail file that contains:

```
export default function POdetail({ pageId = 1 }) {

if ( ... ) router.push( ...some domain...)

return (
  // some JSX
)
}
```

Whenever we try to start the app by visiting the POdetail Page, it throws an error.
Surprising, user can navigate to detail page from other pages _(not through URL bar as it would trigger app restart)_ but starting the app on the po-detail page is not possible.
Reloading the po-detail page renders the same error.

### Error Message

The message shown in the browser by the error is

```
Error: No router instance found.
You should only use "next/router" on the client side of your app.

```

A Github Bug Report of same error can be found [here](https://github.com/vercel/next.js/issues/6713).

### Error Message

It looks like the error goes away if we do any of the following things.

### UseEffect

wrap the code with the routing logic in a `useEffect` hook

```
export default function POdetail({ pageId = 1 }) {

  useEffect(()=>{
    if ( ... ) router.push( ...some domain...)
  })

return (
  // some JSX
)
}
```

### Remove the router code

Removing the code with routing logic relieves us of the error. In this example:

```
export default function POdetail({ pageId = 1 }) {

/*
  ****  Comments Start  ****
  if ( ... ) router.push( ...some domain...)
  ****  Comments End    ****
*/

return (
  // some JSX
)
}
```

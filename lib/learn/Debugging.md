Debugging full stack applications using `console.log()` is a pain. Recently i tried using the VScode debugger and found an article to do just that. (Resource #01)

### Setting up

#### Editing package.json

Added the script in package.json()
`"dev": "NODE_OPTIONS='--inspect' next dev"`

But an error was thrown saying:

> 'NODE_OPTIONS' is not recognized as an internal or external command, operable program or batch file.

A solution suggesting the use of `cross-env` as dev-dependency was found. (Resource #02 & #03) **worked**.

#### Apollo Client

#### Apollo Provider

### Resources

1. [Dev.to Article on NEXT App debugging](https://dev.to/vvo/5-steps-to-debugging-next-js-node-js-from-vscode-or-chrome-devtools-497o)
2. [Stack Overflow](https://stackoverflow.com/questions/53948521/node-options-is-not-recognized-as-an-internal-or-external-command).
3. [NEXT Official Debugging Guide](https://nextjs.org/docs/advanced-features/debugging)

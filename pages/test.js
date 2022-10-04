// Input
/*
Component: 'CustomComponent'
componentPropsObjects: {
    id: {x:1,y:2},
    name: {a:3,b:4},
}
*/
// Output:(JSX)
/* [
    <CustomComponent key='id' x='1' y='2' /> 
    <CustomComponent key='name' a='3' b='4' /> 
] */

// Input (Nested)
/*
Component: 'CustomComponent'
componentPropsObjects: {
    id: {x:1,y:2},
    name: {
        a:{
            a1:3,
            a2:4
        },
        b:{
            b1:3,
            b2:4
        }
    },
}
*/
// Output:(JSX)
/* [
    <CustomComponent key='id' x='1' y='2' /> 
    <CustomComponent key='name.a' a1='3' a2='4' /> 
    <CustomComponent key='name.b' b1='3' b2='4' /> 
] */

export function getComponentArrayWithProps(Component, componentPropsObject, nestedKeys = false) {

    // Loose the keys of the object and get an array of values
    const componentPropsEntries = Object.entries(componentPropsObject)

    // For each value get the JSX of "FormikControl"

    const compArr = componentPropsEntries.reduce(
        (acc, [compName, compProps], idx) => {
            const componentPropsEntries = { a: { a1: 'configForA1', a2: 'configForA2' }, b: 2, c: 3 };

            // for 3nd iteration
            const c3Name = 'c', c3Props = 3;
            // for 2nd iteration
            const c2Name = 'b', c2Props = 2;
            // for 1st iteration
            const c1Name = 'a';
            const c1Props = { a1: 'configForA1', a2: 'configForA2' };

            if (!!nestedKeys && nestedKeys.includes(compName)) {
                // check if the current key is the nested key
                const c1PropsEntries = [["a1", 'configForA1'], ["a2", 'configForA2']]
                Object.entries(compProps)
                    .forEach(
                        ([nestedKeyCompName, nestedKeyCompProps], nestedIdx) => {
                            // 1st iteration
                            // [nestedKeyCompName, nestedKeyCompProps] = ['a1','configForA1']
                            acc.push(
                                <Component
                                    key={`${nestedKeyCompName}_${nestedIdx}`}
                                    {...nestedKeyCompProps}
                                />)
                        })

            } else {
                // spread the component-props onto <Component {...component-props} />
                acc.push(
                    <Component
                        key={`${compName}_${idx}`}
                        {...compProps}
                    />
                )
            }

            return acc;
        },
        []
    )

    return compArr
}
import { checkDataType, cloneAndPluck, deepClone } from "./reusable";


cloneAndPluck

export function updateFlexibleModuleSpecs(moduleSpecs, updateFormData = {}) {


    const permanentFields = [
        // Always present
        '_id',
        'id',
        'name',
        'linkedMWOs',
        'linkedPOs',
        'qty',
        'unitPrice',
        'remarks',
        // Present after specs-update
        'application',
        'type',
        // ? Flexible - we want to delete these and add then add the flexible fields from the form
        // 's1',
    ];

    moduleSpecs = {
        ...cloneAndPluck(
            moduleSpecs,
            permanentFields
        ),
        ...updateFormData
    }


    return moduleSpecs;

}


// export a function named filterPOmoduleData & filterMWOmoduleData which returns the received data
/* 
  const formFieldsPOitem = {
    ? module specific
    id
    name
    application
    type
    
    ? source specific
    qty
    unitPrice
    remarks
  }
*/
// ? source-specific and independent module data
export const filterPOmoduleData = (data) => {
    // const { id, name, application, type, ...sourceData } = data;
    const { qty, unitPrice, remarks, ...moduleData } = data;

    return [
        moduleData,
        { qty, unitPrice, remarks },
    ];
}

/*
  const formFieldsMWO = {
    ? module specific
    TODO: Rename 'itemId' and 'itemName' to 'id' and 'name' respectively
    itemId
    itemName
    application
    type
    
    ? source specific
    mwoId
    qty
    status
    title
    remarks
  }

  ? const { id, name, type, application ...sourceDataPOitem } = formFieldsPOitem;
  ? const { itemId: id, itemName: name, type, application ...sourceDataMWO } = formFieldsMWO;

*/
export const filterMWOmoduleData = (data) => {
    // const { itemId: id, itemName: name, application, type, ...sourceData } = data;
    const { qty, remarks, ...moduleData } = data;

    return [
        moduleData,
        { qty, remarks }
    ];
}


// ? source-specific and independent module data
export const separateModuleAndSourceData = (data, sourceType = null) => {
    let sourceData = {};
    const { qty, unitPrice, remarks, ...moduleData } = data;

    if (sourceType === 'PO') {
        sourceData = { qty, unitPrice, remarks };
    } else if (sourceType === 'MWO') {
        sourceData = { qty, remarks };
    } else {
        return [moduleData, null];
    }

    return [
        moduleData,
        sourceData
    ];
}

export const sourceSpecificKeys = (sourceType = 'po') => {
    if (sourceType === 'po') return ['unitPrice', 'qty', 'remarks']
    if (sourceType === 'mwo') return [/* 'unitPrice',  */'qty', 'remarks']
}

export const moduleSpecificKeys = (returnLinkedFields = false) => {
    const moduleKeys = [
        "id",
        "name",
        "application",
        "type",
    ]
    if (!!returnLinkedFields) moduleKeys.concat(['linkedMWOs', "linkedPOs"])
    return moduleKeys
}



// takes in a list of POitems and returns a list of POitems with the linked modules populated
export function mapModulesToPO(linkedModules, moduleList) {
    return linkedModules.map((linkedModule) => {
        const { item: moduleRef, ...rest } = linkedModule;

        // match module._id with linkedModule.item
        const matchingModule = deepClone(
            moduleList.find(module => {
                return module._id === moduleRef
            })
        ) || {}

        // ? " || {} " was added to solve the problem of delay in state update. In the 1/2 of the state update, the empty module is returned to avoid the error and upon the 2/2 state update the logic runs again and fetches the matchingModule
        console.assert(matchingModule, 'MatchingModule is empty. Must Not Happen', matchingModule);

        delete matchingModule.linkedPOs;
        delete matchingModule.linkedMWOs;
        delete matchingModule.__v;

        return {
            ...matchingModule,
            ...rest,
        }

    })

}
export function getOf(sourceObject, desiredDataKey) {
    // desiredDataKey === 'key2'
    // Input
    /* { 
        id: {key1:'',key2:'hello'} , 
        name: {key1:'',key2:'Jane Doe'} 
    } */
    // Output
    /* { 
        id: 'hello' , 
        name: 'Jane Doe' 
    } */

    const sourceEntries = Object.entries(sourceObject);
    /* 
    [ 
        ['id', {key1:'',key2:'hello'} ], 
        ['name', {key1:'',key2:'Jane Doe'} ] 
    ]
    */
    const reducedObject = sourceEntries.reduce(
        (prev, cur) => {
            const [sourceKey, sourceValue] = cur;
            prev[sourceKey] = sourceValue[desiredDataKey];
            return prev;
        }, {}
    )
    return reducedObject;
}

export function getObjectWithValuesAt(index, source, nestedKeysWrapper = false) {
    // Input: //? index:1, source: {x:['x1','x2'],y:['y1','y2']}
    // Output //? {x: 'x2', y: 'y2'}

    const responseObj = {};
    for (const key in source) {

        const [firstKey, ...nestedKeys] = key.split('.');

        if (!!nestedKeys.length) { // if nested keys exist
            const [secondKey, ...deepNestedKeys] = nestedKeys;
            if (!!deepNestedKeys.length) throw new Error('Multi-Nested keys are not supported yet');

            // if the first key is not defined already set it to {}
            responseObj[firstKey] = responseObj[firstKey] ?? {};
            responseObj[firstKey][secondKey] = source[key][index];


        } else { // if nested keys do not exist
            responseObj[firstKey] = source[key][index]
        }
    }

    // Wrap the nested keys in a nestedKeysWrapper object
    if (nestedKeysWrapper) {
        // check if any nested keys exist
        const wrappedResponseObj = Object.entries(responseObj).reduce(
            (acc, [key, value]) => {
                // check if the value is an object
                checkDataType(value) === 'object'
                    ? acc[key] = nestedKeysWrapper(value)
                    : acc[key] = value;
                return acc;
            }, []
        )
        return Object.fromEntries(wrappedResponseObj);
    }
    return responseObj;

}

export function renderComponentWithProps(Component, componentPropsObject, nestedKeys = false) {

    // Loose the keys of the object and get an array of values
    const componentPropsEntries = Object.entries(componentPropsObject)

    // For each value get the JSX of "FormikControl"

    const compArr = componentPropsEntries.reduce(
        (acc, [compName, compProps], idx) => {

            if (!!nestedKeys) {
                if (nestedKeys.includes(compName)) {
                    Object.entries(compProps).forEach(([nestedKeyCompName, nestedKeyCompProps], nestedIdx) => {
                        acc.push(
                            <Component
                                key={`${nestedKeyCompName}_${nestedIdx}`}
                                {...nestedKeyCompProps}
                            />)
                    })

                } else {
                    acc.push(
                        <Component
                            key={`${compName}_${idx}`}
                            {...compProps}
                        />)
                }

            } else {
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
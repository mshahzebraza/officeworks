import { makeVar } from "@apollo/client";

const projectApollo = makeVar([
  {
    summary: {
      nomenclature: 'PEMA-R380-BL',
      type: 'EM-Rotary',
    },
    assemblies: [
      { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' },
      { nomenclature: 'Main Assembly', id: '0000', parent: null },
    ],

  },
  {
    /* restructure 2.0
    nomenclature,
    type, ...  
    */
    summary: {
      nomenclature: 'PEMA-L3K-BD',
      type: 'EM-Linear',
      application: 'AbWS', //
      // !NOTE: The fetching in the following two properties can be made easy if objects are created using classes
      target: '55', // fetched dynamically from targets based on the project nomenclature
      stock: '15', // fetched dynamically from inventory based on the project nomenclature
      status: 'Production', // OR 'R&D' OR 'Closed'
    },

    // Needs to be input before the input of parts
    assemblies: [
      // function of the sub-assembly can also be added later
      { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' }, // This is also a default sub-assembly created by project instance
      { nomenclature: 'Main Assembly', id: '0000', parent: null }, // 'parent: null' means it is the default assembly and all the others are sub-assemblies
      { nomenclature: 'Ball Lead Screw Assembly', id: '0100', parent: '0000' },
      { nomenclature: 'Output Shaft Assembly', id: '0200', parent: '0000' },
      { nomenclature: 'Housing Assembly', id: '0300', parent: '0000' },
    ],
    parts: [ // can be segregated in two ways. 1. FamilyTree 2. Part-type  
      {
        parentAssemblyId: '0100', // '0000' by default
        // Assembly name may/not included.
        // parentAssemblyName: 'Ball Lead Screw Assembly', // should be shown automatically on parentAssemblyInput but not saved
        type: 'purchased', // OR Standard OR Manufactured
        nomenclature: 'Ball Lead Screw',
        // Input shows a drop-down of Assemblies' nomenclature but saves the assemblies' ID.
        // Relative id cannot be used as the special parts are given Numerical IDs. They are called by their standard nomenclatures.
        id: 'PEMA-L3K-BD-0100-01', // PEMA-L3K-BD-0100- (ProjectId + AssemblyId) prefix is suggested in the form inputs if part type is manufactured. However, they are still saved in full form. 
        qty: 1,
      },
      {
        parentAssemblyId: '0100',
        type: 'manufactured',

        nomenclature: 'Pulley Shaft',
        id: 'PEMA-L3K-BD-0100-02',
        qty: 2,
      },
      {
        parentAssemblyId: '0200',
        type: 'purchased',

        nomenclature: 'Potentiometer',
        id: 'MLS-130-100-S-N',
        qty: 1,
      },
      {
        parentAssemblyId: 'FAST', // all fastener items are set in 'FAST' OR 'XXXX' OR '0000' Assembly be default
        type: 'standard',

        nomenclature: 'bearing', // OR Screws, Washers etc
        // Different id input types will be provided to the user in forms based on type of fastener 
        id: '7201 AC', // M5 x 12 (Screws) OR M4 (Washers)
        qty: 2,
      },
      {
        parentAssemblyId: 'FAST', // all fastener items are set in 'FAST' OR 'XXXX' OR '0000' Assembly be default
        type: 'standard',

        nomenclature: 'bearing', // OR Screws, Washers etc
        // Different id input types will be provided to the user in forms based on type of fastener 
        id: '7201 AC', // M5 x 12 (Screws) OR M4 (Washers)
        qty: 2,
      },
    ],

  },
  {
    summary: {
      nomenclature: 'PEMA-L9.5K-BD',
      type: 'EM-Linear',
    },
    assemblies: [
      { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: '0000' },
      { nomenclature: 'Main Assembly', id: '0000', parent: null },
    ],
  }
])

// Target: Project.summary

export const deleteProjHandler = (pjId) => {
  let pjState = [...projectApollo()]

  // // Check the matching Project ID
  const targetIndex = pjState.findIndex(pj => pj.summary.nomenclature === pjId)
  const targetExists = targetIndex >= 0;

  targetExists
    ? pjState.splice(targetIndex, 1)
    : console.log(`Deletion failed! ${pjId} doesn't contain any part of ID`);

  projectApollo(pjState)
}
export const updateProjSmryHandler = ([summaryData]) => {
  let pjState = [...projectApollo()]
  const targetIndex = pjState.findIndex(pj => pj.summary.nomenclature === summaryData.nomenclature)
  const targetExists = targetIndex >= 0;

  targetExists
    ? pjState[targetIndex].summary = summaryData
    : console.log(`Project Id doesn't match existing Projects`);

  projectApollo(pjState)
}
export const addProjSmryHandler = ([summaryData]) => {
  let pjState = [...projectApollo()]

  const targetIndex = pjState.findIndex(pj => pj.summary.nomenclature === summaryData.nomenclature)
  const isUnique = targetIndex === -1;

  if (isUnique) {
    pjState.push({
      summary: {
        ...summaryData
      },
      assemblies: [
        { nomenclature: 'Main Assembly', id: '0000', parent: null },
        { nomenclature: 'Fasteners & Misc', id: 'FAST', parent: 'Main Assembly' }
      ]
    })

  } else { console.log(`Project Id matches one of existing Projects`) }

  projectApollo(pjState)
}

// Target: Project.parts[x]
export const deleteProjModHandler = ([pjCatName, pjId, partId]) => {
  let pjState = [...projectApollo()]

  const targetParent = pjState.find(pj => pj.summary.nomenclature === pjId)
  console.log('targetParent', targetParent);

  const targetIndex = targetParent.parts.findIndex(part => part.id === partId)
  const targetExists = targetParentIndex >= 0;

  targetExists
    ? targetParent.parts.splice(targetIndex, 1)
    : console.log(`Deletion failed! ${pjId} doesn't contain any part of ID: ${partId}`)

  projectApollo(pjState)
}
export const updateProjModHandler = ([pjCatName, pjId, formData]) => {
  let pjState = [...projectApollo()]

  // Check the matching Project
  const targetParent = pjState.find(pj => pj.summary.nomenclature === pjId)

  // Check for duplicates id
  const targetIndex = targetParent.parts.findIndex(part =>
    part.id === formData.id
  )
  console.log('targetIndex', targetIndex);
  const targetExists = targetIndex >= 0;

  if (targetExists) { // if module is found 
    targetParent.parts.splice(targetIndex, 1, formData)
  } else { // never happens  // unless ID itself is changed
    console.log(`Part Id not found`);
  }

  projectApollo(pjState)
}
export const addProjModHandler = ([pjCatName, pjId, formData]) => {
  let pjState = [...projectApollo()]

  const targetParent = pjState.find(pj => pj.summary.nomenclature === pjId)


  if (targetParent.parts) { // if parts array exists

    // Check for duplicates id
    const targetIndex = targetParent.parts.findIndex(part =>
      part.id === formData.id
    )
    const isUnique = targetIndex === -1;

    if (isUnique) {
      targetParent.parts.push(formData)
    } else {
      console.log(`Module Id already exists`);
    }

  } else {
    // create a new parts array
    targetParent.parts = [
      formData
    ]
  }

  projectApollo(pjState)
}

// Target: Project.assemblies[x]
export const deleteProjAssyHandler = ([pjCatName, pjId, removeAssemblyId]) => { // action.payload = [formData, =>ldItems]
  let pjState = [...projectApollo()]

  const targetParent = pjState.findIndex(pj => pj.summary.nomenclature === pjId)
  // Break if duplicate assembly is not found
  const targetIndex = targetParent.assemblies.findIndex(assemblyItem => assemblyItem.id === removeAssemblyId)
  const targetExists = targetIndex !== -1;
  if (targetExists) {
    targetParent.assemblies.splice(targetIndex, 1)
  } else {
    console.log('Assembly Id not found');
  }
  projectApollo(pjState)
}
export const addProjAssyHandler = ([pjCatName, pjId, formData]) => { // action.payload = [formData, =>ldItems]
  let pjState = [...projectApollo()]

  // // Check the matching type
  const targetParent = pjState.find(pj => pj.summary.nomenclature === pjId)

  // Break if duplicate assembly Id is found
  const targetIndex = targetParent.assemblies.findIndex(assemblyItem => assemblyItem.id === formData.id)
  const isUnique = targetIndex === -1;
  if (isUnique) {
    targetParent.assemblies.push(formData)
  } else {
    console.log('Duplicate found');
  }
  projectApollo(pjState)
}
export const updateProjAssyHandler = ([pjCatName, pjId, formData]) => { // action.payload = [formData, =>ldItems]
  let pjState = [...projectApollo()]

  const targetParent = pjState.find(pj => pj.summary.nomenclature === pjId)

  const targetIndex = targetParent.assemblies.findIndex(assemblyItem => assemblyItem.id === formData.id)
  const targetExists = targetIndex !== -1;
  // Break if duplicate assembly is not found
  if (targetExists) {
    targetParent.assemblies.splice(targetIndex, 1, formData)
  } else {
    console.log('Assembly id not found');
  }
  projectApollo(pjState)
}




export default projectApollo;
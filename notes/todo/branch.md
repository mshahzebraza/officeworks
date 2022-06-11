# Troubleshooting

### Bonus

- Change UI to look like a dashboard-app instead of a website

## Task(s)

### Current

##### 1. Make a Module Directory - Sort of a Catalogue

- Make a Module Directory where all the items (purchase/not purchased/mfg/non-mfg) must be listed.
- User must create and list a new module before linking with purchase/mwo/project.
- RN any new addition to purchase/mwo is listed in the module as a new item. Also, the existing module's nomenclature is listed as dropdown while adding a new po/mwo item.
- However, the same doesn't happen for projects. The parts listed in the projects are isolated and cannot be tracked to the module.
- Therefore, a module directory must be maintained on the FE and any new addition to PO/MWO/Project must be done after the module is created in directory only through linkage.
- All the fields of modules from moduleList must be displayed in the Inventory Page except the linked POs/MWOs.
- Linked Requests, QC etc. must also be added in future to the structure.
- Required Quantity field may also be calculated dynamically on each:
  - update in the project target quantity
  - linking/de-linking with project
- Add forms for:
  - Adding Module
  - Update Module
- **Complete form functionality**
  - Ensure that all field data is properly reflected in Edit fields including specs
  - Ensure that the data gets passed to the moduleApollo for every form
  - Ensure that all the form Data connects with backend functions
  - Ensure all BE functions to Update DB

##### 2. Implement Dropdown functionality in name and id both for itemForm

- Make the addItem logic of mwo/po-details such that the id and nomenclature both are fetched simultaneously.

### Others

- Inventory

  - What happens to transactions when the original PO/MWO is deleted.
  - "Qualified/Total/Target" field must be added in each of sub-assy and part(s) in project details to get an idea of how many parts are needed currently. Colors can be used to indicate the current state.
    - Green: qualified inventory fulfills demand
    - Yellow: Total Inventory fulfils demand
    - Orange: Production/Purchase In-Process to meet demands
    - Red: PO/MWO required to meet demands

- Linking of Inventory with PartList

  - If a part is added to a partList without it being present in the module list then a new module with a tempID and secondaryID (same as partList partID) will be created and hence the partList part will be linked to the module.
  - If the partID already corresponds to the moduleID then the project part will be linked to the module directly using the moduleID.

- Transactions

  - transactionController still has the logic for single transaction addition. Remove that
  - po & mwo deliver different details to transaction-mapping functions
  - Still do not have some fields
  - error on deleting - sometimes

- Projects Page
  - Parts of the project(s) are not linked to procured/manufactured parts... Addition of project-parts must be bound to po/mwo/inventory list.
    - Any part that is not present in the list, must be created after the addition of the part in the module list.
    - If after adding the module from project-parts, the parts is then ordered through po/mwo then the primary name of the part must be the one in the po/mwo.
      - For example, part a2 was added through project, and a1 was ordered through po. And later on it was found that a2 is same as a1, At this point, there should be an option in both/any summary of po/project-part to link the two parts. project-part summary (linked with module list) should give an option to link with po-part, and po-part summary should give an option to link with project-part. However, this may not be possible as both summaries, project & po/mwo, show the part details from the module list. Hence, the option should say "Merge with another part" maybe.
  - Summary button to show summary of project is not working
  - view-logic of projects is not working
  - restructuring of apollo & controller logic to make the project consistent with projectModel is needed.
  - Create a tree of assemblies using the parent-child linkage
- centralization of MWO_Summary? and of MWO_entry
- module state-manipulation functions are combined for po & mwo

- Module-api controller segregation
  - Segregate the module-controllers for po and mwo to separate functions instead of using if-else on params to decide the controller logic
  - Upon segregation, where do we keep the item-spec function. does it stay in common module-api or in module-po-api etc.

# Fiver Gig Descriptions

## Old Description

As a team of professional web designer/developer we believe your online presence should be as unique as your business.

We create modern, attractive, mobile-friendly WordPress Landing Page/Websites for personal/business use & offer services including

e-commerce, the agency, blog/news, real-estate etc.

This is what you'll get:

Build your website according to your custom theme (or request )
Customize your website to meet your needs
Install any required plugin
Uploading of high quality photos/contents(provided/dummy)

BASIC Package: Beautiful responsive website made in WordPress (1 page) with responsive design and basic onsite SEO optimization.

STANDARD Package: Beautiful responsive website made in WordPress (up to 5 pages) with responsive design and full onsite SEO optimization

PREMIUM Package: You will get the same features as in Silver Package but unlimited pages + Offsite SEO which includes 10HQ backlinks that will help you to rank your site higher in search engines and e-Commerce or Membership functionality (if needed)

## New Description

Hello! I am a Frontend React Web developer who builds Mobile-Friendly/ Responsive, Pixel-Perfect, beautiful, dynamic Websites and Web Applications with React JS.

I'm a huge fan of reusable, readable & maintainable code and love to write clean code.

In this world of online shopping, e-commerce, and online marketing, it is important to have a customized & responsive website to help you reach your target audience & to convert your visitors into customers.

Why me?

    However, it is not easy to create a high converting website. That's why I am here to help you to create a high converting professional website using the latest technologies like HTML5/CSS3, React, Node.js, MongoDB, etc.

    Whether its a landing page, blog, e-commerce, or a business website, you'll get a mobile responsive & easy to use professional website that will help you boost your business and your career. Here are my skill sets.

FRONTEND

- HTML5/CSS3

- React.js

- Next.js

- Redux & Context API

- React Hooks, ES6, ES7, ES8, ES9

- SCSS, Styled Components

BACKEND

- Node.js

- Express.js

- Axios

- GraphQL

- Restful API

DATABASE

- MongoDB

- Firebase

## Growing Developer

I am new to the world of Web Development and I am looking forward to learn and grow as a Web Developer.

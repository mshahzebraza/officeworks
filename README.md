# MultiForm Input Component

#### How do i control the sub-categories?

When using the component, user can specify the number of sub catagories needed in the list. For each sub-category a button will appear below the form which will let us create an input for that specific category. The values from inputs will then be stored in separate categories according to their levels.

#### Why didn't I use onBlur event to handle Input change events?

I wanted to achieve two way binding with my input and state. Since, two-way binding cannot be achieved by using onBlur event, therefore i had to use onChange event.

#### Data List or placeholder values?

An array of default field KEYS is passed to the form component which is then, through a helper function, translated into the required data. However, if we change the input array from string elements to object elements containing the required field caption, placeholder & dataList values then the desired functionality can be achieved.

#### Can i optionally set some default parameters for the form that the user MUST fill?

Yes, if we pass an object with a key of 'req' set to 'true' then the client must fill that piece of data.

#### Problems with form validations?

Don't Ask!

1. First problem i faced was that i had the submit handler on the submit button which was linked to a submitHandler. Now i expected it to let me go to the un-filled 'required' inputs on clicking but instead it didn't respond. The reason was the fact that i had preventDefault running in its handler.
2. Now when i tried deleting the preventDefault, it started to reload and state vanished.
3. Then, I finally understood the problem and added the submitHandler on the parent form element instead of the button and changed the button type to submit to link it to the form submission.

#### Arrays & Objects

##### Named keys in Arrays?

I accidentally found out that arrays can also have named keys. However, the keys will remain in the order in which they are inserted in the array. Cool, right?

##### Named variables inside object?

if you pass an already defined variable (containing value) inside an object, then the variable-name and the value will be stored as key & value pair. However, if the variable is empty, it'll throw an error.

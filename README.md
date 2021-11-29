# MultiForm Input Component

#### Why didn't I use onBlur event to handle Input change events?

I wanted to achieve two way binding with my input and state. Since, two-way binding cannot be achieved by using onBlur event, therefore i had to use onChange event.

#### Can i optionally set some default parameters for the form that the user must fill?

Yes, if we pass an object with a key of 'req' set to 'true' then the client must fill that piece of data.

#### Problems with form validations?

Don't Ask!

1. First problem i faced was that i had the submit handler on the submit button which was linked to a submitHandler. Now i expected it to let me go to the un-filled 'required' inputs on clicking but instead it didn't respond. The reason was the fact that i had preventDefault running in its handler.
2. Now when i tried deleting the preventDefault, it started to reload and state vanished.
3. Then, I finally understood the problem and added the submitHandler on the parent form element instead of the button and changed the button type to submit to link it to the form submission.

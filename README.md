# MUI Component storybook like dashboard element

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Concept:
The useComponentList context hook provides access to the initial data.
It also provides a method for updating the default Value of properties for the Button component.

There is a single Page - Component Display.
This page consumes the useComponentList hook, and passes the data down to it's children.

The page is the layout for the topbar, the component preview ( Mui Button ), and the Properties Component.

The Properties Component utilizes the Property and PropertyForm components.

Property consumes the updateADefaultValue method from the useComponentList hook.

This allows the Component Preview to change as the default Values change.
The current modifiable values are { color, size, variant, and fullWidth }

Library visibility, Component settings, Deleting, and saving have not been implemented.
Hide property has not been implemented, though if done, it would be similar to updateADefaultValue

I chose to alter default values via the property, in place of not knowing how component settings was to be implemented, since the design lacked it.
Primarily because it shows how to tie in data with a live preview.


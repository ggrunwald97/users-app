### About
This project was created as a demo to perform CRUD operations on a user object. It has routing and redux toolkit set-up and working.<br />
Form logic is done with Formik (form management) and Yup (validation). I created a simple input field with minimal props which is used in a few places.
It also has a Login page with hard-coded creds. Upon refresh, you will be redirected back to the Login page (Redux loses the data that tells it that you are logged in)

The Redux side of this app is designed to keep up with the backend. For example, instead of having to re-fetch a Users list after adding/editing/deleting a user, we actually splice in / out the user which was modified and maintain the list of users, minimizing API calls. You can view the users data in the Redux store using Redux Devtools -> navigate to the 'users' section.
I chose Redux Toolkit because it reduces the amount of boilerplate that generally comes along with using redux (saga, for example).

The API docs can be found here: https://gorest.co.in/

Dependency info:
Redux Toolkit https://redux-toolkit.js.org/tutorials/quick-start
Formik + Yup https://formik.org/docs/api/useFormik
React Router https://reactrouter.com/

### Logging in
This app is deployed at: https://users-app-1cf4c.web.app/login<br />
user: admin@test.com<br />
pw: password<br />

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run :

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deploying Manually
Run `npm run build` and then `firebase deploy`

### Automatic Deployments
Deployments happen upon every commit to master.


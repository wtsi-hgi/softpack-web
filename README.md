[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Softpack Web

Softpack Web provides the graphical user interface, designed using the [Tokyo React Template](https://github.com/bloomui/tokyo-free-white-react-admin-dashboard), for those services which are provided by softpack: essentially, multi-user software environment sharing, management and creation!

## Installation

### Starting the React App
At the time of writing - whilst this app is still undergoing development - this app must be started through two commands, which are to be ran from inside the directory of the cloned version of this repository.

1. `npm install` - this will install all the necessary packages and dependencies for Softpack Web.
2. `npm start` - this will compile and start the app (in development mode).

### Starting the server
Then, once the above steps are complete, the user must also start the server, which is what the React App will communicate with. 
This is done by,

1. Opening another terminal, and navigating towards `softpack-web/src/content/graphQL` (a slightly obscure location albeit, but this will be changed before production, and this documentation will be updated accordingly).
2. Then, typing `node index.js` - this will start the [Apollo](https://www.apollographql.com/docs/apollo-server/) Server.

### Using the app
Once complete, you should be able to use the app and explore the range of features which Softpack Web has to offer!

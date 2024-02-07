[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
# Softpack Web

Softpack Web provides the graphical user interface, designed using the [Tokyo React Template](https://github.com/bloomui/tokyo-free-white-react-admin-dashboard), for those services which are provided by softpack: multi-user software environment sharing, management and creation!

## Installation

### Starting the React App
At the time of writing - whilst this app is still undergoing development - this app must be started through three commands, which are to be ran from inside the directory of the cloned version of this repository.

1. `git checkout develop` - this makes sure you are in the correct branch.
2. `npm install` - this will install all the necessary packages and dependencies for Softpack Web.
3. `npm run dev` - this will compile and start the app (in development mode).

### Starting the server
Then, once the above steps are complete, the user must also start the server - SoftPack Core - this is what the React App will communicate with. 
This is done by,

1. Git clone `https://github.com/wtsi-hgi/softpack-core.git`
2. `poetry install` - this will install all the necessary packages and dependencies for Softpack Core.
3. `softpack-core service run` - this will compile and start the server.

### Using the app
Once complete, you should be able to use the app and explore the range of features which Softpack Web has to offer!

## Development

### Regenerating GraphQL types
The types of data returned by GraphQL queries are automatically generated from the softpack-core GraphQL schema.
To regenerate the types after schema changes, first regenerate the upstream softpack-core schema (using `strawberry`, see the softpack-core README), then run `npm run gen`.
This assumes that the upstream schema is located at `../softpack-core/schema.graphql` (edit `codegen.ts` if that's not the case).

The generated code is committed to the repository to avoid everyone having to do this to get the code to run at all.

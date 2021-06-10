cd packages
npx create-react-app frontend --template typescript
yarn eject
delete all lock files and node_modules

add to root's package.json
  "workspaces": [
    "packages/*"
  ],
  "private": true,

npm install eslint --save-dev
npx eslint --init

no longer can start
config eslintrc.json
delete all lock files and node_modules
yarn install
put .eslintrc.json on each package
restart vscode
can start again

config circleci
  - install
  - linting
  - testing
  - building
  - upload to s3
create aws s3 buckets for each package
  - allow public objects permission
  - enable static web hosting

Creating protected route 
  - https://stackoverflow.com/questions/47747754/how-to-rewrite-the-protected-private-route-using-typescript-and-react-router-4

Breakpoints:
  - xs, extra-small: 0px
  - sm, small: 600px
  - md, medium: 960px
  - lg, large: 1280px
  - xl, extra-large: 1920px

To make material-UI work with styled-component and typescript:
  - https://github.com/mui-org/material-ui/issues/13921#issuecomment-484133463

When updating a state that depends on its previous value consider using useReducer hook:
  - https://stackoverflow.com/a/62541474/9725161
  - https://reactjs.org/docs/hooks-reference.html#usereducer
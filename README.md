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

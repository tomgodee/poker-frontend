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
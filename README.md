# semantic-release POC

## What does it contain

1. Base typescript node.js app

2. Github actions config to support trunk based development

3. Commands to build and test the app

4. Github actions configured to execute:

- when PR title is updated
- on push to the repo
- when PR merged to master
- when PR is merged to staging
- when PR is merged to production


TODO: 

1. Add staging and production workflows and change the branches to CHANGMETOSTAGINGWHENREADY
2. Fix regexp for PR title to include JIRA number "regexp": "^(feat|fix|docs|style|refactor|perf|test|chore)((([a-zA-Z0-9 -]+)))?:" and BREAKING CHANGE
3. Current staging and production workflows for nx monorepo must be propended with "release flow" (instead of manually trigger the release from github UI)
4. Needs to merge back from production to trunk [master] (changes for CHANGELOG.md, package.json, package-lock.json)
5. Unify GH_TOKEN in secrets from: "NPM_GITHUB_TOKEN" to "GH_TOKEN"
// @source: https://github.com/semantic-release/changelog/issues/51
const currentBranch = process.env.GITHUB_REF && process.env.GITHUB_REF.split("/")[2];

// staging -> prerelese (draft release to github)
// production -> relese 
// (bump version on package.json, package-lock.json and update CHANGELOG.md and relese to github)
const config = {
  branches: ["production", { name: "staging", prerelease: true }],
};

const basePlugins = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
];

const prereleasePlugins = [...basePlugins, "@semantic-release/github"];

const releasePlugins = [
  ...basePlugins,
  "@semantic-release/changelog", // only update changelog for production release
  [
    "@semantic-release/npm", // this is how it does update version in package.json and package-lock.json
    {
      npmPublish: false,
    },
  ],
  [
    "@semantic-release/git",
    {
      assets: ["CHANGELOG.md", "package.json", "package-lock.json"], 
      message:
        "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
    },
  ],
  "@semantic-release/github",
];

const isRelease = config.branches.some(
  (branch) => branch === currentBranch || (branch.name === currentBranch && !branch.prerelease)
);

config.plugins = isRelease ? releasePlugins : prereleasePlugins;

module.exports = config;

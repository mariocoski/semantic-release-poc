// @source: https://github.com/semantic-release/changelog/issues/51const
const branch = process.env.GITHUB_REF && process.env.GITHUB_REF.split("/")[2];

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
  "@semantic-release/changelog",
  [
    "@semantic-release/npm",
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
  (it) => it === branch || (it.name === branch && !it.prerelease)
);

config.plugins = isRelease ? releasePlugins : prereleasePlugins;

module.exports = config;

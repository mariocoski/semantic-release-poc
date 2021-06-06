// @source: https://github.com/semantic-release/changelog/issues/51const
const branch = process.env.GITHUB_REF && process.env.GITHUB_REF.split("/")[2];

const config = {
  branches: ["production", { name: "staging", prerelease: true }],
};

const prereleasePlugins = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
  "@semantic-release/github",
];

const releasePlugins = [
  "@semantic-release/commit-analyzer",
  "@semantic-release/release-notes-generator",
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

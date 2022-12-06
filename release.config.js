module.exports = {
  ci: false,
  branches: ['master'],
  plugins: [
    ['@semantic-release/commit-analyzer', { preset: 'conventionalcommits' }],
    [
      '@semantic-release/release-notes-generator',
      {
        preset: 'conventionalcommits',
        presetConfig: {
          issueUrlFormat: 'https://www.pivotaltracker.com/story/show/{{id}}',
        },
      },
    ],
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/git', { assets: ['package.json'] }],
    ['@semantic-release/github', { labels: false, failComment: false, successComment: false }],
  ],
};

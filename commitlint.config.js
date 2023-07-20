module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'style',
        'chore',
        'refactor',
        'perf',
        'test',
        'docs',
        'cleanup',
        'revert',
        'content'
      ]
    ]
  }
}

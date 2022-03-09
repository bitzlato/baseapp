module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  moduleNameMapper: {
    '^.+\\.(less|scss)$': require.resolve('identity-obj-proxy'),
    '\\.(postcss)$': require.resolve('identity-obj-proxy'),
    '^react-scroll-to-component$': require.resolve('identity-obj-proxy'),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file.js',
    '\\.(scss|pcss)$': '<rootDir>/__mocks__/style.js',
  },
  transform: {
    '^.+\\.css\\.ts$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          '@babel/preset-typescript',
        ],
        plugins: ['@vanilla-extract/babel-plugin'],
      },
    ],
    '^.+\\.(jsx?|tsx?)$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
};

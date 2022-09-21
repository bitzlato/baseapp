const http = require('http');
const fs = require('fs');
const path = require('path');

if (!process.env.TOLGEE_URL) {
  throw new Error('TOLGEE_URL not defined');
}

if (!process.env.TOLGEE_MAIN_API_KEY) {
  throw new Error('TOLGEE_MAIN_API_KEY not defined');
}

if (!process.env.TOLGEE_SHARED_API_KEY) {
  throw new Error('TOLGEE_SHARED_API_KEY not defined');
}

const TOLGEE_URL = process.env.TOLGEE_URL.replace(/\/?$/, '/');
const TOLGEE_API_KEYS = {
  main: process.env.TOLGEE_MAIN_API_KEY,
  shared: process.env.TOLGEE_SHARED_API_KEY,
};
const TARGET_FOLDERS = {
  main: path.resolve(__dirname, '../src/translations'),
  shared: path.resolve(__dirname, '../src/components/shared/sharedLocales'),
};
const LANGUAGES = ['en', 'ru', 'uk'];

const flattenObject = (source, prefix = '') =>
  Object.keys(source).reduce((acc, key) => {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      return {
        ...acc,
        ...flattenObject(source[key], prefix ? `${prefix}.${key}` : key),
      };
    }

    acc[prefix ? `${prefix}.${key}` : key] = source[key];

    return acc;
  }, {});

const fetchProject = (project) => {
  const apiKey = TOLGEE_API_KEYS[project];
  const targetFolder = TARGET_FOLDERS[project];

  LANGUAGES.forEach((lang) => {
    console.log(`${project}.${lang}: : 1/2 Fetching...`);

    http
      .get(
        `${TOLGEE_URL}v2/projects/export?languages=${lang}&zip=false`,
        {
          headers: {
            'X-API-Key': apiKey,
          },
        },
        (res) => {
          console.log(`${project}.${lang}: 2/2 Saving...`);

          let rawData = '';
          res.on('data', (chunk) => {
            rawData += chunk;
          });
          res.on('end', () => {
            if (res.statusCode === 200) {
              try {
                const parsedData = JSON.parse(rawData);
                fs.writeFile(
                  path.resolve(targetFolder, `${lang}.json`),
                  JSON.stringify(flattenObject(parsedData), null, 2),
                  (err) => {
                    if (err) {
                      return console.error(`${project}.${lang}: File write error: ${err}`);
                    }

                    console.log(`${project}.${lang}: Import comleted!`);
                  },
                );
              } catch (e) {
                console.error(e.message, rawData);
              }
            } else {
              console.error(
                `${project}.${lang}: Request Failed. Status Code: ${res.statusCode}`,
                rawData,
              );
            }
          });
        },
      )
      .on('error', (error) => {
        console.error(`${project}.${lang}: Got error: ${error.message}`);
      });
  });
};

fetchProject('main');
fetchProject('shared');

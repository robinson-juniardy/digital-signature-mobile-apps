/* eslint-disable prettier/prettier */
const production = true;

export const constants = {
  backend_url:
    production === true
      ? 'https://disposisi.juniardy.com/api'
      : 'http://localhost:3300/api',
  base_url:
    production === true
      ? 'https://disposisi.juniardy.com'
      : 'http://localhost:3300',
};

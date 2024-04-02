const {envKeys} = require('../keys.json');

const {API_DOMAINS} = envKeys;

const Config = {
  services: {
    mcq: {
      getQuestion: `${API_DOMAINS.questions}`,
      getAnswer: `${API_DOMAINS.answers}id=`,
    },
  },
};

export {Config};

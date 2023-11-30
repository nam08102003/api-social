require("dotenv").config();

module.exports = {
  githubPassport: {
    clientId: process.env.GITHUB_CLIENT_ID,
    secret: process.env.GITHUB_SECRET,
    urlCallback: process.env.CLIENT_URL,
  },

  googlePassport: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    secret: process.env.GOOGLE_SECRET,
    urlCallback: process.env.CLIENT_URL,
  },
};

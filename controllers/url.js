const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortURL(url) {
  if (!url) return "URL is Required";
  const shortID = shortid();

  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
  });
  return `http://localhost:8001/${shortID}`;
  // return res.json({ id: shortID });
}

module.exports = {
  handleGenerateShortURL,
};

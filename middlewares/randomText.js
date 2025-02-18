// random text generation
const randomText = (min, max) => {
    return Math.random(70, 90).toString(36).slice(-36);
     // Generates an 8 character password
  };
  module.exports = {randomText}

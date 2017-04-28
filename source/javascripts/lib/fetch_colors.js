const axios = require('axios');
const cheerio = require('cheerio');

function fetchColor({ id, indices }) {
  return axios.get(`http://colorhunt.co/c/${ id }`).then(({ data }) => {
    let $ = cheerio.load(data);

    let palette = $('#jscode+script').text()
      .match(/itemer[^,]+\W+(\w{6})(\w{6})(\w{6})(\w{6})/)
      .slice(1, 5);

    // let [ background, board, player ] =  indices.map(i => `#${ palette[i] }`);
    let [ background, board, mark ] =  indices.map(i => parseInt(palette[i], 16));
    return { background, board, mark };
  });
}

module.exports = function fetchColors(colors) {
  return Promise.all(colors.map(fetchColor));
}

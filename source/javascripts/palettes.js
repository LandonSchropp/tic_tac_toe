import _ from "lodash";

import colors from "../../temp/colors.json";

let index = -1;
let shuffledColors = _.concat(colors[0], _.shuffle(_.tail(colors)));

export default {

  nextPalette() {
    index = (index + 1) % colors.length;
    return shuffledColors[index];
  }
}

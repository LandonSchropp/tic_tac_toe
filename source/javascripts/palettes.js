import _ from "lodash";

import colors from "../../temp/colors.json";

let index;
let shuffledColors = _.concat(colors[0], _.shuffle(_.tail(colors)));

export default {

  nextPalette() {
    if (_.isNil(index)) { index = -1; }
    index = (index + 1) % colors.length;
    return shuffledColors[index];
  }
}

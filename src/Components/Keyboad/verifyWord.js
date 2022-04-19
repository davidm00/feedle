import { options } from "../../Constants/data";

export const verifyWord = (current, target) => {
  current = current.toLowerCase();
  let positions = ["X", "X", "X", "X", "X"];
  let checked = [];
  if (options.words.includes(current)) {
    if(current === target){
      return ["G", "G", "G", "G", "G"]
    }
    // console.log("Word is in data list");
    [...current].map((letter) => {
      if (!checked.includes(letter)) {
        // console.log("Not in checked: ", letter);
        checked.push(letter);
        let targetPositions = getIndexOfChar(target, letter);
        let currentPositions = getIndexOfChar(current, letter);
        // console.log("tPositions: ", targetPositions);
        // console.log("cPositions: ", currentPositions);
        if (
          JSON.stringify(targetPositions) == JSON.stringify(currentPositions)
        ) {
          // console.log("EQUAL");
          currentPositions.map((index) => {
            positions[index] = "G";
          });
          // targetPositions.toString().length  === currentPositions.toString().length
        }else if(target.includes(letter)){
          currentPositions.map((index) => {
            positions[index] = "Y";
          });
        }

        currentPositions.map((idx) => {
          // console.log("Index of currentPositions: ", idx)
          if (targetPositions.includes(idx)) {
            positions[idx] = "G";
          }
        });
      }
    });
  }
  return positions;
};

export const getIndexOfChar = (str, char) => {
  let tmpArray = [...str];
  char = char.toLowerCase();

  return tmpArray.reduce(
    (results, elem, idx) =>
      elem.toLowerCase() === char ? [...results, idx] : results,
    []
  );
};

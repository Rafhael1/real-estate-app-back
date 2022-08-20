/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const FuzzySearch = require('fuzzy-search');

const searcher = (
  dataSet: (string | object)[],
  needle: string,
  keys: string[],
) => {
  const fuzzySearcher = new FuzzySearch(dataSet, keys, {
    sort: true,
  });
  return fuzzySearcher.search(needle);
};

export default searcher;

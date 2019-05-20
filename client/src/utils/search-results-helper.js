export function organizeResultsByType(results) {
  return _.reduce(
    results,
    (result, value) => {
      if (!_.isEmpty(value)) {
        const { __typename } = value;
        (result[__typename] || (result[__typename] = [])).push(value);
        return result;
      }
    },
    {},
  );
}

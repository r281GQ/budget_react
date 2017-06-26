const requiredName = value => (!value ? "Name must be provided" : undefined);

const mustBeGreaterThanZero = value =>
  Number.parseInt(value) >= 0 ? undefined : "Must be greater than zero";

export { requiredName, mustBeGreaterThanZero };

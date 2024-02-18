module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require tests/app/features/**/*.ts",
  ].join(" "),
};

// @ts-nocheck
const { CategorySeed } = require('./CategorySeed');
const { SeedBrand } = require('./brandsSeed');
const { IphoneSeed } = require('./iphoneSeed');
const { RepairSeed } = require('./repairSeed');
const { SamsungSeed } = require('./samsungSeed');
const main = async () => {
  // reset
  await RepairSeed.reset();
  await IphoneSeed.reset();
  await SamsungSeed.reset();
  await CategorySeed.reset();
  await SeedBrand.reset();
  // seed brands
  await SeedBrand.seed();
  await CategorySeed.seed();
  await IphoneSeed.seed();
  await SamsungSeed.seed();
  await RepairSeed.seed();
};
main();

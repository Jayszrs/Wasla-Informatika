import * as migration_20261022_043543_initial from './20261022_043543_initial';
import * as migration_20261022_093319_hero_image from './20261022_093319_hero_image';
import * as migration_20261022_102006_feature_image from './20261022_102006_feature_image';

export const migrations = [
  {
    up: migration_20261022_043543_initial.up,
    down: migration_20261022_043543_initial.down,
    name: '20261022_043543_initial',
  },
  {
    up: migration_20261022_093319_hero_image.up,
    down: migration_20261022_093319_hero_image.down,
    name: '20261022_093319_hero_image',
  },
  {
    up: migration_20261022_102006_feature_image.up,
    down: migration_20261022_102006_feature_image.down,
    name: '20261022_102006_feature_image'
  },
];

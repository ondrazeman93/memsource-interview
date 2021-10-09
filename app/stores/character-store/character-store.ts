import { Instance, SnapshotOut, types } from 'mobx-state-tree';
import { CharacterModel, CharacterSnapshot } from '../../models/character/character';
import { withEnvironment } from '../../models/extensions/with-environment';

/**
 * Example store containing Rick and Morty characters
 */
export const CharacterStoreModel = types
    .model('CharacterStore')
    .props({
        characters: types.optional(types.array(CharacterModel), []),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        saveCharacters: (characterSnapshots: CharacterSnapshot[]) => {
            self.characters.replace(characterSnapshots);
        },
    }))
    .actions((self) => ({
        getCharacters: async () => {
            // const characterApi = new CharacterApi(self.environment.api);
            // const result = await characterApi.getCharacters();
            /*
      if (result.kind === 'ok') {
          self.saveCharacters(result.characters);
      } else {
      }
       */
        },
    }));

type CharacterStoreType = Instance<typeof CharacterStoreModel>;

export interface CharacterStore extends CharacterStoreType {}

type CharacterStoreSnapshotType = SnapshotOut<typeof CharacterStoreModel>;

export interface CharacterStoreSnapshot extends CharacterStoreSnapshotType {}

export const createCharacterStoreDefaultModel = () => types.optional(CharacterStoreModel, {});

import getValuesFromEnum from '../../helpers/helpers';

enum Colors {
  'RED',
  'BLACK',
}

const expectedResult = ['RED', 'BLACK'];

describe('helpers.ts', () => {
  test('it should return enum values as array of strings', () => {
    const result = getValuesFromEnum(Colors);

    expect(result).toEqual(expectedResult);
  });
});

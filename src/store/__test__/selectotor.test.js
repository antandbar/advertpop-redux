import { getAdvert, getAdverts } from '../selectors';

describe('getAdverts', () => {
  it('should return adverts', () => {
    const adverts = [{ id: 1 }];
    const state = { adverts: { data: adverts } };
    expect(getAdverts(state)).toEqual(adverts);
  });
});

describe('getAdvert', () => {
  it('should return a advert', () => {
    const advertId = '1';
    const adverts = [{ id: advertId }];
    const state = { adverts: { data: adverts } };
    expect(getAdvert(advertId)(state)).toEqual(adverts[0]);
  });
});
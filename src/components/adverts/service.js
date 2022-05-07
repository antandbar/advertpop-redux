import client from '../../api/client';

const advertsBaseUrl = '/api/v1/adverts';
// el rango menor siempre es min y mayor max
const transformRange = range => {
  let rangeMin, rangeMax;
  if (range) {
    if (range[0] > range[1]) {
      rangeMax = range[0];
      rangeMin = range[1];
    } else if (range[1] > range[0]) {
      rangeMax = range[1];
      rangeMin = range[0];
    } else {
      rangeMax = range[1];
      rangeMin = range[0];
    }
  } else {
    rangeMax = 10000;
    rangeMin = 0;
  }

  return {
    rangeMax,
    rangeMin,
  };
};

export const getAdverts = () => {
  const url = advertsBaseUrl;

  return client.get(url);
};

export const getTags = () => {
  const url = `${advertsBaseUrl}/tags`;
  return client.get(url);
};
export const getAdvert = advertId => {
  const url = `${advertsBaseUrl}/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${advertsBaseUrl}/${advertId}`;
  return client.delete(url);
};

export const createAdvert = advert => {
  const url = advertsBaseUrl;
  return client.post(url, advert);
};

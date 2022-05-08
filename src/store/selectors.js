export const getIsLogged = state => state.auth;

export const getAdverts = state => state.adverts.data;

export const getAdvertsFilter =
  (nameFilter, saleFilter, rangeFilter, multiSelectorFilter) => state => {
    const result = state.adverts.data.filter(
      advert =>
        (nameFilter.length ? advert.name === nameFilter : true) &&
        (saleFilter.length ? advert.sale.toString() === saleFilter : true) &&
        advert.price < Number(rangeFilter.rangeMax) &&
        advert.price > Number(rangeFilter.rangeMin) &&
        (multiSelectorFilter.length
          ? advert.tags.every(item => multiSelectorFilter.includes(item))
          : true),
    );

    return result;
  };

export const getAreAdvertsLoaded = state => state.adverts.loaded;

export const getTags = state => state.tags.data;

export const getAreTagsLoaded = state => state.tags.loaded;

export const getAdvert = advertId => state =>
  state.adverts.data.find(advert => advert.id === advertId);

export const getUi = state => state.ui;

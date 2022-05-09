import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../common/Button';
import Advert from './Advert';
import AdvertsFilter from './AdvertsFilter';
import Page from '../../layout/Page';
import { advertsLoaded } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getAdvertsFilter } from '../../../store/selectors';

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

// En caso de no haber anuncios
const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>Crea tu primer anuncio!</p>
    <Button as={Link} to="/adverts/new" variant="primary">
      Anuncio
    </Button>
  </div>
);


const AdvertsPage = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [isSaleFilter, setIsSaleFilter] = useState('');
  const [rangeFilter, setRangeFilter] = useState('');
  const [isFilter, setIsFilter] = useState(true);
  const [multiSelectorFilter, setMultiSelectorFilter] = useState([]);
  const dispatch = useDispatch();
  const [adverts, setAdverts] = useState([]);
  const advertsFilter = useSelector(getAdvertsFilter(nameFilter,isSaleFilter, transformRange(rangeFilter), multiSelectorFilter));
  const AdvertsSelector = useSelector(getAdverts);
  
  
  useEffect(() => {
    setAdverts(AdvertsSelector);
    dispatch(advertsLoaded());
  }, [dispatch,AdvertsSelector]);


  const changeNameFilter = name => {
    setNameFilter(name);
  };
  const changeIsSaleFilter = isSale => {
    setIsSaleFilter(isSale);
  };
  const changeRangeFilter = range => {
    setRangeFilter(range);
  };
  const changeMultiSelector = multiSelector => {
    setMultiSelectorFilter(multiSelector);
  };
  const sendAllFilters = () => {
    setAdverts(advertsFilter);
    setIsFilter(true);
  };

  return (
    <Page title="Anuncios">
      <div>
        {adverts.length || isFilter ? (
          <Fragment>
            <AdvertsFilter
              changeNameFilter={changeNameFilter}
              sendAllFilters={sendAllFilters}
              changeIsSaleFilter={changeIsSaleFilter}
              changeRangeFilter={changeRangeFilter}
              changeMultiSelector={changeMultiSelector}
            />
            <ul>
              {adverts.map(advert => (
                <li key={advert.id}>
                  <Link to={`/adverts/${advert.id}`}>
                    <Advert {...advert} />
                  </Link>
                </li>
              ))}
            </ul>
          </Fragment>
        ) : (
          <EmptyList />
        )}
      </div>
    </Page>
  );
};

export default AdvertsPage;

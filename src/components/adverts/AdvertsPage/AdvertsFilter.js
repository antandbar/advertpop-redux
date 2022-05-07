import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import InputRadio from '../../common/InputRadio';
import InputSearch from '../../common/InputSearch';
import SliderBar from '../../common/PriceSliderBar';
import TextArea from '../../common/MultiSelector';
import './AdvertsFilter.css';
import { tagsLoaded } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../../../store/selectors';


const useTags = () => {
  const dispatch = useDispatch();
  const tags = useSelector(getTags);

  useEffect(() => {
    dispatch(tagsLoaded());
  }, [dispatch]);

  return tags;
};

// maneja como un wraper los filtros
const AdvertsFilter = ({
  changeNameFilter,
  sendAllFilters,
  changeIsSaleFilter,
  changeRangeFilter,
  changeMultiSelector,
}) => {
  const [range, setRange] = useState([0, 10000]);
  const tags = useTags();


  const handleInputName = e => {
    changeNameFilter(e.target.value);
  };

  const handleMultiSelector = e => {
    let valueMultiSelector = Array.from(
      e.target.selectedOptions,
      option => option.value,
    );
    changeMultiSelector(valueMultiSelector);
  };

  const handleInputBuySell = e => {
    changeIsSaleFilter(e.target.value);
  };
  const sendFilters = e => {
    e.preventDefault();
    sendAllFilters();
  };

  const updateRange = (e, data) => {
    setRange(data);
    changeRangeFilter(data);
  };

  const saleObjet = {
    false: 'compra',
    true: 'venta',
    all: 'todos',
  };

  return (
    <div className="filter">
      <div className="filter-title">
        <h4>Filtros</h4>
      </div>
      <div className="filter-body">
        <InputSearch
          onChange={handleInputName}
          label={'Nombre'}
          className="filter-item"
        ></InputSearch>
        <InputRadio
          onChange={handleInputBuySell}
          label={'Compra/Venta'}
          valueObjet={saleObjet}
          className="filter-item"
        />
        <SliderBar
          label={'Rango de precios'}
          maxSelected={6000}
          minSelected={3000}
          onChange={updateRange}
          value={range}
          className="filter-item"
        />
        <TextArea
          tags={tags}
          handleMultiSelector={handleMultiSelector}
          label={'Tags'}
          className="filter-item"
        />
        <Button
          className="filter-submit"
          variant="primary"
          onClick={sendFilters}
        >
          Filtrar
        </Button>
      </div>
    </div>
  );
};

export default AdvertsFilter;

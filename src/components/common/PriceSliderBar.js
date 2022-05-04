import { Slider } from '@material-ui/core';
import './PriceSlideBar.css';

const PriceSliderBar = ({
  className,
  label,
  maxSelected,
  minSelected,
  ...props
}) => {
  function valuetext(value) {
    return `${value}€`;
  }
  // Se setea la visualización primer y último valor
  const marks = [
    {
      value: 0,
      label: '0€',
    },
    {
      value: 10000,
      label: '10.000€',
    },
  ];
  return (
    <div className={className}>
      <label className="inputSearch-label">
        <span>{label}</span>
        <div className="slider">
          <Slider
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            marks={marks}
            min={0}
            max={10000}
            {...props}
          />
        </div>
      </label>
    </div>
  );
};

export default PriceSliderBar;

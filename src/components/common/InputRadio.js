import './InputRadio.css';
const InputRadio = ({ className, label, valueObjet, ...props }) => {
  return (
    <div className={className}>
      <label className="inputRadio-label">
        <span>{label}</span>
      </label>
      <div className="inputRadio-inputs">
        <div className="inputRadio-div-input">
          <input type="radio" value={true} name="inputRadio" {...props} />
          {valueObjet.true}
        </div>
        <div className="inputRadio-div-input">
          <input type="radio" value={false} name="inputRadio" {...props} />
          {valueObjet.false}
        </div>
        {valueObjet.all && (
          <div className="inputRadio-div-input">
            <input type="radio" value="" name="inputRadio" {...props} />
            {valueObjet.all}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputRadio;

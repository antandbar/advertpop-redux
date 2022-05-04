import './InputNumber.css';

const InputNumber = ({ className, label, ...props }) => {
  return (
    <div className={className}>
      <label className="InputNumber-label">
        <span>{label}</span>
        <div>
          <input type={'number'} className="InputNumber-input " {...props} />
        </div>
      </label>
    </div>
  );
};

export default InputNumber;

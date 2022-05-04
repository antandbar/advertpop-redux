import './InputFile.css';

const InputFile = ({ className, label, ...props }) => {
  return (
    <div className={className}>
      <label className="InputFile-label">
        <span>{label}</span>
        <div>
          <input type={'file'} className="InputFile-input " {...props} />
        </div>
      </label>
    </div>
  );
};

export default InputFile;

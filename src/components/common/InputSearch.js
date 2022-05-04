import './InputSearch.css';

const InputSearch = ({ className, label, ...props }) => {
  return (
    <div className={className}>
      <label className="inputSearch-label">
        <span>{label}</span>
        <div>
          <input className="inputSearch-input" {...props} />
        </div>
      </label>
    </div>
  );
};

export default InputSearch;

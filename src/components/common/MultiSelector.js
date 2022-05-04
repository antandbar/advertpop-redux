import './MultiSelector.css';
const MultiSelector = ({
  className,
  label,
  tags,
  handleMultiSelector,
  ...props
}) => {
  return (
    <div className={className}>
      <label className="multiselector-label">
        <span>{label}</span>
      </label>
      <div>
        <select
          multiple={true}
          onChange={handleMultiSelector}
          className="multiselector-select"
          {...props}
        >
          {/* recibe los datos de manera dinámica */}
          {tags.map(tag => (
            <option key={tag} value={tag} className="multiselector-option">
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MultiSelector;

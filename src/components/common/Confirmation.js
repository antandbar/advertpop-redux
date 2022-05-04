import Button from './Button';
import './Confirmation.css';
import classNames from 'classnames';
// maneja la cofrimación antes de realizar una acción
const Confirmation = ({
  className,
  label,
  handleCancellation,
  handleConfirmation,
  ...props
}) => {
  return (
    <div className={classNames('confirmation', className)}>
      <label className="confirmation-label">
        <span>{label}</span>
      </label>
      <div className="confirmation-div-buttons">
        <Button
          className="confirmation-button"
          variant="delete"
          onClick={handleConfirmation}
        >
          Si
        </Button>
        <Button className="confirmation-button" onClick={handleCancellation}>
          No
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;

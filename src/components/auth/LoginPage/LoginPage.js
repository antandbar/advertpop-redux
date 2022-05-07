import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import FormField from '../../common/FormField';
import './LoginPage.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  authLogin,
  uiResetError,
} from '../../../store/actions';
import { getUi } from '../../../store/selectors';

function LoginPage() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    remember: false,
  });
  
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);


  useEffect(() => {
    ref.current.focus();
  }, []);

  const { email, password, remember } = credentials;

  const handleChange = event => {
    setCredentials(credentials => ({
      ...credentials,
      // si es Chekbox se toma checked, si no es así value
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    }));
  };

  const resetError = () => dispatch(uiResetError());

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(authLogin(credentials)).then(() => {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    });
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to AdvertPop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="email"
          name="email"
          label="email"
          className="loginForm-field"
          value={email}
          onChange={handleChange}
          ref={ref}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={password}
          onChange={handleChange}
        />

        <input
          type="checkbox"
          name="remember"
          checked={remember}
          value="remember"
          onChange={handleChange}
        />
        <label>Recordar contraseña</label>

        <Button
          className="loginForm-submit"
          type="submit"
          variant="primary"
          disabled={!email || !password || isLoading}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;

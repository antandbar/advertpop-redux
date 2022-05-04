import axios from 'axios';

// Se importa cliente de axios con url base
const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
});

// Se utiliza intercerptor para manejar respuesta y errores
client.interceptors.response.use(
  response => response.data,
  error => {
    if (!error.response) {
      return Promise.reject({ message: error.message });
    }
    return Promise.reject({
      message: error.response.statusText,
      ...error.response,
      ...error.response.data,
    });
  },
);

// Se guarda el token en cabecera
export const setAuthorizationHeader = token =>
  (client.defaults.headers.common['Authorization'] = `Bearer ${token}`);

// Se elimina el token de cabecera
export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common['Authorization'];
};

export default client;

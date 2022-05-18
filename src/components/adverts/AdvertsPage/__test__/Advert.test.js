import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Advert from '../Advert';

describe('AdvertPage', () => {
  test('snapshot', () => {
    const state = {
      adverts: {
        loaded: false,
        data: [],
      },
    };
    const store = {
      getState: () => state,
      dispatch: jest.fn(),
      subscribe: () => {},
    };
    const { container } = render(
      <Provider store={store}>
        <Advert />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});

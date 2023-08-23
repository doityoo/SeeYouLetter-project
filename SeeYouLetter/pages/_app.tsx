// pages/_app.tsx

import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { store, persistor } from '../store/configureStore';
import GlobalStyle from './../components/UI/GlobalStyle';
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

const wrapper = createWrapper(() => store);

export default wrapper.withRedux(MyApp);

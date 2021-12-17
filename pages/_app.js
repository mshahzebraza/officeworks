import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { store } from '../store/index'
// import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store} >
      <div id="portalRoot"></div>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/global.scss'
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
<Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <App />
  </PersistGate>
</Provider>,
)

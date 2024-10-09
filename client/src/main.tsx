import { createRoot } from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)

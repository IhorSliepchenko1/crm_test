import { createRoot } from 'react-dom/client'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import App from './App.tsx'
import ProtectedRoute from './components/protected/index.tsx'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ProtectedRoute>
      <App />
    </ProtectedRoute>
  </Provider>
)

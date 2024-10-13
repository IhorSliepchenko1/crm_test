import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
import './index.scss'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider } from './theme/index.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <ThemeProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ThemeProvider>
  </Provider>

)

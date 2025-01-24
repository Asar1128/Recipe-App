import ReactDOM from 'react-dom/client'
import App from './App/App'
import './Styles/index.css'

import { Provider } from 'react-redux'
import { Store } from './Store/Store'
import RouterWrapper from './Components/Routes/Routes'
ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={Store}>
<RouterWrapper>
  <App />
</RouterWrapper>
</Provider>
)

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/Config.js'
import SmoothScroll from './Components/Utils/SmoothScroll.jsx'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <Router>
        {/* <SmoothScroll> */}
          <Routes>
            <Route path='/*' element={<App/>}/>
          </Routes>
        {/* </SmoothScroll> */}
      </Router>
  </Provider>
)

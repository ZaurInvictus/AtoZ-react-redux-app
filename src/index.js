import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk  from 'redux-thunk'
import logger from 'redux-logger'
import { BrowserRouter as Route } from 'react-router-dom'
import { reducer } from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';


const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
)

ReactDOM.render(
 <Provider store={store}>
   <Route>
     <App />
   </Route>
 </Provider>, 
 document.getElementById('root')
);


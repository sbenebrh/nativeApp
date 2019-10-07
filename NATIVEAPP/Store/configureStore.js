// Store/configureStore.js

import { createStore } from 'redux';
import toggleToken from './Reducers/tokenReducer'



export const store =  createStore(toggleToken)
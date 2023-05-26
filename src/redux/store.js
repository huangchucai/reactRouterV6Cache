
import { createStore } from 'redux';
import { create } from 'redux-react-hook';

import reducer from './index';
export const store = createStore(reducer);

export const {StoreContext, useDispatch, useMappedState} = create();

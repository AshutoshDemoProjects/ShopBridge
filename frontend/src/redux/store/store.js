import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { productCreateReducer, productDeleteReducer, productListReducer, productUpdateReducer } from '../reducer/productReducer';
import { userRegisterReducer, userSignInReducer } from './../reducer/userReducer';
const initialState = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
};
const reducer = combineReducers({
    userSignin: userSignInReducer,
    userRegister: userRegisterReducer,
    productList: productListReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
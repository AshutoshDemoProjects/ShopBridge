import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";
import Axios from 'axios';
import{baseUrl} from '../../utilConstants';
//const baseUrl="http://localhost:5000";
export const listProductsAction = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
        const { data } = await Axios.get(`${baseUrl}/api/products`);
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    }
    catch (err) {
        dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message });

    }
};
export const createProductAction = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_CREATE_REQUEST });
    try {
        const { userSignin: { userInfo } } = getState();
        const { data } = await Axios.post(`${baseUrl}/api/products/`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        });
        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data.product });
    }
    catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
export const updateProductAction = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    try {
        const { userSignin: { userInfo }, } = getState();
        const { data } = await Axios.put(`${baseUrl}/api/products/${product._id}`, product, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
};
export const deleteProductAction = (productId) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    try {
        const { userSignin: { userInfo }, } = getState();
        Axios.delete(`${baseUrl}/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } catch (error) {

        dispatch({
            type: PRODUCT_DELETE_FAIL, payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
};
import * as constants from './constants';
import axios from 'axios';
import { flattenArr, ID, parseToYearAndMonth } from '../utility';

export const getInitialData = (currentYearMonth) => {
    return async (dispatch) => {
        const { year, month } = currentYearMonth;
        const getItemURLWithQuery = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
        try {
            const responseArr = await Promise.all([axios.get('/categories'), axios.get(getItemURLWithQuery)])
            console.log('getInitialData, response =', responseArr)
            const [categories, itemsWithFilter] = responseArr;
            dispatch({
                type: constants.GET_INITIAL_DATA,
                data: {
                    items: flattenArr(itemsWithFilter.data),
                    categories: flattenArr(categories.data),
                    isLoading: false
                }
            });
        } catch (err) {
            console.error(err);
        }
    }
}

export const selectNewMonth = (year, month) => {
    return async (dispatch) => {
        const getItemURLWithQuery = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
        try {
            const arrays = await axios.get(getItemURLWithQuery);
            // console.log('selectNewMonth', arrays);
            const [itemsWithFilter] = arrays;
            dispatch({
                type: constants.SELECT_NEW_MONTH,
                data: {
                    items: flattenArr(itemsWithFilter.data),
                    currentYearMonth: { year, month }
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const getCategories = () => {
    return async (dispatch) => {
        try {
            const categories = await axios.get('/categories')
            dispatch({
                type: constants.GET_CATEGORIES,
                data: { 
                    categories: flattenArr(categories.data),
                }
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const setEditItem = (item) => ({
    type: constants.GET_EDIT_DATA,
    data: {
        editItem: item,
    }
})

export const getEditData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/items/${id}`);
            console.log('getEditData, response =', response); 
            dispatch({
                type: constants.GET_EDIT_DATA,
                data: {
                    editItem: response.data,
                }
            });
        } catch(err) {
            console.log(err)
        }
    }
}

export const createItem = (item) => {
    return async (dispatch) => {
        try {
            const newId = ID();
            item['id'] = newId;
            const parseData = parseToYearAndMonth(item.data);
            const monthCategory = `${parseData.year}-${parseData.month}`;
            item['monthCategory'] = monthCategory;
            const date = new Date(item.date);
            item.timestamp = Math.floor(new Date(date).getTime() / 1000);
            const result = await axios.post('/items', item);
            console.log('createItem =', result)
            dispatch({
                type: constants.CREATE_ITEM
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const updateItem = async (item, id) => {
    return async (dispatch) => {
        try {
            const parseDate = parseToYearAndMonth(item.date);
            const monthCategory = `${parseDate.year}-${parseDate.month}`;
            item['monthCategory'] = monthCategory;
            const date = new Date(item.date);
            item.timestamp = Math.floor(new Date(date).getTime() / 1000); // 根据时间排序
            item.id = id;
            console.log('updateItem', item)
            const result = await axios.put(`/items/${id}`, item)
            console.log('updateItem, result =', result)
            dispatch({
                type: constants.UPDATE_ITEM
            })
        } catch(err) {
            console.log(err)
        }
    }
}

export const deleteItem = (item) => {
    return async (dispatch) => {
        try {
            console.log('delete item');
            let response = await axios.delete(`/items/${item.id}`);
            console.log(response);
            dispatch({
                type: constants.DELETE_ITEM,
                data: {
                    id: item.id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}
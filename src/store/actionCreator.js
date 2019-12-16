import * as constants from './constants';
import axios from 'axios';
import { flattenArr, ID, parseToYearAndMonth } from '../utility';

export const getInitialData = (currentYearMonth) => {
    return async (dispatch) => {
        // console.log('getInitialData');
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
            const arrays = await Promise.all([axios.get(getItemURLWithQuery)]);
            console.log('selectNewMonth', arrays);
            const [itemsWithFilter] = arrays;
            dispatch({
                type: constants.SELECT_NEW_MONTH,
                data: {
                    items: flattenArr(itemsWithFilter.data),
                    currentYearMonth: { year, month },
                    isLoading: false
                }
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export const getEditData = (preState, id) => {
    const { categories, items } = preState;
    const promiseArr = [];
    return async (dispatch) => {
        if (Object.keys(categories).length === 0) {
            promiseArr.push(axios.get('/categories'))
        }
        let editItem = null;
        if (id) {
            editItem = items[id]; // items 里面找不到指定id，才去请求
            !editItem && promiseArr.push(axios.get(`/items/${id}`));
        }
        const responseArr = await Promise.all(promiseArr);
        console.log(responseArr);
        const [fetchedCategories, fetchedEditItem] = responseArr;
        if (fetchedCategories) {
            dispatch({
                type: constants.GET_EDIT_DATA,
                data: {
                    categories: flattenArr(fetchedCategories.data),
                    isLoading: false
                }
            });
        }
        if (fetchedEditItem) {
            editItem = fetchedEditItem.data;
        }
        return editItem;
    }
}

export const createItem = async (item) => {
    const newId = ID();
    item['id'] = newId;
    const parseData = parseToYearAndMonth(item.data);
    const monthCategory = `${parseData.year}-${parseData.month}`;
    item['monthCategory'] = monthCategory;
    const date = new Date(item.date);
    item.timestamp = Math.floor(new Date(date).getTime() / 1000);
    const result = await axios.post('/items', item);
    return result;
}

export const updateItem = async (item, id) => {
    const parseDate = parseToYearAndMonth(item.date);
    const monthCategory = `${parseDate.year}-${parseDate.month}`;
    item['monthCategory'] = monthCategory;
    const date = new Date(item.date);
    item.timestamp = Math.floor(new Date(date).getTime() / 1000); // 根据时间排序
    item.id = id;
    console.log('newItem', item)
    const result = await axios.put(`/items/${id}`, item)
    return result;
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
            // if (response && response.status == 200) {
            //     dispatch({
            //         type: constants.DELETE_ITEM,
            //         data: {
            //             id: item.id
            //         }
            //     })
            // }
        } catch (err) {
            console.log(err);
        }
    }
}
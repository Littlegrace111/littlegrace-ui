import { parseToYearAndMonth } from "../utility";
import * as constants from "./constants";

const defaultState = {
    items: {},
	categories: {},
	currentYearMonth: parseToYearAndMonth(),
	isLoading: false,
	tabList: []
};

export default (preState = defaultState, action = {}) => {
    console.log('preState :', preState, 'action :', action);
    switch(action.type) {
        case constants.GET_INITIAL_DATA: {
            return { ...preState, ...action.data };
        }
        case constants.SELECT_NEW_MONTH: {
            return { ...preState, ...action.data };
        }
        case constants.GET_EDIT_DATA: {
            return { ...preState, ...action.data };
        }
        case constants.DELETE_ITEM: {
            delete preState.items[action.data.id];
            const newState = {
                items: { ...preState.items },
                isLoading: false
            }
            return newState;
        }
        default: 
            return preState;
    }
}
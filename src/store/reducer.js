import { parseToYearAndMonth } from "../utility";
import * as constants from "./constants";

const defaultState = {
    items: {},
	categories: {},
	currentYearMonth: parseToYearAndMonth(),
	isLoading: false
};

export default (preState = defaultState, action = {}) => {
    // console.log('preState :', preState, 'action :', action);
    switch(action.type) {
        case constants.GET_INITIAL_DATA: {
            return { ...preState, ...action.data };
        }
        case constants.SELECT_NEW_MONTH: {
            console.log('reducer: select new month, item =', action.data);
            return { ...preState, ...action.data };
        }
        case constants.GET_EDIT_DATA: {
            return { ...preState, ...action.data };
        }
        case constants.DELETE_ITEM: {
            console.log('reducer: delete item, item =', action.data);
            delete preState.items[action.data.id];
            // return { ...preState };
            return { ...preState };
        }
        default: 
            return preState;
    }
}
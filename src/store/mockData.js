const priceList = [
    {
        "id": 1,
        "title": "去云南旅游",
        "price": 200,
        "date": "2018-09-10",
        "cid": "1"
        // "category": { 
        //     "id": "1",
        //     "name": "旅游",
        //     "type": "outcome",
        //     "iconName": "ios-plane"
        // }
    },
    {
        "id": 2,
        "title": "本月理财收入",
        "price": 200,
        "date": "2018-08-10",
        "cid": "2"
    },
    {
        "id": 3,
        "title": "今天的饭钱",
        "price": 100,
        "date": "2018-09-10",
        "cid": "3"
    },
];

const tabList = [
    {
        tabName: 'list',
        tabIcon: 'md-list-box'
    },
    {
        tabName: 'chart',
        tabIcon: 'md-pie'
    }
]

// 每个条目的类型
const categoryList = {
    "1": {
        "name": "旅游",
        "type": "outcome",
        "iconName": "ios-plane"
    },
    "2": {
        "name": "理财",
        "type": "income",
        "iconName": "md-flame"
    },
    "3": {
        "name": "吃饭",
        "type": "outcome",
        "iconName": "md-cafe"
    }
}

const categories = [
    {
        "id": "1",
        "name": "旅行",
        "type": "outcome",
        "iconName": "ios-plane"
    },
    {
        "id": "2",
        "name": "理财",
        "type": "income",
        "iconName": "logo-yen"
    },
    {
        "id": "3",
        "name": "饮料",
        "type": "outcome",
        "iconName": "ios-cafe"
    },
    {
        "id": "4",
        "name": "餐饮",
        "iconName": "ios-restaurant",
        "type": "outcome"
    },
    {
        "id": "5",
        "name": "工资",
        "type": "income",
        "iconName": "ios-card"
    },
    {
        "id": "6",
        "name": "兼职",
        "type": "income",
        "iconName": "ios-cash"
    }
]

export { priceList, tabList, categoryList, categories }
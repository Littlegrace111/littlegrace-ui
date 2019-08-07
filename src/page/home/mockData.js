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
        "date": "2018-09-10",
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
        "cid": "1",
        "name": "旅游",
        "type": "outcome",
        "iconName": "ios-plane"
    },
    "2": {
        "cid": "2",
        "name": "理财",
        "type": "income",
        "iconName": "md-flame"
    },
    "3": {
        "cid": "3",
        "name": "吃饭",
        "type": "outcome",
        "iconName": "md-cafe"
    }
}

export { priceList, tabList, categoryList }
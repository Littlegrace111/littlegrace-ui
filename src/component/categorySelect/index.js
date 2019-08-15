import React from 'react'
// import PropType from 'prop-types'
import Ionicon from 'react-ionicons'

const CategorySelect = ({ categoryList, selectCId, onSelectCategory}) => (
    <div className="row align-items-center my-5">
    {
        categoryList.map(item => {
            const backgroundColor = (item.id === selectCId) ? '#007bff' : 'grey'
            return (
                <div className={`col ${(item.id === selectCId ? 'category-item active' : 'category-item')} `}
                    key={item.id}
                    role="button"
                    style={{ textAlign: 'center' }}
                    onClick={() => { onSelectCategory(item.id) }}>
                    <Ionicon
                        icon={item.iconName}
                        fontSize="50px"
                        className="rounded-circle"
                        color="white"
                        style={{ backgroundColor: backgroundColor, padding: '5px' }}
                    />
                    <div>{item.name}</div>
                </div>
            )
        })
    }
    </div>
)

export default CategorySelect
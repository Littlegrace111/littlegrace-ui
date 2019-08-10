import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'

const CreateBtn = ({ onCreateItem }) => (
    <button type="button" 
        className="btn btn-primary btn-lg btn-block my-4"
        onClick={onCreateItem}>
        <Ionicon 
            icon="md-add-circle"
            fontSize="30px"
            color="#fff"
        />
        创建一条记录
    </button>
)

CreateBtn.propTypes = {
    onCreateItem: PropTypes.func
}
export default CreateBtn;
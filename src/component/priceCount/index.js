import React from 'react'
import PropTypes from 'prop-types'

const PriceCount = ({inCome, outCome}) => (
    <div>
        <h5>{`收入： ${inCome}`}</h5>
        <h5>{`支出： ${outCome}`}</h5>
    </div>
)

PriceCount.propTypes = {
    inCome: PropTypes.number.isRequired,
    outCome: PropTypes.number.isRequired
}

export default PriceCount;
import React from 'react';
import PropTypes from 'prop-types';
import Qualities from './qualities';

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <Qualities key={item._id} {...item} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;

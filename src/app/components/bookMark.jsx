import React from 'react';
import PropTypes from 'prop-types';

const BookMark = ({ selected, ...rest }) => {
    return (
        <button {...rest}>
            <i
                className={
                    'bi bi-' + (selected ? 'emoji-heart-eyes' : 'bookmark')
                }
            ></i>
        </button>
    );
};
BookMark.propTypes = {
    selected: PropTypes.bool
};
export default BookMark;

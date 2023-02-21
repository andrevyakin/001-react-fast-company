import React from 'react';
import PropTypes from 'prop-types';
import { rowColor } from '../utils/rowColor';
import { convertToArray } from '../utils/convertToArray';

const GroupList = ({ items, valueProperty, contentProperty, onItemSelect }) => {
    return (
        <>
            <h2 className={'d-flex justify-content-center mb-lg-2'}>
                <span className={'badge bg-primary'}>Профессия</span>
            </h2>
            <div className="list-group">
                {convertToArray(items).map((item, index) => (
                    <a
                        href="#"
                        key={item[valueProperty]}
                        className={
                            'list-group-item list-group-item-action list-group-item-' +
                            rowColor(index)
                        }
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {item[contentProperty]}
                    </a>
                ))}
            </div>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;

import React from 'react';
import PropTypes from 'prop-types';
import BookMark from './bookMark';
import QualitiesList from './qualitiesList';
import Table from './table';

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookMark,
    onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя'
        },
        qualities: {
            name: 'Качества',
            component: (user) => <QualitiesList qualities={user.qualities} />
        },
        profession: {
            path: 'profession.name',
            name: 'Профессия'
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Количество встреч'
        },
        rate: {
            path: 'rate',
            name: 'Оценка'
        },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <BookMark
                    selected={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        },
        delete: {
            name: 'Нет подходит',
            component: (user) => (
                <button
                    onClick={() => onDelete(user._id)}
                    className='btn btn-danger'
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersTable;

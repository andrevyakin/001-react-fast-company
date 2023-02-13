import React, { useState } from 'react';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import { rowColor } from '../utils/rowColor';
import PropTypes from 'prop-types';

const Users = ({ users, ...rest }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return !count
        ? (<></>)
        : (
            <>
                <table className="table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Количество встреч</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">Не подходит</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {userCrop.map((user, index) => (
                            <tr
                                key={user._id}
                                className={'table-' + rowColor(index)}
                            >
                                <User {...user} {...rest} />
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
                    itemCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </>
        );
};
Users.propTypes = {
    users: PropTypes.array
};
export default Users;

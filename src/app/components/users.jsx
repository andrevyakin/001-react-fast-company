import React, { useState, useEffect } from 'react';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import { rowColor } from '../utils/rowColor';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from './gpoupList';
import SearchStatus from './searchStatus';

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 2;
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };
    const filteredUsers = selectedProf
        ? allUsers.filter(
              user => JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          )
        : allUsers;
    const count = filteredUsers.length;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    // Если перейти на последнюю страницу и удалить на ней все элементы,
    // то будет отображаться таблица без элементов.
    // Эта функция переключает отображенние на последнбюю страницу с элементами,
    // после удаления всех элементов последней страницы
    useEffect(() => {
        if (Math.ceil(count / pageSize) < currentPage) {
            setCurrentPage(currentPage - 1);
        }
    }, [currentPage, count]);
    const userCrop = paginate(filteredUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return !count
        ? <SearchStatus length={count} />
        : (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="flex-fill">
                <SearchStatus length={count} />
                <table className="table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Количество встреч</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th scope="col">Нет подходит</th>
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array
};
export default Users;

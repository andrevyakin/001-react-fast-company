import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from './gpoupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    // Если задать path: 'name', как в видеоуроке, то получится автоматическая сортировка
    // по имени, до выбора юзера. По-моему это не правильно,
    // вдруг юзер захочет встретиться с тем, чьи данные прийду первыми.
    // Поэтому path: 'undefined'
    const [sortBy, setSortBy] = useState({ path: 'undefined', order: 'asc' });
    const pageSize = 8;
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newArray);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionsSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    // Если обернуть в иф код, как в видеоуроке, захватывая ретурн,
    // не будет работать юзеэффект, который ниже (в видеоуроке его нет, там этот момент "заметен под ковер"),
    // так как хук юзеэффект, как я понял, не работает в ифах, внутри других фунуций и после ретурна,
    // поэтому я обернул в иф только часть кода, где users === undefined вызывает ошибку
    // и вынес filteredUsers за пределы видимости ифа, поскольку эта переменная понадобится после ифа
    let filteredUsers = [];
    if (users) {
        filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;
    }
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
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
    return !users
        ? <h1>Loading...</h1>
        : !count
            ? <SearchStatus length={count} />
            : (
        <div className='d-flex'>
             {/* Убрал проверки на professions и count, которые есть в видеоуроке,
              по-моему в такой редакции кода они излишни,
              так как выше есть проверка на count и на users, а если
              получен users то и professions получен тоже */}
                <div className='d-flex flex-column flex-shrink-0 p-3'>
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionsSelect}
                    />
                    <button
                        className='btn btn-secondary mt-2'
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            <div className='flex-fill'>
                <SearchStatus length={count} />
                    <UsersTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
                    />
                <div className='d-flex justify-content-center'>
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

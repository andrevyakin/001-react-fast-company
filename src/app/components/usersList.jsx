import React, { useState, useEffect } from 'react';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import api from '../api';
import GroupList from './gpoupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import _ from 'lodash';

const UsersList = () => {
    // Для присвоения начального состояния из sessionStorage, чтобы при навигации правильно отображалось
    const setUseState = (item) => {
        const persistedValue = window.sessionStorage.getItem(item);
        return persistedValue !== null
            ? JSON.parse(persistedValue)
            : 0;
    };
    const [currentPage, setCurrentPage] = useState(setUseState('currentPage'));
    const [professions, setProfessions] = useState(setUseState('professions'));
    const [selectedProf, setSelectedProf] = useState(setUseState('selectedProf'));
    const [users, setUsers] = useState(setUseState('users'));
    // Если задать path: 'name', как в видеоуроке, то получится автоматическая сортировка
    // по имени, до выбора юзера. По-моему это не правильно,
    // вдруг юзер захочет встретиться с тем, чьи данные прийду первыми.
    // Поэтому path: 'undefined'
    const [sortBy, setSortBy] = useState({ path: 'undefined', order: 'asc' });
    const [searchBar, setSearchBar] = useState('');
    const pageSize = 8;
    // Сохраняю измененное состояние в sessionStorage
    useEffect(() => {
        window.sessionStorage.setItem('currentPage', JSON.stringify(currentPage));
        window.sessionStorage.setItem('professions', JSON.stringify(professions));
        window.sessionStorage.setItem('selectedProf', JSON.stringify(selectedProf));
        window.sessionStorage.setItem('users', JSON.stringify(users));
    }, [currentPage, professions, selectedProf, users]);
    useEffect(() => {
        if (!users) {
            api.users.fetchAll().then((data) => setUsers(data));
        }
        if (!professions) {
            api.professions.fetchAll().then((data) => setProfessions(data));
        }
    }, []);
    // Для корректной работы обновления страницы (нажатие клавиши F5)
    useEffect(() => {
        window.addEventListener('beforeunload', clearSessionStorage);
        return () => {
            window.removeEventListener('beforeunload', clearSessionStorage);
        };
    }, []);
    const clearSessionStorage = () => {
        sessionStorage.clear();
    };
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
    const handleProfessionsSelect = (item) => {
         if (searchBar !== '') {
            setSearchBar('');
        }
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchBar = ({ target }) => {
        setSelectedProf(0);
        setSearchBar(target.value);
    };
    if (users) {
        const filteredUsers = searchBar
            ? users.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .indexOf(searchBar.toLowerCase()) !== -1
            )
            : selectedProf
                ? users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        const usersCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setCurrentPage(1);
            setSelectedProf(0);
        };
        return !count && searchBar === ''
                ? <SearchStatus length={count}/>
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
                            <SearchStatus length={count}/>
                            <div className='d-flex flex-column flex-shrink-0 mb-2'>
                                <input
                                    type='text'
                                    name='searchBar'
                                    placeholder='Найти...'
                                    onChange={handleSearchBar}
                                    value={searchBar}
                                />
                            </div>
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
    }
    return <h1>Loading...</h1>;
};
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;

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
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    // Если обернуть в иф код, как в видеоуроке, захватывая ретурн,
    // не будет работать юзеэффект, который ниже (в видеоуроке его нет, там этот момент 'заметен под ковер'),
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
        setCurrentPage(1);
        setSelectedProf(0);
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
UsersList.propTypes = {
    users: PropTypes.array
};

export default UsersList;

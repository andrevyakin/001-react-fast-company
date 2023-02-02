import React, {useState} from 'react';
import api from '../api';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = userId => setUsers(users.filter(user => user._id !== userId));

    const renderPhrase = number => {
        //Проверка расчитана на любые числа, на случай ели их будет больше 12
        if (number === 1) return 'человек тусанёт';
        //Если больше одного правильно говорить, вроде, "тусанут". Т.е. для 2-12 - тусанУт (в видеуроке - тусанЕт)
        if (number % 10 > 1 && number % 10 < 5 && (number < 5 || number > 14)) return 'человека тусанут';
        return 'человек тусанут';
    };

    const rowsColor = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light'];

    const rowColor = index => rowsColor.length > index ? rowsColor[index] : rowsColor[index - rowsColor.length];

    //Почему вызывается два раза?
    //console.log(api.users.fetchAll());

    return (
        <>
            <h1 className={'d-flex justify-content-center mt-1 mb-lg-3'}>
                <span className={'badge ' + (users.length > 0 ? 'bg-primary' : 'bg-danger')}>
                    {users.length
                        ? `${users.length + ' ' + renderPhrase(users.length)} с тобой сегодня`
                        : 'Никто с тобой не тусанет'}
                </span>
            </h1>
            {users.length && (
                <table className='table'>
                    <thead>
                    <tr className='table-dark'>
                        <th scope='col'>Имя</th>
                        <th scope='col'>Качества</th>
                        <th scope='col'>Профессия</th>
                        <th scope='col'>Количество встреч</th>
                        <th scope='col'>Оценка</th>
                        <th scope='col'>Не подходит</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}
                            className={'table-' + rowColor(index)}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map(item => (
                                    <span className={'badge m-1 bg-' + item.color} key={item._id}>
                                        {item.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate} /5</td>
                            <td>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className='btn btn-danger'
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default Users;
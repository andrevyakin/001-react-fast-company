import React, { useState, useEffect } from 'react';
import Users from './components/users';
import api from './api';

function App() {
    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    const handleDelete = (userId) =>
        setUsers(users.filter((user) => user._id !== userId));
    return (
        <div>
            {users && (
                <Users
                    onDelete={handleDelete}
                    onBookMark={handleBookMark}
                    users={users}
                />
            )}
        </div>
    );
}

export default App;

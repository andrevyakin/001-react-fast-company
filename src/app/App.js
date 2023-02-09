import React, {useState} from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api'

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleBookMark = id =>{
        setUsers(
            users.map(user => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    }
    const handleDelete = userId => setUsers(users.filter(user => user._id !== userId));
    return (
        <>
            <SearchStatus length={users.length}/>
            <Users users={users} onBookMark={handleBookMark} onDelete={handleDelete}/>
        </>
    )
}

export default App;
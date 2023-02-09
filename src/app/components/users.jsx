import User from './user';

const Users = ({users, ...rest}) => {

    const rowsColor = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light'];
    const rowColor = index => rowsColor.length > index ? rowsColor[index] : rowsColor[index - rowsColor.length];

    return (
        <>
            {users.length && (
                <table className='table'>
                    <thead>
                    <tr className='table-dark'>
                        <th scope='col'>Имя</th>
                        <th scope='col'>Качества</th>
                        <th scope='col'>Профессия</th>
                        <th scope='col'>Количество встреч</th>
                        <th scope='col'>Оценка</th>
                        <th scope='col'>Избранное</th>
                        <th scope='col'>Не подходит</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className={'table-' + rowColor(index)}>
                            <User {...user} {...rest}/>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default Users;
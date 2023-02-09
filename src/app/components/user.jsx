import Qualities from './qualities';
import BookMark from './bookMark';

const User = ({_id, name, qualities, profession, completedMeetings, rate, onDelete, bookmark, onBookMark}) => {
    return (
        <>
            <td>{name}</td>
            <td>
                {qualities.map(item => (
                    <Qualities key={item._id} {...item} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
                <BookMark
                    selected={bookmark}
                    onClick={() => onBookMark(_id)}
                />
            </td>
            <td>
                <button
                    onClick={() => onDelete(_id)}
                    className='btn btn-danger'>
                    delete
                </button>
            </td>
        </>
    );
}

export default User;
const BookMark = ({selected, ...rest}) => {
    return (
        <button {...rest}>
            <i className={'bi bi-' + (selected ? 'emoji-heart-eyes' : 'bookmark')}></i>
        </button>
    );
};

export default BookMark;


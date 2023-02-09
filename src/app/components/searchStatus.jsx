const SearchStatus = ({length}) => {
    const renderPhrase = number => {
        if (number === 1) return 'человек тусанёт';
        if (number % 10 > 1 && number % 10 < 5 && (number < 5 || number > 14)) return 'человека тусанут';
        return 'человек тусанут';
    };
    return (
        <h1 className={'d-flex justify-content-center mt-1 mb-lg-3'}>
                <span className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>
                    {length
                        ? `${length + ' ' + renderPhrase(length)} с тобой сегодня`
                        : 'Никто с тобой не тусанет'}
                </span>
        </h1>
    )
}
export default SearchStatus;
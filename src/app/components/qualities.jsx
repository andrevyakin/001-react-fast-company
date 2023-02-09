const Qualities = ({ color, name }) => {
    return (
        <span className={'badge m-1 bg-' + color}>
            {name}
        </span>
    );
};

export default Qualities;
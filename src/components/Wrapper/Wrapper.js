import './Wrapper.scss';

const Wrapper = ({ children }) => {
    return (
        <div className="wrapper-container">
            {children}
        </div>
    );
};

export default Wrapper;
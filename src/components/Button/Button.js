import './Button.scss';

function Button(props) {

    return (
        <button className={`button ${props.className}`} type={props.type}
                onClick={props.onClick}
                >{props.text}
        </button>
    );
}

export default Button;
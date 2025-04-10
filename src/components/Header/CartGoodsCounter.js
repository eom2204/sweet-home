import './CartGoodsCounter.scss';


function CartGoodsCounter ({goodsCounter, onChange}) {
    const removeGood = () => onChange(goodsCounter - 1);
    const addGood = () => onChange(goodsCounter + 1);

    return (
        <div className="goods-counter">
            <div className="goods-counter_container">
                <button onClick={removeGood} className="goods-counter_btn" disabled={goodsCounter <= 1}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
                <p className="goods-counter_number">{goodsCounter}</p>
                <button onClick={addGood} className="goods-counter_btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                        <path d="M5 12H19" stroke="#222133" strokeWidth="2" strokeLinecap="round"
                              strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default CartGoodsCounter;
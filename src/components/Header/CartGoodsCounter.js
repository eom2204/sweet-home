import './CartGoodsCounter.scss';
import {useState} from "react";


function CartGoodsCounter ({goodsCounter, onChange}) {
    const removeGood = () => onChange(goodsCounter - 1);
    const addGood = () => onChange(goodsCounter + 1);

    return (
        <div className="goods-counter">
            <button onClick={removeGood} className="goods-counter_btn" disabled={goodsCounter <= 1}>
               -
            </button>
            <p className="goods-counter_number">{goodsCounter}</p>
            <button onClick={addGood} className="goods-counter_btn">
                +
            </button>
        </div>
    )
}

export default CartGoodsCounter;
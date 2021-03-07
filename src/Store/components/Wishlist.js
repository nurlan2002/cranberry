import React from 'react';
import '../css/Wishlist.css';
import { useStateValue } from '../../StateProvider';
import WishlistItem from './WishlistItem';

function Wishlist() {
    const [{wishlist}, dispatch] = useStateValue();

    return (
        <div className="wishlist" style={{paddingLeft: "3rem"}}>
            {wishlist.map((item, index) => (
                <WishlistItem
                    key={index}
                    id={item.id}
                    title={item.title}
                    photo={item.photo}
                    price={item.price}
                    type={item.type}
                    sizes={item.sizes}
                />
            ))}
        </div>
    )
}

export default Wishlist

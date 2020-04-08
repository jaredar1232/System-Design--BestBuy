import React from 'react';
import MenuBoxHeader from './MenuBoxHeader.jsx';
import MenuBoxItem from './MenuBoxItem.jsx';


const MenuBox = props => {
    return (
        < li className="items-with-heading" >
            {props.header ? <MenuBoxHeader title={props.header} /> : null}

            < ul >
                {props.items.map(item => <MenuBoxItem title={item} key={item} />)}
            </ul >
        </li >
    )
}


export default MenuBox;


import React from 'react';
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group' 

import './SideDrawer.css';

const sideDrawer = props => {
    const content = (
        // timeout is the duration of the animation
        // classNames is a special prop accepted by the component
        <CSSTransition 
            in={props.show} 
            timeout={200} 
            classNames="slide-in-left" 
            mountOnEnter 
            unmountOnExit
        >
            <aside className="side-drawer" onClick={props.onClick}>
                {props.children}
            </aside>
        </CSSTransition>
    )

    // the createPortal method takes two arguments. The first is the React component and the second is 
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}

export default sideDrawer;


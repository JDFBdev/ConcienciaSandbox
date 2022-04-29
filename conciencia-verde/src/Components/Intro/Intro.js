import React, { useState, useEffect } from "react";
import s from './Intro.module.css';
import logo from '../../img/logo.png';
import { CSSTransition } from 'react-transition-group';

export default function Intro({show}){
    const [on, setOn] = useState(true);
  
    useEffect(() => {
      setTimeout(() => setOn(false), 3000);
    }, []);

    return(
    <>
        {
        show && 
        <div className={s.container} style={{display: show ? "flex" : 'none'}}>
            <CSSTransition
            in={on}
            timeout={500}
            appear={true}
            unmountOnExit
            key={0}
            classNames={{ appear: s.MyClassEnterActive, enterDone: s.MyClassEnterDone, exit: s.exit , exitActive: s.done}}
            >
                <img src={logo} alt='logo' className={s.logo}/>
            </CSSTransition>
        </div>
        }
    </>

    )
}
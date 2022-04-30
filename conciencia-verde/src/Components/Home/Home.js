import React, { useState } from 'react';
import s from './Home.module.css';
import logo from '../../img/logo.png';
import circle from '../../img/circle.png';
import CountUp from 'react-countup';
import { useModal } from 'react-hooks-use-modal';
import Transition from '../Transition/Transition';
import { BsXSquareFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import {useNavigate} from 'react-router-dom';
import toast from "react-hot-toast";

export default function Home({show}){
    const [stats] = useState({bolsasTotales: 23, kgTotales: 212});
    const [fachas, setFachas] = useState([{username: 'Maga', kg: 36}, {username: 'Santi', kg: 30}, {username: 'Juan', kg: 39}, {username: 'Fran', kg: 42}]);
    const [selected, setSelected] = useState({username: '', kg: 0});
    const [newFacha, setNewFacha] = useState('');
    const Navigate = useNavigate();

    const [ModalFacha, openFacha, closeFacha] = useModal('root', {preventScroll: true,closeOnOverlayClick: true});
    const [ModalNew, openNew, closeNew] = useModal('root', {preventScroll: true, closeOnOverlayClick: true});
    const [ModalAbout, openAbout] = useModal('root', {preventScroll: true, closeOnOverlayClick: true});

    const handleDate = function(){
        let today = new Date();
        return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    }

    const handleSubmit = function(e){
        e.preventDefault();
        toast.success(`${newFacha} Successfully Added.`)
        setFachas(prev=>([...prev, {username: newFacha, kg: 0}]))

        closeNew();
        setNewFacha('');
    }

    return(
        <>
            {
            !show &&      
            <div className={s.container}>

                <div className={s.banner}>
                    <div className={s.circle1}/>
                    <div className={s.circle2}/>
                    <div className={s.header}>
                        <img src={logo} alt='Logo' className={s.logo}/>
                        <div className={s.appTitleContainer}>
                            <h3 className={s.appTitle}>Conciencia<br/>Verde</h3>
                        </div>
                    </div>
                </div>

                <div className={s.dataContainer}>

                    <Transition timeout={show ? 3100 : 0}>
                        <div className={s.stats}>
                            <h3 className={s.statsTitle}>Statsistics</h3>
                            <div className={s.statsData}>
                                <div className={s.bags}>
                                    <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                        <CountUp duration={3} useEasing={true} className={s.counter} start={0} end={stats?.bolsasTotales} delay={show ? 3 : 0} />
                                    </div>
                                    <p className={s.statsLabel}>Bags of trash disposed</p>
                                </div>
                                <div className={s.kg}>
                                    <div className={s.circleBags} style={{backgroundImage: `url(${circle})`}}>
                                        <CountUp duration={3} useEasing={true} className={s.counter} start={0} end={stats?.kgTotales} delay={show ? 3 : 0} />
                                    </div>
                                    <p className={s.statsLabel}>Kg of trash taken out of the sea</p>
                                </div>
                            </div>
                        </div>
                    </Transition>

                    <Transition timeout={show ? 3200 : 0}>
                        <div className={s.fachasContainer}>
                            <h3 className={s.fachasTitle}>Members</h3>
                            <div className={s.fachas}>
                                {
                                    fachas?.map((f,i) => {
                                        return (
                                            <div className={s.facha} onClick={()=>{setSelected(f); openFacha();}} key={f.username}>
                                                <p className={s.fachaName}>{f.username}</p>
                                                <p className={s.fachaKg}>{f.kg} Kg</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <button className={s.newFacha} onClick={openNew} >New Member</button>
                        </div>
                    </Transition>

                    <Transition timeout={show ? 3300 : 0}>
                        <div className={s.diaContainer}>
                            <h3 className={s.diaTitle}>New Day</h3>
                            <p className={s.date}>{handleDate()}</p>
                            <button className={s.newDia} onClick={()=>Navigate("/NewDay")}>Create</button>
                        </div>
                    </Transition>

                    <Transition timeout={show ? 3400 : 0}>
                        <div className={s.aboutContainer}>
                            <h3 className={s.diaTitle}>About</h3>
                            <div className={s.aboutBtn} onClick={openAbout}>
                                <p className={s.aboutBtnText}>Learn More!</p>
                                <BsFillArrowRightCircleFill className={s.aboutBtnArrow} color='white' size='2rem' style={{marginBottom: '1.2rem', cursor: 'pointer'}} onClick={openAbout}/>
                            </div>
                        </div>
                    </Transition>

                </div>

                <ModalFacha>
                    <Transition>
                        <div className={s.modalContainer}>
                            <div className={s.buttonContainer}>
                                <BsXSquareFill className={s.closeModal} onClick={closeFacha}/>
                            </div>

                            <div className={s.fachaInfo}>
                                <div className={s.circleName}>
                                        {selected.username.charAt(0).toUpperCase()}
                                </div>
                                <div className={s.fachaTitleContainer}>
                                    <p className={s.fachaTitle}>{selected.username}</p>
                                </div>
                            </div>
                            <p className={s.fachaTotal}>Total: {selected.kg} Kg</p>
                            <button className={s.editBtn}>Edit Photo</button>
                        </div>
                    </Transition>
                </ModalFacha>

                <ModalNew>
                    <Transition>
                        <div className={s.modalContainer}>
                            <div className={s.newFachaData}>
                                <h3 className={s.newFachaTitle}>New Member</h3>
                                <form className={s.form} onSubmit={handleSubmit}>
                                    <input className={s.newFachaInput} placeholder='Nombre...' onChange={(e)=>setNewFacha(e.target.value)} />
                                    {
                                        newFacha !== '' ?
                                        <button className={s.newFachaBtn} type='submit' >Add</button> : 
                                        <button className={s.newFachaBtnError} type='button' onClick={()=>{}}>Add</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </Transition>
                </ModalNew>

                <ModalAbout>
                    <Transition>
                        <div className={s.modalContainer}>
                        <h3 className={s.diaTitleModal}>About</h3>
                            <p className={s.aboutText}>
                                Hello there! This is a showcase of our data tracking app for our volunteer shore cleanup group.
                                Conciencia Verde started as a group of friends with a simple mission: To keep the coast of Vicente López, Buenos Aires
                                as clean as possible. We meet every saturday and pick up all the waste we can find. <br/>

                                This is just the front-end of our new application developed by Juan Diego Fernández and Santiago Set to help us keep track
                                of our personal and overall progress. Thank you for passing by to check out our project!
                            </p>
                            <p className={s.conciencia} onClick={() => { window.open('https://www.instagram.com/concienciaverdevl/','_blank')}} >@concienciaverdevl</p>
                        </div>
                    </Transition>
                </ModalAbout>

            </div>
            }
        </>
    )
}
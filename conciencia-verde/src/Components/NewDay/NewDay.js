import React, {useState} from 'react';
import s from './NewDay.module.css';
import { BsXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import Transition from '../Transition/Transition';
import { useModal } from 'react-hooks-use-modal';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

export default function NewDay(){
    const [fachas, setFachas] = useState({all: [{username: 'Maga', kg: 36}, {username: 'Santi', kg: 30}, {username: 'Juan', kg: 39}, {username: 'Fran', kg: 42}], hoy: []});
    const [bolsas, setBolsas] = useState([])
    const [newBolsa, setNewBolsa] = useState('');
    const [selected, setSelected] = useState({})

    const [Modal, open, close] = useModal('root', {preventScroll: true, closeOnOverlayClick: true});

    const Navigate = useNavigate();

    const addFacha = function(i){
        setFachas((prev)=>({
            hoy: [...prev.hoy, prev.all[i]],
            all: prev.all.filter((f,index)=>{
                return index !== i;
            })
        }))
    }

    const removeFacha = function(i){
        setFachas((prev)=>({
            all: [...prev.all, prev.hoy[i]],
            hoy: prev.hoy.filter((f,index)=>{
                return index !== i;
            })
        }))
    }

    const handleBolsa = function(e){
        setNewBolsa(e.target.value);
    }

    const handleBolsaSubmit = function(e){
        e.preventDefault();
        if (newBolsa){
            setBolsas(prev=>([...prev, Number(newBolsa)]))
            setNewBolsa('');
        }
    }

    const deleteBolsa = function(){
        setBolsas((prev)=>
            prev.filter((b,index)=>{
                return index !== selected.id-1;
            })
        )
        close();
    }

    const handleDate = function(){
        let today = new Date();
        return today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    }

    const handleKg = function(){
        let total = 0;
        for(let i = 0;  i < bolsas?.length; i++){
            total = Number(total) + Number(bolsas[i]);
        }
        return total;
    }

    const handleSubmit = function(e){
        e.preventDefault();

        toast.success(`Día registrado correctamente.`)

        Navigate("/")
    }

    return(
        <div className={s.container}>

            <div className={s.banner}>
                <div className={s.circle1}/>
                <div className={s.circle2}/>
                <div className={s.header}>
                    <div className={s.appTitleContainer}>
                        <h3 className={s.appTitle}>Nuevo Día</h3>
                    </div>
                </div>
            </div>

            <div className={s.dataContainer}>

                <Transition>
                    <div className={s.fachasContainer}>
                        <h3 className={s.fachasTitle}>Miembros</h3>
                        <div className={s.fachas}>
                            {
                                fachas.all?.map((f,i) => {
                                    return (
                                        <Transition key={f.username}>
                                            <div className={s.facha} >
                                                <p className={s.fachaName}>{f.username}</p>
                                                <BsPlusSquareFill className={s.addFacha} onClick={()=>addFacha(i)}/>
                                            </div>
                                        </Transition>
                                    )
                                })
                            }
                            <div className={s.line} />
                            <h3 className={s.fachasTitle}>Miembros Hoy</h3>
                            {
                                fachas.hoy?.map((f,i) => {
                                    return (
                                        <Transition key={f.username}>
                                            <div className={s.facha} >
                                                <p className={s.fachaName}>{f.username}</p>
                                                <BsXSquareFill className={s.removeFacha} onClick={()=>removeFacha(i)}/>
                                            </div>
                                        </Transition>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Transition>

                <Transition timeout={100}>
                    <div className={s.bolsasContainer}>
                        <h3 className={s.bolsasTitle}>Bolsas</h3>
                        <div className={s.bolsas}>
                            {
                                bolsas?.map((f,i) => {
                                    return (
                                        <Transition key={f}>
                                            <div className={s.bolsa} onClick={()=>{ setSelected({id: i+1 , kg: f}); open();}}  >
                                                <p className={s.bolsaName}>Bolsa {i+1}</p>
                                                <p className={s.bolsaName}>{f} Kg</p>
                                            </div>
                                        </Transition>
                                    )
                                })
                            }
                            <div className={s.bolsaForm}>
                                <form className={s.form} onSubmit={handleBolsaSubmit}>
                                    <div className={s.newBolsaDiv}>
                                        <p className={s.bolsaName}>Bolsa {bolsas?.length+1}</p>
                                        <input className={s.bolsaInput} onChange={handleBolsa} value={newBolsa} type='number'/>
                                    </div>
                                    <button className={s.bolsaBtn}>Agregar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Transition>

                <Transition timeout={200}>
                    <div className={s.resumenContainer}>
                        <h3 className={s.resumenTitle}>Resumen</h3>
                        <p className={s.data}>{handleDate()}</p>
                        <p className={s.data}>{fachas.hoy.length} Miembros</p>
                        <p className={s.data}>{bolsas?.length} Bolsas</p>
                        <p className={s.data}>Total: {handleKg()} Kg</p>
                        {
                            (fachas.hoy.length && bolsas.length) ? 
                            <button className={s.confirmBtn} onClick={handleSubmit}>Confirmar</button> : 
                            <button className={s.confirmBtnError} >Confirmar</button>
                        }
                    </div>
                </Transition>

            </div>

            <Modal>
                <Transition>
                    <div className={s.modalContainer}>
                        <h3 className={s.deleteBolsaTitle}>Bolsa {selected.id}</h3>
                        <p className={s.data}>{selected.kg} Kg</p>
                        <button className={s.deleteBolsaBtn} onClick={deleteBolsa} >Eliminar</button>
                    </div>
                </Transition>
            </Modal>

        </div>
    )
}
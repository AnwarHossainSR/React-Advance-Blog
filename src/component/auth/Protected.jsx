import React,{useEffect} from 'react';
import { useHistory } from 'react-router-dom'

function Protected(props) {
    let Cmp = props.Cmp;
    const histry = useHistory();
    useEffect(()=>{
        if (!localStorage.getItem('token')) {
            histry.push('/auth/login')
        }
    },[]);
    
    return (
        <div>
            <Cmp user={props.user}/>
        </div>
    )
}

export default Protected;
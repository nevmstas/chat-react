import React, {useState} from 'react'
import { useFormik } from 'formik';
import EnterSchema from '../Validation/EnterScheme'
import axios from 'axios'

function EnterForm({ onLogin }) {
    const [isLoading, setIsLoading] = useState(false)

    const onEnter = async(roomId, userName) =>{
        const obj = {
            roomId,
            userName
        }
        setIsLoading(true)
        await axios.post('/rooms', obj)
        onLogin(obj)
        
    }

    const formik = useFormik({
        initialValues: {
           roomId: '',
           userName:''
        },
        validationSchema: EnterSchema,
        onSubmit: (values, {resetForm}) => {
            onEnter(values.roomId, values.userName)
            resetForm()
        },
      });

    return (
        <div className="join-block">
            <form onSubmit={formik.handleSubmit}>       
                <input
                    id="roomId"
                    name="roomId"
                    type="text"
                    style={formik.errors.roomId && {border:"2px solid red"}}
                    placeholder="Room ID"
                    onChange={formik.handleChange}
                    value={formik.values.roomId}
                />
                <input
                    id="userName"
                    name="userName"
                    type="text"
                    style={formik.errors.userName && {border:"2px solid red"}}
                    placeholder="Username"
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                /> 
                <button 
                    className="btn btn-primary" 
                    type="submit"
                    disabled={isLoading&&true}
                    >{isLoading?'...':'Enter'}</button>
        </form>
       </div>
       
    )
}

export default EnterForm

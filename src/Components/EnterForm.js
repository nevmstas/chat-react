import React from 'react'
import { useFormik } from 'formik';
import EnterSchema from '../Validation/EnterScheme'

function EnterForm() {
    const formik = useFormik({
        initialValues: {
           roomId: '',
           userName:''
        },
        validationSchema: EnterSchema,
        onSubmit: (values, {resetForm}) => {
            alert(JSON.stringify(values, null, 2))
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
                <button className="btn btn-primary" type="submit">Enter</button>
        </form>
       </div>
       
    )
}

export default EnterForm

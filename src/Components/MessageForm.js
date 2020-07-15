import React from 'react'
import { useFormik } from 'formik';

function MessageForm({onSendMessage}) {
    const formik = useFormik({
        initialValues: {
           message: ''
        },
        onSubmit: (values, {resetForm}) => {
            resetForm()
            onSendMessage(values.message)
        },
      });
    
    return (
        <form onSubmit={formik.handleSubmit}>
            <textarea 
                className="form-control"
                rows={3}
                id="message"
                name="message"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.message}
            />
            <button type="submit" className="btn btn-primary">Send</button>
        </form>
    )
}

export default MessageForm

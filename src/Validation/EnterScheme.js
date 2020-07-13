import * as Yup from 'yup';
 
 const EnterSchema = Yup.object().shape({
   userName: Yup.string()
     .min(3, 'Too Short!')
     .max(20, 'Too Long!')
     .required('Required'),
   roomId: Yup.string()
     .max(20, 'Too Long!')
     .required('Required'),
 });

 export default EnterSchema
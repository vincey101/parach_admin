import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { doc, updateDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../firebase';

// import StudentDataService from '../../services/studentServices';

function EditStudent() {
    const { id } = useParams()
    // const [studentId, setStudentId] = useState("")
    const [file, setFile] = useState("")
    // const [paymentMethod, setPaymentMethod] = useState("");
    const [field, setField] = useState({
        name: "",
        course: "",
        tel: "",
        address: "",
        amount: ""
    })

    const navigate = useNavigate()

    const updateField = (e) => setField({
        ...field, [e.target.name]: e.target.value
    })


    useEffect(() => {
        const getData = async () => {
            const docRef = doc(db, "students", id);
            const docSnap = await getDoc(docRef);
            setField(docSnap.data().field)
            // setPaymentMethod(docSnap.data().paymentMethod)
            // console.log(docSnap.data());
        }
        getData();

    }, [id])


    const editHandler = async (e) => {
        e.preventDefault();

        try {
            const editDoc = doc(db, "students", id);
            // const updateRef = await StudentDataService.updateStudent()
            await updateDoc(editDoc, {
                field: field,
                createdAt: serverTimestamp()
                // paymentMethod: paymentMethod
            });
            alert("Data updated successfully!");
            navigate('/student')

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="newContainer">
            <div className='newTop'>
                <h1>Edit User</h1>
            </div>
            <div className="newBottom">
                <div className="newBottom-left">
                    <img src={file ? URL.createObjectURL(file) : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRhwMT3hm_y6gImCB1M2TWvs9R1_IxXmQzDqdASndrmySHjXM3L"}
                        alt="new user avatar" />
                </div>
                <div className="newBottom-right">
                    <form className='myform' onSubmit={editHandler}>
                        <div className="forminput">
                            <label className='mylabel' htmlFor="file">
                                Image: <DriveFolderUploadOutlined className='icon' /></label>
                            <input type="file" id='file' className='myinput' name='' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Course(s)</label>
                            <input type="text" className='myinput' defaultValue={field.course} placeholder=' use comma to separate multiple courses' multiple name='course' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Full name</label>
                            <input type="text" name='name' className='myinput' required defaultValue={field.name} placeholder='john doe' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Amount Paid</label>
                            <input type="text" name='amount' className='myinput' defaultValue={field.amount} placeholder='100,000' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Address</label>
                            <input type="text" name='address' className='myinput' defaultValue={field.address} placeholder='25, john doe street Ibadan,Nigeria' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Phone number</label>
                            <input type="text" name='tel' className='myinput' required defaultValue={field.tel} placeholder='+234 8081388932' onChange={updateField} />
                        </div>
                        {/* <div className="payment">
                            <label htmlFor="" className='mylabel'>Payment:</label>
                            <input type="radio" className='myinput' defaultValue={paymentMethod} checked={paymentMethod === "Completed"} name="payment" id="1" onChange={(e) => setPaymentMethod(e.target.value)} /> Completed
                            <input type="radio" className='myinput' defaultValue={paymentMethod} checked={paymentMethod === "Incompleted"} name="payment" id="2" onChange={(e) => setPaymentMethod(e.target.value)} /> Incompleted
                        </div> */}
                        <button className='send'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditStudent


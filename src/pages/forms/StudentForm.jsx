import './form.css'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"
// import { timeStamp } from "../../firebase"
import { useNavigate } from 'react-router-dom';


function StudentForm() {
    const [file, setFile] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("Incompleted");
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


    const submitValues = async (e) => {
        e.preventDefault();

        // const details = {
        //     field,
        //     paymentMethod
        // }

        // console.log(details);
        try {
            const docRef = await addDoc(collection(db, "students"), {
                field: field,
                paymentMethod: paymentMethod,
                createdAt: serverTimestamp()

            })
            // console.log(docRef)
            navigate('/student');
            // navigate(-1);
            alert("Data successfully saved!");

            // await StudentDataService.addStudent(details);
            // navigate("/student");

        } catch (error) {
            console.log(error);
            alert(error.message);
        }
        setField("");

    };

    return (
        <div className="newContainer">
            <div className='newTop'>
                <h1>Registration Form</h1>
            </div>
            <div className="newBottom">
                <div className="newBottom-left">
                    <img src={file ? URL.createObjectURL(file) : "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRhwMT3hm_y6gImCB1M2TWvs9R1_IxXmQzDqdASndrmySHjXM3L"}
                        alt="new user avatar" />
                </div>
                <div className="newBottom-right">
                    <form className='myform' onSubmit={submitValues}>
                        <div className="forminput">
                            <label className='mylabel' htmlFor="file">
                                Image: <DriveFolderUploadOutlined className='icon' /></label>
                            <input type="file" id='file' className='myinput' name='' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Course(s)</label>
                            <input type="text" className='myinput' placeholder=' use comma to separate multiple courses' multiple name='course' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Full name</label>
                            <input type="text" name='name' className='myinput' placeholder='john doe' required onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Amount Paid</label>
                            <input type="text" name='amount' className='myinput' placeholder='100,000' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Address</label>
                            <input type="text" name='address' className='myinput' placeholder='25, john doe street Ibadan,Nigeria' onChange={updateField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Phone number</label>
                            <input type="text" name='tel' className='myinput' placeholder='+234 8081388932' required onChange={updateField} />
                        </div>
                        <div className="payment">
                            <label htmlFor="" className='mylabel'>Payment:</label>
                            <input type="radio" className='myinput' name="payment" id="1" value="Completed" checked={paymentMethod === "Completed"} onChange={(e) => setPaymentMethod(e.target.value)} /> Completed
                            <input type="radio" className='myinput' name="payment" id="2" value="Incompleted" checked={paymentMethod === "Incompleted"} onChange={(e) => setPaymentMethod(e.target.value)} /> Incompleted
                        </div>
                        <button className='send'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentForm
import './form.css'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"
import { useNavigate } from 'react-router-dom';



function TutorForm() {
    const [file, setFile] = useState("")
    const [tutor, setTutor] = useState({
        firstname: "",
        lastname: "",
        course: "",
        tel: "",
        address: "",
    })

    const navigate = useNavigate();

    const changeField = (e) => setTutor({
        ...tutor, [e.target.name]: e.target.value
    })


    const submitValues = async (e) => {
        e.preventDefault();

        try {

            const docRef = await addDoc(collection(db, "tutors"), {
                tutor: tutor
            });
            console.log(docRef.id);
            alert("Tutor added successfully");
            navigate(-1);
        } catch (error) {
            console.log(error);
        }
        // console.log(tutor);
        setTutor("");
    };
    return (
        <div className="newContainer">
            <div className='newTop'>
                <h1>Tutor Reg Form</h1>
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
                            <input type="text" className='myinput' required placeholder='use comma to separate multiple courses' name='course' multiple onChange={changeField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Firstname</label>
                            <input type="text" name='firstname' className='myinput' required placeholder='John' onChange={changeField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Lastname</label>
                            <input type="text" name='lastname' className='myinput' placeholder='Doe' onChange={changeField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Address</label>
                            <input type="text" name='address' className='myinput' placeholder='25, john doe street Ibadan,Nigeria' onChange={changeField} />
                        </div>
                        <div className="forminput1">
                            <label htmlFor="" className='mylabel'>Phone number</label>
                            <input type="text" name='tel' className='myinput' required placeholder='+234 8081388932' onChange={changeField} />
                        </div>

                        <button className='send' type='submit'>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default TutorForm
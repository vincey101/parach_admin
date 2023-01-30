import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { useNavigate } from 'react-router-dom';
import './form.css'

function CourseForm() {

    // const [file, setFile] = useState("")
    const [course, setCourse] = useState({
        title: "",
        tutor: "",
        price: "",
    })


    const navigate = useNavigate();

    const changeField = (e) => setCourse({
        ...course, [e.target.name]: e.target.value
    })


    const submitValues = async (e) => {
        e.preventDefault();

        try {
            const courseReg = await addDoc(collection(db, "courses"), {
                course: course
            });
            alert("Course added successfully");
            navigate(-1);
            console.log(courseReg);
        } catch (error) {
            console.log(error);
        }

        setCourse("");
        // console.log(course.tutor);
    };
    return (
        <div className="newContainer">
            <div className='newTop'>
                <h1>Course Form</h1>
            </div>
            <div className="newBottom">
                <div className="newBottom-right">
                    <form className='myform' onSubmit={submitValues}>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Course</label>
                            <input type="text" className='myinput' required placeholder='Python' name='title' onChange={changeField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Tutor</label>
                            <input type="text" className='myinput' name='tutor' placeholder='John doe' onChange={changeField} />
                        </div>
                        <div className="forminput2">
                            <label htmlFor="" className='mylabel'>Price&nbsp;(#)</label>
                            <input type="text" className='myinput' required name='price' placeholder='150,000' onChange={changeField} />
                        </div>
                        <button className='send'>Send</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default CourseForm

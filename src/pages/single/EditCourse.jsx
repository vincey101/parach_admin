import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase'
import { doc, updateDoc, getDoc } from "firebase/firestore";

function EditCourse() {
    const { id } = useParams()
    const [course, setCourse] = useState({
        title: "",
        tutor: "",
        price: "",
    })


    const navigate = useNavigate();

    const changeField = (e) => setCourse({
        ...course, [e.target.name]: e.target.value
    })

    useEffect(() => {
        const displayCourse = async () => {
            const docRef = doc(db, "courses", id);
            const docSnap = await getDoc(docRef);
            setCourse(docSnap.data().course)
        }
        displayCourse();

    }, [id])


    const updateCourse = async (e) => {
        e.preventDefault();

        try {
            const editCourse = doc(db, "courses", id);
            await updateDoc(editCourse, {
                course: course
            })

            alert("Course updated successfully");
            navigate(-1);
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <div className="newContainer">
            <div className='newTop'>
                <h1>Edit Course</h1>
            </div>
            <div className="newBottom">
                <div className="newBottom-right">
                    <form className='myform' onSubmit={updateCourse}>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Course</label>
                            <input type="text" className='myinput' required defaultValue={course.title} placeholder='Python' name='title' onChange={changeField} />
                        </div>
                        <div className="forminput">
                            <label htmlFor="" className='mylabel'>Tutor</label>
                            <input type="text" className='myinput' name='tutor' defaultValue={course.tutor} placeholder='John doe' onChange={changeField} />
                        </div>
                        <div className="forminput2">
                            <label htmlFor="" className='mylabel'>Price&nbsp;(#)</label>
                            <input type="text" className='myinput' required name='price' defaultValue={course.price} placeholder='150,000' onChange={changeField} />
                        </div>
                        <button className='send'>Update</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCourse

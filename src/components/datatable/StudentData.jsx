import './datatable.css'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc, orderBy } from "firebase/firestore";
import { db } from '../../firebase'
// import StudentDataService from '../../services/studentServices'



function Datatable() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "students"), (snapShot) => {
            // const unsub = collection("students").orderBy('name', 'desc').onSnapshot((snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data().field });
            });
            setUsers(list);

        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        }
        // getStudent();
    }, [])

    //     const getStudent = async () => {
    //         const users = await StudentDataService.getallstudents();
    //         setUsers(users.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    //         console.log(users);
    // }
    // console.log(users);

    // paymentMethod: doc.data().paymentMethod,

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "students", id));
            // await StudentDataService.deleteStudent(id);
            setUsers(users.filter((item) => item.id !== id))

        } catch (error) {
            console.log(error);
        }

    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Full name', width: 150 },
        { field: 'course', headerName: 'Course', width: 170 },
        { field: 'address', headerName: 'Address', width: 250 },
        { field: 'tel', headerName: 'Phone number', width: 110 },
        // { field: 'paymentMethod', headerName: 'Payment status', width: 140 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => {
                return (
                    <div className='cell actions'>
                        <Link to={'/student/' + params.row.id} style={{ textDecoration: "none" }}>
                            <span className='edit'>Edit</span>
                        </Link>
                        <span className='delete' onClick={(e) => handleDelete(params.row.id)}>Delete</span>
                    </div>
                )


            }
        },

    ];




    return (
        <div className='datatable'>
            <div className="datatitle">
                Add New Student
                <Link to="/enquiries" className="newuser">
                    Add New
                </Link>
            </div>


            < DataGrid
                getRowId={(row) => row.id}
                rows={users}
                disableSelectionOnClick
                columns={columns}
                loading={!users.length}
                pageSize={7}
                rowsPerPageOptions={[7]}
                checkboxSelection
            />

        </div>
    )
}

export default Datatable



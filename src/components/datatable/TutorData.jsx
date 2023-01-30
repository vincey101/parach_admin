import './datatable.css'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from '../../firebase'


function TutorData() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const unsub = onSnapshot(collection(db, "tutors"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach(doc => {
                list.push({ id: doc.id, ...doc.data().tutor });
            });
            setUsers(list);

        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub();
        }

    }, [])
    // console.log(users);

    const deleteHandler = async (id) => {
        try {
            // await StudentDataService.deleteStudent(id);
            await deleteDoc(doc(db, "tutors", id));
            setUsers(users.filter((item) => item.id !== id))

        } catch (error) {
            console.log(error);
        }

    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstname', headerName: 'First name', width: 100 },
        { field: 'lastname', headerName: 'Last name', width: 100 },
        { field: 'course', headerName: 'Course', width: 170 },
        { field: 'address', headerName: 'Address', width: 180 },
        { field: 'tel', headerName: 'Phone Number', width: 120 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 170,
            renderCell: (params) => {
                return (
                    <div className='cell actions'>
                        <Link to={'/tutor/' + params.row.id} style={{ textDecoration: "none" }}>
                            <span className='edit'>Edit</span>
                        </Link>
                        <span className='delete' onClick={(e) => deleteHandler(params.row.id)}>Delete</span>
                    </div>
                )


            }
        },

    ];


    return (
        <div className='datatable'>
            <div className="datatitle">
                Add New Tutor
                <Link to="/tutor-form" className="newuser">
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

export default TutorData



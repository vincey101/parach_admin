import './courses.css';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom"
import TablePagination from '@mui/material/TablePagination';
import { onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase'




export default function Courses() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    // const navigate = useNavigate()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "courses"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data().course })
            });
            setData(list);
        }, (error) => {
            console.log(error);
        });

        return () => {
            unsub()
        }
    }, []);

    // const updateCourse = async () => {
    //     try {
    //         const updateRef = doc(db, "course", id);
    //         await updateDoc(updateRef, {
    //             data: data
    //         });
    //         alert("Course updated");
    //         navigate(-1)

    //     } catch (error) {
    //         console.log(error);
    //     }


    // updateDoc(collection(db, "courses"), (doc) => {
    //     doc.update(doc.id, {
    //         course: doc.data().course,
    //     });
    // });
    // }

    const deleteCourse = async (id) => {
        try {
            await deleteDoc(doc(db, "courses", id));
            setData(data.filter((item) => item.id !== id))

        } catch (error) {
            console.log(error);
        }
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 6));
        setPage(0);
    };

    return (

        <div className="courseform">
            <div className="formheader">
                Add New course
                <Link to="/course-form" className="newcourse">
                    Add New
                </Link>
            </div>
            <div className='course'>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Course</TableCell>
                                <TableCell >Tutor</TableCell>
                                <TableCell >Price&nbsp;(#)</TableCell>
                                <TableCell style={{ width: '3vw' }}>Update</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">{row.title}</TableCell>
                                        <TableCell >{row.tutor}</TableCell>
                                        <TableCell >{row.price}</TableCell>
                                        <TableCell >
                                            <Link to={"/courses/" + row.id}>
                                                <button className="edit">Update</button>
                                            </Link>
                                        </TableCell>
                                        <TableCell >
                                            <button className='delete' onClick={(e) => deleteCourse(row.id)}>Delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[6]}
                        count={data.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>

            </div>

        </div>
    );
}
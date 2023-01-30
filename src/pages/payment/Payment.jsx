import './payment.css'
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Link } from 'react-router-dom';
import { onSnapshot, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'

function Payment() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(6);


    // const date = new Date(createdAt.seconds * 1000)
    useEffect(() => {

        // const docRef = doc(db, "students");
        // const docSnap = getDoc(docRef);

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data().price);
        // }


        const unsub = onSnapshot(collection(db, "students"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                // let createdAt = doc.data().createdAt && doc.data().createdAt.toDate().toDateString()
                // const time = dateCreated.toDate().toLocaleTimeString('en-US')

                let createdAt = doc.data().createdAt ? doc.data().createdAt.toDate().toDateString() : null;
                list.push({ id: doc.id, createdAt, paymentMethod: doc.data().paymentMethod, ...doc.data().field })
            });
            setData(list);

        }, (error) => {
            console.log(error);
        });
        return () => {
            unsub()
        }
    }, [])

    // const deletePayment = async (id) => {
    //     try {
    //         await deleteDoc(doc(db, "student", id));
    //         setData(data.filter((item) => item.id !== id))
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }




    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 6));
        setPage(0);
    };

    return (
        <div>
            <div className="courseform">
                <div className='course'>
                    <TableContainer component={Paper}>
                        <Table >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Full name</TableCell>
                                    <TableCell >Course(s)</TableCell>
                                    <TableCell >Amount paid&nbsp;(#)</TableCell>
                                    <TableCell >Date Paid </TableCell>
                                    {/* <TableCell>Balance&nbsp;(#)</TableCell> */}
                                    <TableCell >Payment </TableCell>
                                    <TableCell style={{ width: '3vw' }}>Update</TableCell>
                                    {/* <TableCell>Delete</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, i) => (
                                        <TableRow key={i}>
                                            <TableCell component="th" scope="row">{row.name}</TableCell>
                                            <TableCell >{row.course}</TableCell>
                                            <TableCell >{row.amount}</TableCell>
                                            <TableCell >{row.createdAt}</TableCell>
                                            {/* <TableCell >{ }</TableCell> */}
                                            <TableCell >{row.paymentMethod}</TableCell>

                                            {/* console.log(new Date(timestamp.seconds*1000)) */}
                                            <TableCell >
                                                <Link to="/enquiries">
                                                    <button className="edit">Update</button>
                                                </Link>
                                            </TableCell>
                                            {/* <TableCell >
                                                <button className='delete' onClick={(e) => deletePayment(row.id)}>Delete</button>
                                            </TableCell> */}
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
        </div>
    )
}

export default Payment

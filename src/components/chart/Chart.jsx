import './chart.css';
import { MoreVert } from '@mui/icons-material';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


function Chart() {
    return (
        <div className='chart'>
            <div className="top">
                <h1 className="chart-title">Total Revenue </h1>
                <MoreVert fontSize="small" />
            </div>
            <div className="bottom">
                <div className="chart-bar">
                    <CircularProgressbar value={70} text={"70"} strokeWidth={5} />
                </div>
                <p className="chart-title">Total sales made this month</p>
                <p className="amount">#200,000</p>
                <p className="desc">Previous transactions processing.Last payments may not be included</p>
            </div>
        </div>
    )
}

export default Chart
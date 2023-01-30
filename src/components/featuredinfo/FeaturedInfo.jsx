import './featuredInfo.css'
import { GroupsOutlined, People, CancelOutlined, KeyboardArrowUp } from '@mui/icons-material';
function FeaturedInfo({ type }) {
    let data;
    let amount = 50
    // let number = 10000
    let diff = 20
    switch (type) {
        case "student":
            data = {
                title: "STUDENTS",
                isMoney: false,
                link: "View all students",
                icon: <GroupsOutlined className='icon' style={{ color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)" }} />,
            };
            break;
        case "tutor":
            data = {
                title: "TUTORS",
                isMoney: false,
                link: "View all tutors",
                icon: <People className='icon' style={{ color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)" }} />,
            };
            break;
        // case "earning":
        //     data = {
        //         title: "EARNINGS",
        //         isMoney: true,
        //         link: "View net earnings",
        //         icon: <Payment className='icon' style={{ color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)" }} />,
        //     };
        //     break;
        case "uncompletedPayment":
            data = {
                title: "UNCOMPLETED PAYMENTS",
                isMoney: true,
                link: "View details",
                icon: <CancelOutlined className='icon' style={{ color: "red", backgroundColor: "rgba(255, 0, 0, 0.2)" }} />,
            };
            break;
        default:
            break;

    }


    return (
        <div className='featured'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "#"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUp />
                    {diff}%
                </div>
                {data.icon}
            </div>

        </div>

    )
}
// <div className='featured'>
//     <div className="featuredItem">
//         <span className="featuredTitle">Revenue</span>
//         <div className="featuredContainer">
//             <span className="featuredMoney">#200,000</span>
//             <span className="featuredRate">-#10,000 <ArrowDownward className='featuredIcons-negative' />
//             </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//     </div>

//     <div className="featuredItem">
//         <span className="featuredTitle">Revenue</span>
//         <div className="featuredContainer">
//             <span className="featuredMoney">#200,000</span>
//             <span className="featuredRate">-#10,000 <ArrowDownward className='featuredIcons-negative' />
//             </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//     </div>

//     <div className="featuredItem">
//         <span className="featuredTitle">Revenue</span>
//         <div className="featuredContainer">
//             <span className="featuredMoney">#200,000</span>
//             <span className="featuredRate">+#10,000 <ArrowUpward className='featuredIcons' />
//             </span>
//         </div>
//         <span className="featuredSub">Compared to last month</span>
//     </div>
// </div>


export default FeaturedInfo
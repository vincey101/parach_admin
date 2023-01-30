import "./analytics.css"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Flutter',
        Total: 5,
    },
    {
        name: 'Graphics',
        Total: 25,

    },
    {
        name: 'Python',
        Total: 17,

    },
    {
        name: 'FrontEnd',
        Total: 40,
    },
    {
        name: 'BackEnd',
        Total: 20,

    },
    {
        name: 'Digital.M',
        Total: 15,

    },
    {
        name: 'Data.A',
        Total: 20,

    },
];

function Analytics() {
    return (
        <div className="analytics">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="grey" />
                    <YAxis stroke="grey" />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>

        </div>
    )
}

export default Analytics

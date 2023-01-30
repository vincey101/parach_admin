import Analytics from '../../components/analytics/Analytics'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredinfo/FeaturedInfo'
import React from './home.css'


function Home() {
    return (
        <div className='home'>
            <div className="home-info">
                <FeaturedInfo className="featured" type="student" />
                <FeaturedInfo className="featured" type="tutor" />
                <FeaturedInfo className="featured" type="uncompletedPayment" />
            </div>
            <div className="charts">
                <Chart />
                <Analytics />
            </div>
        </div>

    )
}

export default Home
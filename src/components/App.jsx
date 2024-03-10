import { useState, useEffect } from 'react';
import axios from 'axios'
import TopBar from './TopBar';
import DisplayLeaderboard from './Leaderboard';
import constantLeaderboardData from '../leaderboardData';

const competitions = [
    "1b22f135b4d3a31152fa",
    "DATAHACK-Collective-Opinion-Spam-Detection",
    "datahack-community-detection",
    "DATAHACK-Yalidine-Challenge",
    "DATAHACK-store-recommendation-system",
    "8b971ca63765",
]

const weights = [2,7,5,5,6,5]

function App() {
    // const [leaderboardData, setLeaderboardData] = useState(constantLeaderboardData)
    const [leaderboardData, setLeaderboardData] = useState([])

    useEffect(() => {

        const getLeaderboardData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/leaderboard-full', { competitions, weights })
                // const response = await axios.get('https://kaggle-leaderboard-scraping-flask.onrender.com/leaderboard-full', { competitions, weights })

                console.log(response)
                setLeaderboardData(response.data.infos)
            } catch (error) {
                console.error(error)
            }
        }

        getLeaderboardData()

        const intervalId = setInterval(getLeaderboardData, 60000); // 60000 ms = 1 minute

        // Clear the timeout if the component unmounts
        return () => clearInterval(intervalId);
    }, [])

    return (
        <>
            <TopBar />
            <DisplayLeaderboard data={leaderboardData} weights={weights} />
        </>
    )
}

export default App;

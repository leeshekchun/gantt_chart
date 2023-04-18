import React, { Component, useState, useEffect } from 'react';
import Gantt from './components/Gantt';
import './App.css';
// import Axios from 'axios';

// const Apps = () => {
//     const [data,setData]=useState("");

//     const getData = async () =>{
//         const response = await Axios.get("http://localhost:1337/data");
//         setData(response.data);
//     }

//     useEffect(()=>{
//         getData()
//     },[]);
//     return(
//         <div>{data}</div>
//     )
// }

// hardcode data from line 6-14
const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};

class App extends Component {
    render() {
        return (
            <div>
                <div className="gantt-container">
                    <Gantt tasks={data}/>
                </div>
            </div>
        );
    }
}
export default App;
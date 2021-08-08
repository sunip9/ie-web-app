import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { getProducts, getWorker } from '../api';
import moment from 'moment'


export default function Task({match}) {
  const Id = match.params.id
    const [ tasks, setTasks ] = useState([])
    const [ product, setProduct ] = useState([])
    const [ worker, setWorker ] = useState([])

    const [efficiency, setEfficiency] = useState()
    const [date, setDate] = useState()

    
    const init = () =>{
      getWorker(Id).then(data => {
        setWorker(data)
        setTasks(data.task)
      })
        getProducts().then(data => {
          setProduct(data)
        })
    }

    console.log(worker)
    console.log(tasks)
    
    useEffect(()=>{
        init()
    }, [])

    const taskEff = tasks.reduce((acc, i) => acc + i.avg, 0)
    const totalAvg = ((taskEff/tasks.length)*100).toFixed(2)
    // let taskee = taskEff.map( a => a.efficiency).reduce((prev,next) => prev+next)
    console.log('taskEff',taskEff/tasks.length)
    console.log('taskAvg',totalAvg)
    console.log(worker)
  return (
    <>
       <h4>{worker.name}</h4>
       <h4>{worker.empId}</h4>
       <label>Skills</label>
       {worker.skill && worker.skill.map(x =>
       <ul>          
         <li>{x}</li>
         </ul>
         )}  
       <br/>
       <table className="table table-striped">
                <thead>
                    <tr>
                    
                    <th scope="col">Date</th>
                    <th scope="col">Floor</th>                   
                    <th scope="col">Size</th>
                    <th scope="col">Achieve</th>
                    <th scope="col">Target</th>
                    <th scope="col">Work Time</th>
                    <th scope="col">Total Work Time</th>
                    <th scope="col">Efficiency</th>
                    <th scope="col">Avg Daily Efficiency</th>
                    
                    </tr>
                </thead>
                <tbody>
                {worker.task && worker.task.map((p,i) =>
                    <tr key={i}>
                    {/* <th scope="row">{i+1}</th> */}
                    <td>{moment(p.date).format('MMMM Do YYYY')}</td>
                    <td>{p.floor}</td>
                    <td> {p.task.map(m =>
                       <li>{m.size}</li>
                    )}
                    </td>
                    <td> {p.task.map(m =>
                       <li>{m.achieve}</li>
                    )}</td>
                    <td> {p.task.map(m =>
                       <li>{m.target}</li>
                    )}</td>
                     <td> {p.task.map(m =>
                      <li>{m.time} hours</li>
                    )}</td>
                     <td> {(p.task.reduce((acc,cur) => acc + cur.time, 0))} hours</td>
                    <td> {p.task.map(m =>
                      <li>{(m.efficiency*100).toFixed(2)} %</li>
                    )}</td>
                    <td> {((p.task.map(m =>
                      m.efficiency).reduce((prev,next) => prev+next)/p.task.length)*100).toFixed(2)
                    } %</td>
                    
                   
                    </tr>
                    )}
                </tbody>
            </table>

            <h4>Avg Efficiency: {totalAvg} </h4>
            {/* ((taskEff/tasks.length)*100).toFixed(2) */}
    </>   
  );
}
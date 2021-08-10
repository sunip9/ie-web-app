import React,{useState, useEffect} from "react";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    MoneyOffOutlined,
    WorkOffOutlined,
    PeopleOutlineTwoTone,
    EditOutlined
  } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { getProducts, getWorker } from '../../api';
import moment from 'moment'
import workerImg from './worker.png'
import PageHeader from "../Header/PageHeader";
import useTable from '../useTable';
import { InputAdornment, TableBody, TableCell, TableRow } from '@material-ui/core';
import { Controls }  from '../controls/Controls'
import { Search } from "@material-ui/icons";
import CloseIcon from '@material-ui/icons/Close';
import Notification from '../Notification';
import ConfirmDialog from "../ConfirmDialog";


const headcells =[
    {id:'date', label: "Date"}, {id:'floor', label: "Floor", type: "number"}, {id:'size', label: "Size"},
    {id:'achieve', label: "Achieve"}, {id:'target', label: "Target"},
    {id: 'time', label: "Time", type: 'number'},
    {id: 'totalTime', label: "Total Time", type: 'number'},
    {id: 'overtime', label: "Over Time", type: 'number'},
    {id: 'efficiency', label: "Efficiency", type: 'number'},
    {id: 'avg', label: "Avg Efficiency", type: 'number'},
    {id:'action', label: "Action", disableSorting: true}
]
  
  export default function Worker({match}) {
    const Id = match.params.id
    const [ tasks, setTasks ] = useState([])
    const [ worker, setWorker ] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(tasks, headcells, filterFn)
    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const init = () =>{
        getWorker(Id).then(data => {
          setWorker(data)
          setTasks(data.task)
        })          
      }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
      console.log(worker,'worker')
      console.log(tasks)
      
      useEffect(()=>{
          init()
      }, [])

    return (
        <>
        <PageHeader 
                title="Worker Profile"
                subtitle="Single Worker Profile"
                icon={<PeopleOutlineTwoTone fontSize="large" />}
            />
      <div className="user">
        <div className="userTitleContainer">

        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <img
                src={workerImg}
                alt=""
                className="userShowImg"
              />
              <div className="userShowTopTitle">
                <span className="userShowUsername">Name: <span style={{fontWeight: 600}}>{worker.name}</span></span>
                <span className="userShowUserTitle">Worker ID:<span style={{fontWeight: 600}}> {worker.empId}</span></span>
                <span className="userShowUserTitle">Designation: {worker.designation}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{worker.age} years old</span>
              </div>
              <div className="userShowInfo">
                <MoneyOffOutlined className="userShowIcon" />
                <span className="userShowInfoTitle">{worker.salary} Tk</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">{moment(worker.joining).format('MMMM Do YYYY')}</span>
              </div>
              
            </div>
          </div>
          <div className="userUpdate">
          <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">{worker.contact}</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{worker.marital}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">{worker.address}</span>
              </div>
            <span className="userUpdateTitle">Skill</span>
            <div className="userShowInfo">
               
                <ul>
                    {worker.skill ? worker.skill.map((x,i) => 
                        <li key={i}>{x}</li>
                        ) : 'Null'}
                </ul>               
              </div>
              {/* <span className="userUpdateTitle">Efficiency</span>            */}
          </div>
        </div>
      </div>

      <TblContainer >
              <TblHead />
              <TableBody>
            { recordsAfterPagingAndSorting() && recordsAfterPagingAndSorting().map(item => (
                <TableRow >
                    <TableCell>{moment(item.date).format('MMMM Do YYYY')}</TableCell>
              
                    {/* <TableCell component={Link} to={`/worker/${item._id}`} style={{cursor: 'pointer', color:'#a250f5', fontSize: '16px'}}
                    >{item.empId}</TableCell> */}
                    <TableCell>{item.floor}</TableCell>
                    <TableCell>{item.task.map(m =>
                       <li>{m.size}</li>
                    )}</TableCell>
                    <TableCell>{item.task.map(m =>
                       <li>{m.achieve} pcs</li>
                    )}</TableCell>
                    <TableCell>{item.task.map(m =>
                       <li>{m.target} pcs</li>
                    )}</TableCell>
                    <TableCell>{item.task.map(m =>
                       <li>{m.time} hours</li>
                    )}</TableCell>
                    
                    <TableCell>{item.totalTime} hours</TableCell>
                    <TableCell>{item.overTime} hours</TableCell>
                    {/* <TableCell>{(item.task.reduce((acc,cur) => acc + cur.overTime, 0))} hours</TableCell> */}
                    {/* <TableCell>{item.task.map(m =>
                       <li>{m.overTime} hours</li>
                    )}</TableCell> */}
                    {/* <TableCell>{((item.task.reduce((acc,cur) => acc + cur.time, 0)) - 8)>0 ? (item.task.reduce((acc,cur) => acc + cur.time, 0)) - 8: 0 } hours</TableCell> */}
                    <TableCell>{item.task.map(m =>
                       <li>{(m.efficiency*100).toFixed(2)} %</li>
                    )}</TableCell>
                    {/* <TableCell>{((item.task.map(m =>
                      m.efficiency).reduce((prev,next) => prev+next)/item.task.length)*100).toFixed(2)
                    } %</TableCell> */}
                     <TableCell>{item.avgEff} %</TableCell>
                    <TableCell>
                        <Controls.ActionButton
                            color="primary"
                            onClick={() => { openInPopup(item) }}
                            >
                            <EditOutlined fontSize="small" />
                        </Controls.ActionButton>

                        <Controls.ActionButton
                            color="secondary"
                            onClick={() => {
                                setConfirmDialog({
                                    isOpen: true,
                                    title: `Are you sure to delete worker ID: ${item.empId} ?`,
                                    subTitle: "You can't undo this operation !",
                                    // onConfirm: () => { onDelete(item._id) }
                                })
                            }}
                            >
                            <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                    </TableCell>

                </TableRow>
            ))}
            </TableBody>
            
            </TblContainer>
            <TblPagination />  
      </>
    );
  }
  
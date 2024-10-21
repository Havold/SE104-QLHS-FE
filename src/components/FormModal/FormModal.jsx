import { AddRounded, DeleteOutline, EditOutlined } from '@mui/icons-material'
import React from 'react'

const FormModal = ({table, type, id, data}) => {
    const size = type ==='create' ? 'w-9 h-9' : 'w-8 h-8'
    const bg = type === 'create' ? 'bg-webYellow' : type==='delete' ? 'bg-webPurple' : 'bg-webSky'
    const icon =  type === 'create' ? <AddRounded fontSize='small'/> : type==='delete' ? <DeleteOutline style={{ fontSize: 16, color: "whitesmoke" }}/> : <EditOutlined style={{ fontSize: 16, color: "whitesmoke" }}/>
  return (
    <div>
        <button className={`${size} flex rounded-full items-center justify-center ${bg}`}>
            {icon}
        </button>
    </div>
  )
}

export default FormModal
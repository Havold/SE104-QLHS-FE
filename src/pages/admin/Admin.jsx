import AttendanceChart from '../../components/AttendanceChart/AttendanceChart'
import CountChart from '../../components/CountChart/CountChart'
import FinanceChart from '../../components/FinanceChart/FinanceChart'
import UserCard from '../../components/UserCard/UserCard'
import './admin.scss'

const Admin = () => {
  const data = [
    {
    type: 'students',
    date: '2024/25',
    total: '6,123',
  },
  {
    type: 'teachers',
    date: '2024/25',
    total: '1,123',
  },
  {
    type: 'parents',
    date: '2024/25',
    total: '1,123',
  },
  {
    type: 'staffs',
    date: '2024/25',
    total: '1,123',
  },
]
  return (
    <div className='flex p-2'>
      {/* LEFT */}
      <div className='flex flex-col gap-2 w-full lg:w-2/3'>
        {/* TOP */}
        <div className='flex justify-between flex-wrap gap-4'>
          {data.map((item, index) => {
            return (<UserCard key={index} type={item.type} date={item.date} total={item.total} />)
          })}
        </div>
        {/* CENTER */}
        <div className='flex gap-2 flex-col lg:flex-row'>
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart/>
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart/>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="w-full h-[450px]">
          <FinanceChart/>
        </div>
      </div>
      {/* RIGHT */}
      <div className='w-full lg:w-1/3 '></div>
    </div>
  )
}

export default Admin
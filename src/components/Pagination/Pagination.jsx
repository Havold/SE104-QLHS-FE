import React from 'react'

const Pagination = () => {
  return (
    <div className="flex items-center justify-between">
    <button className="py-2 px-4 text-[14px] bg-gray-200 rounded-md hover:opacity-90 disabled:opacity-40">Prev</button>
    <div className="flex items-center gap-2">
      <button className="py-2 px-3 bg-webSky text-[14px] rounded-md">1</button>
      <button className="p-2 text-[14px] rounded-md">2</button>
      <button className="p-2 text-[14px] rounded-md">3</button>
      ...
      <button className="p-2 text-[14px] rounded-md">10</button>
    </div>
    <button className="py-2 px-4 text-[14px] bg-gray-200 rounded-md hover:opacity-90 disabled:opacity-40">Next</button>
  </div>
  )
}

export default Pagination
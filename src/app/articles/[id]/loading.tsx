import React from 'react'

const loading = () => {
  return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4 animate-pulse">
        <div className="bg-white p-7 rounded-lg mb-7">
        <div className="bg-gray-300 h-6 mb-2 rounded-lg"></div>
        <div className="bg-gray-300 h-4 rounded-lg">
        </div>
        <p className="bg-gray-300 mt-5 h-6 rounded-lg "></p>
        </div>
        <div className='mt-8'>
            <div className='p-2 rounded-lg bg-gray-300 h-10'></div>
            <button className='bg-gray-300 mt-2 rounded-lg h-8 w-20'></button>
        </div>
    </section>
  )
}

export default loading
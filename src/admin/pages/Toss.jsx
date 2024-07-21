import React, { useState } from 'react'
import Layout from '../components/Layout'
import "../../styles/main1.scss"

const Toss = () => {
  const [angle, setAngle] = useState(0);
  const predictedResult = () => {
    const val = Math.floor(Math.random() * 100);
    if (val > 50) {
      setAngle(prev => prev + 540);
    }
    else {
      setAngle(prev => prev + 360)
    }
    console.log(val)
  }
  
  return (
    <Layout>
      <div className='md:p-4 relative grid gap-8'>

        <h1 className='min-[320px]:p-4 md:p-0 text-4xl font-semibold tracking-wider'>Toss</h1>

        <div className='m-auto h-96 grid place-content-center' >
          <div className='toss' onClick={predictedResult} style={{transform:`rotateY(${angle}deg)`}} >
            <div className='w-48 h-48'></div>
            <div  className='w-48 h-48'></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Toss
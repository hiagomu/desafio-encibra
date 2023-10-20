"use client"

import { useEffect, useState } from 'react'
import { InfoCard } from './components/InfoCard'
import { api } from '../../services/api'

export default function Home() {
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    (async() => {
      const response = await api.get("/contributors")
      setContributors(response.data)
    })()
  }, [])

  return (
    <main className="flex flex-col items-center justify-start h-full w-full">
      <div className='flex justify-center items-start w-full flex-wrap gap-x-14 gap-y-3 mt-5'>
        {
          contributors?.map(contributor => <InfoCard contributor={contributor}/>)
        }
      </div>
    </main>
  )
}
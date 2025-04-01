import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'

const Dentist = () => {
  
  const { speciality } = useParams()
  const [filterDentist, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

  const { dentists } = useContext(AppContext)
  console.log('Dentists from AppContext:', dentists);

  const applyFilter = () => {
    console.log('applyFilter', dentists)
    if (speciality) {
      setFilterDoc(dentists.filter(doc => doc.specialization === speciality))
    } else {
      setFilterDoc(dentists)
    }
  }

  useEffect(() => {
    console.log('useEffect', speciality)
    applyFilter()
  }, [dentists, speciality])

  return (
    <div>
    <p className='text-gray-600'>Browse through the doctors specialist.</p>
    <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
      <button onClick={() => setShowFilter(!showFilter)} className={`py-1 px-3 border rounded text-sm  transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}>Filters</button>
      <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
        <p onClick={() => speciality === 'General Dentistry' ? navigate('/dentists') : navigate('/dentists/General Dentistry')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'General Dentistry' ? 'bg-indigo-100 text-black ' : ''}`}>General Dentistry</p>
        <p onClick={() => speciality === 'Orthodontics' ? navigate('/dentists') : navigate('/dentists/Orthodontics')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Orthodontics' ? 'bg-indigo-100 text-black ' : ''}`}>Orthodontics</p>
        <p onClick={() => speciality === 'Endodontics' ? navigate('/dentists') : navigate('/dentists/Endodontics')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Endodontics' ? 'bg-indigo-100 text-black ' : ''}`}>Endodontics</p>
        <p onClick={() => speciality === 'Periodontics' ? navigate('/dentists') : navigate('/dentists/Periodontics')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Periodontics' ? 'bg-indigo-100 text-black ' : ''}`}>Periodontics</p>
        <p onClick={() => speciality === 'Prosthodontics' ? navigate('/dentists') : navigate('/dentists/Prosthodontics')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Prosthodontics' ? 'bg-indigo-100 text-black ' : ''}`}>Prosthodontics</p>
        <p onClick={() => speciality === 'Pediatric Dentistry' ? navigate('/dentists') : navigate('/dentists/Pediatric Dentistry')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === 'Pediatric Dentistry' ? 'bg-indigo-100 text-black ' : ''}`}>Pediatric Dentistry</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {filterDentist.map((item, index) => (
            <div onClick={() => { navigate(`/appointment/${item.id}`); window.scrollTo(0, 0) }} className='border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-indigo-50' src={`./src/assets/doc${item.id}.png`} alt="" />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                </div>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dentist
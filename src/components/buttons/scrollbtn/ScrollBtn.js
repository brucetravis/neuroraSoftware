import React from 'react'
import './ScrollBtn.css'
import { ArrowBigUp } from 'lucide-react'

export default function ScrollBtn() {
  return (
    <div className='scrollBtn'>
        <button>
            <ArrowBigUp 
                size={20} 
                stroke="#fff" 
            />
        </button>
    </div>
  )
}

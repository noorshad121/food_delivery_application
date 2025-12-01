import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='download-app' id='download-app'>
        <h2>Download <span>FBN App</span> for better Experience</h2>
        <div className="app-download-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload

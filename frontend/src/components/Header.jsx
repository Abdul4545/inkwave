/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const {user, setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if(user) {
      navigate("/result");
    } else {
      setShowLogin(true)
    }
  }

  return (
    <motion.div className='flex flex-col justify-center items-center text-center my-20'
    initial = {{opacity: 0.2, y: 100}}
    transition={{duration: 1}}
    whileInView={{opacity: 1, y: 0}}
    viewport={{once: true}}
    >
      <motion.div className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500'
      initial = {{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.2, duration: 0.8}}
      
      >
        <p>Best text to Image generator</p>
        <img src={assets.star_icon} alt="star" />
      </motion.div>

      <motion.h1 className='text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center'>Turn text to <span className='text-blue-600'
      initial={{opacity: 0, }}
      animate={{opacity: 1}}
      transition={{delay: 0.4, duration: 2}}
      >image</span>, in seconds.</motion.h1>

      <p className='text-center max-w-xl mx-auto mt-5'
      initial = {{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: 0.6, duration: 0.8}}
      >
        Convert your words into stunning visuals with our AI-powered text-to-image tool. Simply type your idea, and watch it transform into an image instantly. Perfect for designers, creators, and storytellers seeking visual inspiration. No design skills needed—just your imagination!
      </p>

      <motion.button onClick={onClickHandler} className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full'
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.95}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{default: {duration: 0.5}, opacity: {delay: 0.8, duration: 1}}}
      >Generate Image <img src={assets.star_group} alt="star-group" className='h-7' /></motion.button>


    </motion.div>
  )
}

export default Header
 
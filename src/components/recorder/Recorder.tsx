import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectDateStart, start, stop } from '../../redux/recorder';
import cx from 'classnames';
import './Recorder.css';

const Recorder = () => {
  const disptach = useDispatch();
  const dateStart = useSelector(selectDateStart);
  const started = dateStart != '';
  let interval = useRef<number>(0); // useRef is used to preserve variable from one render to another
  const [count, setCount] = useState<number>(0);
  
  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);
      disptach(stop())
      return;
    }
    disptach(start());
    interval.current = window.setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
  }
  
  useEffect(() => {
    return () => {
      window.clearInterval(interval.current); // to avoid memory leaks?
    }
  }, [])

  const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

  let seconds = started ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000) : 0;
  const hours = seconds ? Math.floor(seconds / 3600) : 0;
  seconds -= hours * 3600;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds -= minutes * 60;
  
  return (
    <div className={`recorder ${started  ? 'recorder-started ' : ''}`}>
       <button className="recorder-record" onClick={() => handleClick()}>
         <span></span>
       </button>
       <div className="recorder-counter">{addZero(hours)}:{addZero(minutes)}:{addZero(seconds)} </div>
    </div>
  )
}

export default Recorder

'use client'

import React, {useRef, useState, useEffect} from "react";
import { cardData } from "./utils/cardData";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";





gsap.registerPlugin(useGSAP);





interface IData {
  title: string;
  paragraph: string;
}

interface ICardComponent  {
  data: IData[]
}




export const Loader: React.FC<{loading: number}> = ({loading}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (loading === 100) {
      // Animation for the entire container
      gsap.fromTo(containerRef.current, {
        duration: 2,
        opacity: 1,
        scale:1,
        y: 0,
        ease: 'power3.out',
      },
      { opacity: 0, scale:2, y: -100, duration: 2.5, delay: 0.2, ease: 'power3.out' }
    );
  
      // Animation for the title
      gsap.fromTo(
        titleRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: 0, duration: 1.5, delay: 0.2, ease: 'power3.out' }
      );
  
      // Animation for the percentage
      gsap.fromTo(
        percentageRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, delay: 0.5, ease: 'elastic.out(1, 0.75)' }
      );
    }
  }, [loading]);




  return (
    <div ref={containerRef} className = {`loader__container ${loading === 100 ? 'remove-preloader': ''}`}>
      <h1 ref={titleRef} className='loader__text'>VieUnite Illustration</h1>
      <span className='loader__percentage'>{loading}%</span>
      </div>
)
}

export const CardComponent: React.FC<ICardComponent> = (props)=> {

  const { data } = props
  return (
    <div className='card-container'>
      {data.map((item, id) => (
        <div key={id} className="card-container__card-wrapper">
        <span className="card-container__title">
          {item.title}
        </span>
        <p className='card-container__paragraph'>{item.paragraph}</p>

        </div>
      ))}
    </div>
  )
}

export const VieuniteDemo:React.FC<{loading: number}> = ({loading}) => {
  
const containerRef = useRef<HTMLDivElement>(null)
const titleRef = useRef<HTMLHeadingElement>(null);
const imageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (loading === 100) {
    // Animation for the entire container
    gsap.to(containerRef.current, {
      duration: 1,
      opacity: 1,
      delay: 0.4,
      y: 0,
      ease: 'power3.out',
    });

    // Animation for the title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.6, ease: 'power3.out' }
    );

    // Animation for the image
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, delay: 0.8, ease: 'elastic.out(1, 0.75)' }
    );
  }
}, [loading]);

  return (
    <>

    <section ref={containerRef} className='section-display'>
       

      <div className='section-display__left'>
      <h1 ref={titleRef} className='section-display__title'>Exclusive bespoke content available to <span className="highlight">Advanced</span> License holders</h1>
      <CardComponent data = {cardData}/>
      </div>

      <div ref={imageRef} className='section-display__right'>
        <div className='section-display__image-container'>
        <img className='section-display__image' alt="illustration"  src='assets/imgs/Illustration.webp'/>
        </div>
        
      </div>

      
    </section>
    </>

  );
}

export default function Home() {
  const [loading, setLoading] = useState<number>(20)
  const container = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const interval = setInterval(() => {
        setLoading((prevLoading) => {
          const newLoading = Math.min(prevLoading * 2, 100);
          if (newLoading > 100) {
            clearInterval(interval)
          }
          return newLoading
        })

      }, 1000)

      return () => clearInterval(interval);
    }, [])

  return (
    <div className='home'>
      <Loader loading={loading}/>
      <VieuniteDemo loading={loading}/>

    </div>
  );
}

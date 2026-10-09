'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const bannerImages = [
  '/Characters/Group Photo/Group photo 1.png',
  '/Characters/Group Photo/Group Photo 2.png',
  '/Characters/Group Photo/Group photo 3.png',
  '/Characters/Group Photo/Group photo 4.png'
];

const team = [
  { name: 'Robert H. Glassman, MD, MACP, FCCP', image: '/Characters/Headshot/Robert Glassman.png' },
  { name: 'Elias R. Thorne, MD, PhD, FCCP', image: '/Characters/Headshot/Dr Elias Thorne.png' },
  { name: 'Sarah Chen, MD, FCCP, ATSF', image: '/Characters/Headshot/Dr Sarah Chen.png' },
  { name: 'Marcus Vance, MD, FACP, FAASM', image: '/Characters/Headshot/Marcus Vance.png' },
  { name: 'Amina K. Yusuf, MD, PhD, FACP', image: '/Characters/Headshot/Dr Amina K Yusuf.png' },
  { name: 'David O. Ojo, MD, FCCM', image: '/Characters/Headshot/Dr David Ojo.jpg' },
  { name: 'Michael T. Davies, RRT-ACCS', image: '/Characters/Headshot/Micheal T Davis.png' },
  { name: 'Emily N. Rostova, PharmD, BCPS', image: '/Characters/Headshot/Dr Emily Rostove.png' },
  { name: 'Elena R. Gomez, APRN, AGACNP-BC', image: '/Characters/Headshot/Elena Gomez.png' },
  { name: 'Lars Johansen, MD, MPH', image: '/Characters/Headshot/Dr Lars Johansen.png' },
  { name: 'Mei Lin, MD', image: '/Characters/Headshot/Mei lin.png' },
  { name: 'Jason Reynolds, CPFT, RPFT', image: '/Characters/Headshot/Jason reynolds.png' },
  { name: 'Sophia V. Rossi, CMI', image: '/Characters/Headshot/Sophia v rossi.ng' },
  { name: 'Chloe M. Bennett, MD, MSc', image: '/Characters/Headshot/Dr Chloe Bennett.png' },
];

export default function MeetTheTeam() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const slides = [bannerImages[bannerImages.length - 1], ...bannerImages, bannerImages[0]];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentSlide((prev) => prev + 1);
    }, 13000); // 13 seconds total (10 seconds rest + 3 seconds slide animation)
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentSlide === slides.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(slides.length - 2);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '4rem', width: '100%' }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', aspectRatio: '16 / 9', position: 'relative', overflow: 'hidden', backgroundColor: 'var(--gray-100)' }}>
          <div 
            onTransitionEnd={handleTransitionEnd}
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? 'transform 3s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
            }}
          >
            {slides.map((src, idx) => (
              <div key={idx} style={{ position: 'relative', flex: '0 0 100%', height: '100%' }}>
                <Image 
                  src={src} 
                  alt={`Team Banner ${idx}`} 
                  fill
                  style={{ objectFit: 'cover' }} 
                  priority={idx === 1}
                />
              </div>
            ))}
          </div>

          <button 
            onClick={handlePrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: '1rem',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: 'var(--navy-900)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button 
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: '1rem',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: 'var(--navy-900)',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '3rem auto 4rem auto', padding: '0 1.5rem' }}>
        <p style={{ fontSize: '1.25rem', lineHeight: 1.6, color: 'var(--navy-700)' }}>
          We are a multidisciplinary team of physicians, researchers, scientists, healthcare professionals, editors, and medical communication specialists working together to advance medical knowledge through rigorous research, evidence review, education, and scholarly publication. Our team brings expertise from across the health sciences, enabling Sterling IMRES to approach complex medical questions and research challenges from multiple professional perspectives while maintaining a strong focus on scientific integrity, collaboration, and practical impact.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {team.map((member, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <Image 
                src={member.image} 
                alt={member.name} 
                fill 
                style={{ objectFit: 'cover', objectPosition: 'top' }} 
              />
            </div>
            <h3 style={{ 
              color: '#1eb4c6', 
              fontSize: '1.15rem', 
              fontWeight: 700, 
              textAlign: 'center',
              lineHeight: 1.4,
              margin: 0
            }}>
              {member.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

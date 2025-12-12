'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { getSectionData } from '@/data/utils';
import { useLanguage } from '@/components/providers/LanguageProvider';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

interface SlideData {
  title: string;
  description: string;
  video: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaPrimaryLink: string;
  ctaSecondaryLink: string;
}

const Hero = () => {
  const { language: lang } = useLanguage();
  const data = getSectionData('hero', lang);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoReadyStates, setVideoReadyStates] = useState<boolean[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const swiperRef = useRef<any>(null);

  // Define 3 slides with their configurations (memoized)
  const slides: SlideData[] = useMemo(() => [
    {
      // Slide 1: Welcome/About Gutter Company
      title: data.title,
      description: data.description,
      video: '/assets/video/about-gutter.mp4',
      ctaPrimary: data.cta.primary,
      ctaSecondary: data.cta.secondary,
      ctaPrimaryLink: '/contacts',
      ctaSecondaryLink: '/company/about',
    },
    {
      // Slide 2: Office and Shop Office Rental
      title: lang === 'en' ? 'Premium Office & Shop Rental Spaces' : 'ከፍተኛ የቢሮ እና ሱቅ ምእራፍ ምድብ',
      description: lang === 'en' 
        ? 'Modern, fully-equipped office and shop spaces designed for productivity and success. Perfect for businesses of all sizes.'
        : 'ዘመናዊ፣ ሙሉ በሙሉ የተገጠመ የቢሮ እና የሱቅ ቦታዎች ለምርታማነት እና ለስኬት የተነደፉ። ለሁሉም የንግድ መጠኖች ተስማሚ።',
      video: '/assets/video/gutter-office-rental.mp4',
      ctaPrimary: lang === 'en' ? 'Book Now' : 'አሁን ይዘዙ',
      ctaSecondary: lang === 'en' ? 'Learn More' : 'ተጨማሪ ይማሩ',
      ctaPrimaryLink: '/contacts',
      ctaSecondaryLink: '/contacts',
    },
    {
      // Slide 3: Wedding Hall Rental
      title: lang === 'en' ? 'Elegant Wedding Hall Rental' : 'የሚያምር የጋቶ አዳራሽ ምእራፍ',
      description: lang === 'en'
        ? 'Beautiful wedding halls for your special day. Spacious, elegant venues with modern amenities for unforgettable celebrations.'
        : 'ለተለየ ቀንዎ ውብ የጋቶ አዳራሾች። ሰፊ፣ የሚያምር ቦታዎች ከዘመናዊ ዕቃዎች ጋር ለማይረሳ በዓላት።',
      video: '/assets/video/wedding-hall.mp4',
      ctaPrimary: lang === 'en' ? 'Book Now' : 'አሁን ይዘዙ',
      ctaSecondary: lang === 'en' ? 'Learn More' : 'ተጨማሪ ይማሩ',
      ctaPrimaryLink: '/contacts',
      ctaSecondaryLink: '/contacts',
    },
  ], [data, lang]);

  // Preload videos for all slides on mount
  useEffect(() => {
    const readyStates = slides.map(() => false);
    setVideoReadyStates(readyStates);

    slides.forEach((slide, index) => {
      const video = document.createElement('video');
      video.src = slide.video;
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.preload = 'auto';
      
      const handleCanPlay = () => {
        setVideoReadyStates(prev => {
          const newStates = [...prev];
          newStates[index] = true;
          return newStates;
        });
      };

      video.addEventListener('canplaythrough', handleCanPlay);
      video.load();
    });
  }, [slides]);

  // Handle video playback for active slide
  useEffect(() => {
    slides.forEach((slide, index) => {
      if (slide.video && videoRefs.current[index]) {
        const video = videoRefs.current[index];
        if (video) {
          if (index === activeIndex) {
            // Play video if it's ready
            if (videoReadyStates[index]) {
              video.play().catch(() => {
                // Autoplay might be blocked
              });
            }
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      }
    });
  }, [activeIndex, videoReadyStates, slides]);

  const handleSlideChange = (swiper: any) => {
    // Get the real index (accounting for loop mode)
    const realIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
    setActiveIndex(realIndex);
    
    // Preload next slide's video if not already ready
    const nextIndex = (realIndex + 1) % slides.length;
    if (slides[nextIndex].video && videoRefs.current[nextIndex] && !videoReadyStates[nextIndex]) {
      const nextVideo = videoRefs.current[nextIndex];
      if (nextVideo) {
        nextVideo.load();
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true,
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3 !mx-1',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !w-8',
        }}
        navigation={false}
        loop={true}
        speed={2000}
        allowTouchMove={true}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          // Set initial active index
          const realIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;
          setActiveIndex(realIndex);
        }}
        className="hero-swiper !h-screen"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="!h-screen">
            <HeroSlide 
              slide={slide} 
              index={index} 
              videoRefs={videoRefs} 
              isActive={index === activeIndex}
              isVideoReady={videoReadyStates[index] || false}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30 pointer-events-none">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/70 uppercase tracking-wider font-semibold">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface HeroSlideProps {
  slide: SlideData;
  index: number;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
  isActive: boolean;
  isVideoReady: boolean;
}

const HeroSlide: React.FC<HeroSlideProps> = ({ slide, index, videoRefs, isActive, isVideoReady }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRefs.current[index]) {
      const video = videoRefs.current[index];
      if (video) {
        const handleCanPlayThrough = () => {
          setVideoLoaded(true);
          if (isActive) {
            video.play().catch(() => {
              setVideoError(true);
            });
          }
        };

        const handleCanPlay = () => {
          if (!videoLoaded) {
            setVideoLoaded(true);
            if (isActive) {
              video.play().catch(() => {
                setVideoError(true);
              });
            }
          }
        };

        const handleLoadedData = () => {
          // Video has enough data to start playing
          if (!videoLoaded && video.readyState >= 2) {
            setVideoLoaded(true);
          }
        };

        const handleError = () => {
          setVideoError(true);
        };

        video.addEventListener('canplaythrough', handleCanPlayThrough);
        video.addEventListener('canplay', handleCanPlay);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);

        // If video is already ready from preload, set it as loaded immediately
        if (isVideoReady && !videoLoaded) {
          setVideoLoaded(true);
          if (isActive) {
            video.play().catch(() => {
              setVideoError(true);
            });
          }
        }

        if (isActive) {
          // Ensure video is loaded and ready
          if (video.readyState >= 2 && !videoLoaded) {
            setVideoLoaded(true);
          }
          if (videoLoaded || video.readyState >= 2) {
            video.play().catch(() => {
              // Autoplay might be blocked
            });
          }
        } else {
          // Pause video when slide becomes inactive (but keep it loaded)
          video.pause();
        }

        return () => {
          video.removeEventListener('canplaythrough', handleCanPlayThrough);
          video.removeEventListener('canplay', handleCanPlay);
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('error', handleError);
        };
      }
    }
  }, [index, isActive, videoLoaded, isVideoReady]);

  // Keep video loaded state persistent (don't reset on inactive)
  // This ensures smooth transitions

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Video Container */}
      <div className="absolute inset-0 z-0">
        {/* Video Background */}
        {!videoError && (
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-[cubic-bezier(0.4,0,0.2,1)] z-0 ${
              videoLoaded && isActive ? 'opacity-100' : 'opacity-0'
            }`}
            autoPlay={isActive}
            loop
            muted
            playsInline
            preload="auto"
            style={{ zIndex: 0, pointerEvents: 'none' }}
          >
            <source src={slide.video} type="video/mp4" />
          </video>
        )}

        {/* Dark Overlay - Reduced opacity for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/40 via-gray-800/35 to-gray-900/40 dark:from-gray-900/50 dark:via-gray-800/45 dark:to-gray-900/50 z-10"></div>
        
        {/* Animated Gradient Overlay - Reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse z-10"></div>
      </div>

      {/* Floating Decorative Elements - Reduced opacity */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse z-5"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 z-5"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-tertiary/8 rounded-full blur-3xl animate-pulse delay-500 z-5"></div>

      {/* Content Container */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full h-full flex items-start pt-20 sm:pt-24 md:pt-32">
        <div className="max-w-5xl mx-auto text-center w-full">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 leading-tight drop-shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              {slide.title}
            </span>
          </h1>

          {/* Description */}
          <div className="inline-block px-6 py-4 mb-10 bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl sm:text-2xl text-gray-100 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
              {slide.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <a
              href={slide.ctaPrimaryLink}
              className="group relative w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 hover:scale-110 transform overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {slide.ctaPrimary}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a
              href={slide.ctaSecondaryLink}
              className="group w-full sm:w-auto px-10 py-5 bg-white/10 dark:bg-white/5 backdrop-blur-md text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/20 dark:hover:bg-white/10 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-110 transform"
            >
              {slide.ctaSecondary}
            </a>
          </div>
          </div>
        </div>
      </div>
  );
};

export default Hero;

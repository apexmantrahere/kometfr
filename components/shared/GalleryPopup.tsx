// components/GalleryPopup.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { X, CaretLeft, CaretRight } from "phosphor-react";

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
}

// Video player component for popup
function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => {
          console.error("Video playback failed:", err);
          setError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Get file extension to determine video type
  const getVideoType = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "mp4":
        return "video/mp4";
      case "mov":
        return "video/quicktime";
      case "avi":
        return "video/x-msvideo";
      case "webm":
        return "video/webm";
      case "ogg":
        return "video/ogg";
      default:
        return "video/mp4"; // default to mp4
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="w-full h-full md:rounded-[10px] object-contain md:object-cover"
        controls={isPlaying}
        onClick={!isPlaying ? togglePlay : undefined}
        onError={() => setError(true)}
      >
        <source src={src} type={getVideoType(src)} />
        Your browser does not support the video tag.
      </video>

      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <span className="text-white text-sm p-2 text-center">
            Video cannot be played
          </span>
        </div>
      ) : (
        !isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center  cursor-pointer"
            onClick={togglePlay}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1"></div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

interface GalleryPopupProps {
  mediaItems: MediaItem[];
  isOpen: boolean;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function GalleryPopup({
  mediaItems,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: GalleryPopupProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum distance for a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  // Keyboard navigation: Left/Right arrows for prev/next, Esc to close, Spacebar to prevent scrolling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === " ") { // Spacebar
        e.preventDefault(); // Prevent default spacebar scrolling behavior
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  if (!isOpen || mediaItems.length === 0) return null;

  const currentMedia = mediaItems[currentIndex];

  return (
    <div 
      className="custom-popup open"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close Button - positioned on screen overlay */}
      <span className="close-popup" onClick={onClose}><X /></span>

      {/* Navigation Buttons - positioned on screen overlay */}
      <button className="nav-button prev-button" onClick={onPrev}>
        <CaretLeft />
      </button>
      <button className="nav-button next-button" onClick={onNext}>
        <CaretRight />
      </button>

      <div className="popup-content">
        <div className="inner-popup-content">
          {/* Media Container (Image or Video) */}
          <div 
            className="media-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {currentMedia.type === 'image' ? (
              <img 
                src={currentMedia.src} 
                alt={currentMedia.alt || ''} 
                className="popup-image" 
                style={{ display: 'block' }}
              />
            ) : (
              <VideoPlayer src={currentMedia.src} />
            )}
          </div>
    
        </div>
      </div>

      <style jsx>{`
        /* Popup Overlay */
        .custom-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
    
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .inner-popup-content{
       
          overflow: hidden;
          text-align: center;
          position: relative;
        }
        
        /* Popup Content */
        .popup-content {
          max-width: 90%;
          max-height: 90%;
       
          overflow: hidden;
          text-align: center;
          position: relative;
        }

        /* Media Container */
        .media-container {
          position: relative;
          width: 100%;
          height: 650px;
          touch-action: pan-y;
          user-select: none;
          -webkit-user-select: none;
          -webkit-touch-callout: none;
        }

        .popup-image {
          width: 100%;
          height: 650px;
      
          margin: 0 auto;
          object-fit: cover;
          transition: transform 0.2s ease-out;
        }

        /* Close Button */
        .close-popup {
          position: fixed;
          top: 20px;
          right: 20px;
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 10px;
          color: #fff;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          border: 2px solid rgb(255, 255, 255);
        }

        /* Data Count */
        .data-count {
          font-size: 14px;
          color: #000;
          text-align: right;
          padding: 8px 0;
          border-radius: 20px;
          z-index: 1001;
          width: fit-content;
          margin-left: auto;
          padding: 5px 10px;
        }

        /* Navigation Buttons */
        .nav-button {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          font-size: 24px;
          cursor: pointer;
          padding: 10px;
          color: #fff;
       
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          
        }

       

        .prev-button {
          left: 20px;
        }

        .next-button {
          right: 20px;
        }

        /* Responsive Adjustments */
        @media (max-width: 800px) {
          .popup-content {
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;
            justify-content: center;
          }
      
          .inner-popup-content{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
          }
          
          /* Media Container */
          .media-container {
            width: 100%;
            height: auto;
            touch-action: pan-y;
            user-select: none;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
          }
      
          .popup-image {
            width: 100%;
            height: auto;
            max-height: 100vh;
            border-radius: 0;
            margin: 0;
            object-fit: contain;
          }

          /* Video specific mobile styles */
          .media-container video {
            width: 100% !important;
            height: auto !important;
            max-height: 100vh;
            object-fit: contain;
          }

          /* Mobile button adjustments */
          .close-popup {
            top: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
            font-size: 20px;
          }

          /* Hide navigation buttons on mobile */
          .nav-button {
            display: none;
          }

          /* Move data count to bottom right on mobile */
          .data-count {
            position: fixed;
            bottom: 20px;
            right: 20px;
           
            color: #000;
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1001;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
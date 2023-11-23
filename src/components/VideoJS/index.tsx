import { useEffect, useRef, useState } from "react";

import videoJs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';

import { Container } from "./styles";

function formatVideoDuration(durationInSeconds: number): string {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formatUnit = (unit: number): string => {
    return unit < 10 ? `0${unit}` : `${unit}`;
  };

  const formattedHours = formatUnit(hours);
  const formattedMinutes = formatUnit(minutes);
  const formattedSeconds = formatUnit(seconds);

  let timeTotal = '';

  if(formattedHours !== '00') {
    timeTotal = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  } else {
    timeTotal = `${formattedMinutes}:${formattedSeconds}`
  }
    
  return  timeTotal;
}

export const VideoJS = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [timeTotal, setTimeTotal] = useState('')

  useEffect(() => {
    const urlVideo = "https://customer-93b3xv02xt10uwwp.cloudflarestream.com/5b6e6459e52175a5987d5f7d7674ded2/manifest/video.m3u8"

    const videoJSOptions = {
      autoplay: 'muted',
      controls: true,
      normalizeAutoplay: true,
      width: 1280,
      height: 720,
      aspectRatio: '16:9',
      sources: [
        {
          src: urlVideo,
          type: 'application/x-mpegURL',
          label: 'HD'
        }
      ],
      userActions: { hotkeys: true },
      playbackRates: [0.5, 1, 1.5, 2, 3],
      controlBar: {
        qualitySelector: {
          default: 'HD',
          options: [
            {
              label: 'SD',
              value: urlVideo,
            }
          ]
        },
        skipButtons: {
          forward: 10,
          backward: 10
        }
      }
    };

    if (videoPlayerRef.current) {
      const player = videoJs(videoPlayerRef.current, videoJSOptions, () => {
        player.src(urlVideo);

        player.on('loadeddata', function() {
          if(videoPlayerRef.current) {
            const duration = formatVideoDuration(videoPlayerRef.current.duration)
            setTimeTotal(duration)
          }
         });
      });
    }

    return () => {};
  }, []);
  
  return(
    <Container timeTotal={timeTotal}>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js vjs-default-skin"
        controls
      />
    </Container>

  )
}
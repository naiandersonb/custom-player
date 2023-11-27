import { useEffect, useMemo, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vjsqs from "@silvermine/videojs-quality-selector";
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";

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
  // const urlVideo = "https://customer-93b3xv02xt10uwwp.cloudflarestream.com/5b6e6459e52175a5987d5f7d7674ded2/manifest/video.m3u8"

  // useEffect(() => {
  //   const videoJSOptions = {
  //     autoplay: false,
  //     controls: true,
  //     normalizeAutoplay: true,
  //     width: 1280,
  //     height: 720,
  //     aspectRatio: '16:9',
  //     sources: [
  //       {
  //         src: urlVideo,
  //         type: 'application/x-mpegURL',
  //         label: 'HD'
  //       }
  //     ],
  //     userActions: { hotkeys: true },
  //     playbackRates: [0.5, 1, 1.5, 2, 3],
  //     controlBar: {
  //       qualitySelector: {},
  //       skipButtons: {
  //         forward: 10,
  //         backward: 10
  //       }
  //     },
  //   };

  //   if (videoPlayerRef.current) {
  //     vjsqs(videoJs);
  //     const player = videoJs(videoPlayerRef.current, videoJSOptions, () => {
  //       player.src({
  //         src: urlVideo,
  //         type: 'application/x-mpegURL',
  //         withCredentials: false
  //       });

  //       player.on('loadeddata', function() {
  //         if(videoPlayerRef.current) {
  //           const duration = formatVideoDuration(videoPlayerRef.current.duration)
  //           setTimeTotal(duration)
  //         }
  //        });
  //     });
  //   }

  //   return () => {};
  // }, []);

  const videoJsOptions = useMemo(() => {
    return {
      autoplay: 'muted',
      aspectRatio: '16:9',
      playbackRates: [0.5, 1, 1.5, 2, 3],
      normalizeAutoplay: true,
      width: 1280,
      height: 720,
      controls: true,
      controlBar: {
        qualitySelector: {},
        skipButtons: {
          forward: 10,
          backward: 10
        }
      },
      sources: [
        {
          src:
            "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
          type: "application/x-mpegURL",
          label: "HDd",
          res: 720
        },
        {
          src: "https://customer-93b3xv02xt10uwwp.cloudflarestream.com/5b6e6459e52175a5987d5f7d7674ded2/manifest/video.m3u8",
          type: "application/x-mpegURL",
          label: "HD2",
          res: 720
        }
      ]
    }
  }, []);
  
  useEffect(() => {
    if(videoPlayerRef.current) {
      vjsqs(videoJs);
      const player = videoJs(videoPlayerRef.current, videoJsOptions, () => {
      
        player.on('loadeddata', function() {
          if(videoPlayerRef.current) {
            const duration = formatVideoDuration(videoPlayerRef.current.duration)
            setTimeTotal(duration)
          }
        });
      });
    }
    return () => {};
  }, [videoJsOptions]);
  
  return(
    <Container timetotal={timeTotal} maincolor='#1ee460'>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js vjs-default-skin"
        controls
      />
    </Container>
  )
}
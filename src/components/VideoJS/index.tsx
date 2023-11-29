// exemplo:
// https://codesandbox.io/p/sandbox/react-v2gkh?file=%2Fsrc%2FApp.js%3A50%2C4-52%2C7

// ---------------------------------------------------------------

import { useEffect, useMemo, useRef, useState } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vjsqs from "@silvermine/videojs-quality-selector";
import "@silvermine/videojs-quality-selector/dist/css/quality-selector.css";

import videoJs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';

import { Container } from "./styles";

function formatVideoDuration(durationInSeconds: number | undefined): string {
  if(durationInSeconds === undefined) return '';
  
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

  const videoJsOptions = useMemo(() => {
    return {
      autoplay: false,
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
          label: "1080p",
          selected: true,
          res: 1080
        },
        {
          src: "https://customer-93b3xv02xt10uwwp.cloudflarestream.com/5b6e6459e52175a5987d5f7d7674ded2/manifest/video.m3u8",
          type: "application/x-mpegURL",
          label: "720p",
          selected: false,
          res: 720
        }
      ]
    }
  }, []);

  useEffect(() => {
    if(videoPlayerRef.current) {
      vjsqs(videoJs);

      videoJs.addLanguage('en', {
        'Skip backward 10 seconds': 'Retroceder 10 segundos',
        'Skip forward 10 seconds': 'Avançar 10 segundos',
        'Open quality selector menu': 'Seletor de qualidade',
        'Playback Rate': 'Velocidade de reprodução',
        'Mute': 'Volume'
      });

      const player = videoJs(videoPlayerRef.current, videoJsOptions, () => {

        player.on('loadeddata', function() {
            const duration = ` / ${formatVideoDuration(player.duration())}`
            setTimeTotal(duration)
        });

        player.on("ended", () => {
          alert('video finalizado')
        });

        player.on("pause", () => {
          let currentTime = '0';
          if(videoPlayerRef.current) console.log('duration: ', videoPlayerRef.current.duration)
          currentTime = formatVideoDuration(player.currentTime())
          console.log('tempo atual:', { currentTime })
        });
      });
    }
  }, [videoJsOptions]);

  return(
    <Container timetotal={timeTotal} maincolor='#e4951e'>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js vjs-default-skin"
        controls
      />
    </Container>
  )
}
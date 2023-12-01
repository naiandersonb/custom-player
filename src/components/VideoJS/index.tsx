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
import { formatVideoDuration } from "../../utils";

export const VideoJS = () => {
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>()
  const [timeTotal, setTimeTotal] = useState('')

  // const captionOption = useMemo(() => {
  //   return {
  //     srclang: 'pt',
  //     label: 'Português',
  //     src: '/example.vtt',
  //   };
  // }, [])

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
        },
        {
          src:
            "https://vz-23fa8c41-cba.b-cdn.net/8be7d468-e067-4aea-8dfd-a38cd780ba78/playlist.m3u8",
          type: "application/x-mpegURL",
          label: "360p",
          selected: true,
          res: 360
        },
      ]
    };
  }, [])

  useEffect(() => {
    if(videoPlayerRef.current && !playerRef.current) {
      vjsqs(videoJs);

      videoJs.addLanguage('en', {
        'Reset': 'Resetar',
        'Color': 'Cor',
        'Opacity': 'Opacidade',
        'Text': 'Texto',
        'Font Size': 'Tamanho da fonte',
        'Font Family': 'Fonte',
        'Text Background': 'Plano de fundo do texto',
        'Caption Area Background': 'Fundo da área de legenda',
        'Text Edge Style': 'Plano de fundo do texto',
        'Done': 'Aplicar',
        'captions settings': 'Configurar legenda',
        'captions off': 'Desativar legenda',
        'Skip backward 10 seconds': 'Retroceder 10 segundos',
        'Skip forward 10 seconds': 'Avançar 10 segundos',
        'Open quality selector menu': 'Seletor de qualidade',
        'Playback Rate': 'Velocidade de reprodução',
        'Mute': 'Volume',
        'White': 'Branco',
      });
      

      const player = (playerRef.current = videoJs(videoPlayerRef.current, videoJsOptions, () => {
        player.on('loadeddata', function() {
            const duration = ` / ${formatVideoDuration(player.duration())}`
            setTimeTotal(duration)
        });

        // player.addRemoteTextTrack(captionOption, true);

        player.on("ended", () => {
          alert('video finalizado')
        });

        player.on("pause", () => {
          let currentTime = '0';
          if(videoPlayerRef.current) console.log('duration: ', videoPlayerRef.current.duration)
          currentTime = formatVideoDuration(player.currentTime())
          console.log('tempo atual:', { currentTime })
        });
      }))
    }
  }, [videoJsOptions]);


  return(
    <Container time={timeTotal} color='#1ee4d3'>
      <video
        style={{ width: "100%" }}
        ref={videoPlayerRef}
        className="video-js vjs-default-skin"
        controls
      />
    </Container>
  )
}
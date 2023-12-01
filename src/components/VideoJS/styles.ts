import styled from "styled-components";
import { arrow, grid, image, insideIcon, menuContent, size } from "./mixins";

interface VideoProps {
  time: string
  color: string
}

export const Container = styled.div<VideoProps>`
  max-width: 1280px;
  position: relative;

  .video-js {
    width: 100%;
    position: relative;
    
    // changes the style of all buttons in the layout
    /* .vjs-button {
      height: 40px;
    } */  

    // align the icons with the video time
    .vjs-time-control {
      line-height: 2.5;
      padding-right: 0;

      @media(max-width: 480px) {
        line-height: 1.8;
      }
    }
  }

  .vjs-big-play-button {
    background-color: ${({ color }) => color};
    ${size({height: '86px', width: '86px'})}
    border: none;
    border-radius: 50%;

    .vjs-icon-placeholder::before {
      border-radius: 50%;
      background-color: ${({ color }) => color};
      display: grid;
      place-items: center;
      font-size: 3rem;
    }

    @media(max-width: 480px) {
      ${size({height: '50px', width: '50px'})}
      
      left: 55%;
      top: 45%;

      .vjs-icon-placeholder::before {
        border-radius: 50%;
        
        background-color: ${({ color }) => color};
        display: grid;
        place-items: center;
        font-size: 1.5rem;
      }
    }
  }

  // control bar container
  .vjs-control-bar {
    ${size({height: '80px', width: '100%'})}

    padding-inline: 1rem;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3477766106442577) 100%);

    ${grid}

    @media(max-width: 480px) {
      height: 60px;
      padding-inline: 0;
    }
  }

  // ⚙ video speed selection menu
  .vjs-menu-button-popup {
    .vjs-menu-content {
      width: 250px;

      background-color: #000000;
      max-height: 16rem;
      border-radius: 5px;
      font-size: 0.75rem;
      bottom: 4.5rem;
      text-align: start;
      padding-top: 1rem;

      @media(max-width: 480px) {
        ${size({height: '100vh', width: '100%'})}

        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;

        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        background: #121212;
      }

      ::-webkit-scrollbar-thumb {
        background: #888;
      }
  
      .vjs-menu-item {
        position: relative;
        text-align: start;
        display: flex;
        justify-content: flex-start;
        padding: 0.4rem 2rem;
        font-size: 12px;

        &:hover {
          background-color: #000;
        }

        &.vjs-selected:before {
          content: ' ';

          ${size({height: '1rem', width: '1rem'})}

          background-image: url('/player/check.svg');
          background-repeat: no-repeat;
          background-size: 15px;

          position: absolute;
          left: 0.5rem;
        }

        &.vjs-selected, &.vjs-selected:hover {
          background-color: transparent;
          color: #fff;
        }

        &:nth-child(1) {
          margin-top: 25px;
        }
      }
    } 
  }

  // 💠
  .vjs-quality-selector {
    grid-area: quality;
    position: relative;

    ${image({ img: '/player/quality-selector.svg', size: '26px' })}

    @media(max-width: 480px) {
      background-size: 20px;
    }

    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }

    @media(min-width: 480px) {
      & > .vjs-menu > .vjs-menu-content {
        position: absolute;
        z-index: 10;
        right: 2rem;
      }

      & > .vjs-menu:after {
        ${arrow({right: '2.8rem'})}
      }
    }
    
    & > .vjs-menu > .vjs-menu-content:before {
      ${menuContent({ title: 'Qualidade de reprodução' })}
    }
  }

  // 📜 legends / captions
  .vjs-subs-caps-button {
    grid-area: subsCaps;
    position: relative;

    ${image({ img: '/player/caption.svg', size: '26px' })}

    @media(max-width: 480px) {
      background-size: 20px;
    }

    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }

    @media(min-width: 480px) {
      & > .vjs-menu > .vjs-menu-content {
        position: absolute;
        z-index: 10;
        right: 2rem;
      }

      & > .vjs-menu:after {
        ${arrow({right: '2.8rem'})}
      }
    }
    
   
    & > .vjs-menu > .vjs-menu-content:before {
      ${menuContent({ title: 'Configurar legenda' })}
    }
  }

  // subtitles configuration modal
  .vjs-text-track-settings {
    .vjs-modal-dialog-content {
      & select {
        border-radius: 5px;
        padding: 0.5rem;
      }

      .vjs-default-button, .vjs-done-button {
        padding: 0.5rem;
      }

      @media(max-width: 480px) {
        .vjs-text-track-settings {
          height: 100%;
        }
      }
    }

    @media(max-width: 480px) {
        height: 100%;
    }
  }

  // full progress bar
  .vjs-progress-control {
    grid-area: progress;

    place-items: start;
    border-radius: 10px;
    width: 100%;

    .vjs-progress-holder, .vjs-slider-bar {
      height: 6px;
      border-radius: 10px;
      background-color: (255, 255, 255, 0.50);
      color: ${({ color }) => color};

      @media(max-width: 480px) {
        height: 4px;
      }
    }
  }

  // progress video
  .vjs-play-progress {
    background-color: ${({ color }) => color};
  }

  .vjs-play-progress:before {
    color: ${({ color }) => color};
    font-size: 1.2em;
    position: absolute;
    top: 0.8px;
    right: -0.5em;
    line-height: 0.35em;
    z-index: 1;

    @media(max-width: 480px) {
      top: 0.5px;
      font-size: 1em;
    }
  }

  // ⏮
  .vjs-skip-backward-10 {
    grid-area: backward;

    ${image({ img: '/player/backward.svg', size: '28px' })}

    @media(max-width: 480px) {
      background-size: 22px;
    }

    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }
  }

  // ⏭
  .vjs-skip-forward-10 {
    grid-area: forward;

    ${image({ img: '/player/forward.svg', size: '30px' })}

    @media(max-width: 480px) {
      background-size: 22px;
    }

    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }
  }

  // ⏯
  .vjs-play-control {
    grid-area: play;

    ${image({ img: '/player/play.svg', size: '24px' })}

    &.vjs-paused {
      background-image: url('/player/play.svg');
    }

    &.vjs-playing {
      background-image: url('/player/pause.svg');
    }

    @media(max-width: 480px) {
      background-size: 20px;
    }
    
    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }
  }

  // 🎴
  .vjs-picture-in-picture-control {
    grid-area: pictureInPicture;
    margin-top: 1px;

    ${image({ img: '/player/picture-in-picture.svg', size: '28px' })}

    @media(max-width: 480px) {
      background-size: 22px;
    }

    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }
  }

  // 📺
  .vjs-fullscreen-control {
    grid-area: fullscreen;

    ${image({ img: '/player/fullscreen.svg', size: '20px' })}

    @media(max-width: 480px) {
      background-size: 15px;
      margin-top: 1px;
    }

    .vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }
  }

  .vjs-playback-rate-value {
    display: none;
  }

  // 🕣
  .vjs-playback-rate {
    grid-area: playback;
    position: relative;
    padding: 0;

    ${image({ img: '/player/fast-forward.svg', size: '26px' })}

    @media(max-width: 480px) {
      background-size: 20px;
      width: 25px;
    }

    &.vjs-icon-placeholder:before {
      ${insideIcon}
      /* content: "";
      display: none; */
    }

    @media(min-width: 480px) {
      & > .vjs-menu > .vjs-menu-content {
        position: absolute;
        z-index: 10;
        right: 0;
      }
  
      & > .vjs-menu:after {
        ${arrow({ right: '0.8rem' })}
      }
    }


    & > .vjs-menu > .vjs-menu-content:before {
      ${menuContent({ title: 'Velocidade de reprodução' })}
    }
  }

  // video time
  .vjs-remaining-time {
    grid-area: time;
    font-size: 0.875rem;
    margin-bottom: 4px;

    @media(min-width: 480px) {
      font-size: 1rem;

      .vjs-remaining-time-display:after {
        content: ${({ time }) => `'${time}'`};
        color: #ced4da;
      }
    }
  }

  // video volume
  .vjs-volume-panel {
    grid-area: volume;

    .vjs-slider, .vjs-volume-level {
      border-radius: 30px;
    }

    .vjs-volume-level {
      background-color: ${({ color }) => color};

      &:before {
        color: ${({ color }) => color };
      }
    }

    @media(min-width: 480px) {
      width: 10em;
      font-size: 13px;

      .vjs-volume-horizontal {
        width: 5em;
        opacity: 1;
      }
    }

    @media(max-width: 480px) {
      .vjs-icon-placeholder:before {
        line-height: 1.4;
      }
    }
  }
`
import styled from "styled-components";

interface VideoProps {
  timetotal: string
  maincolor: string
}

export const Container = styled.div<VideoProps>`
  max-width: 1280px;
  position: relative;

  .video-js {
    width: 100%;
    position: relative;

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
    background-color: ${({ maincolor }) => maincolor};
    width: 86px;
    height: 86px;
    border: none;
    border-radius: 50%;

    .vjs-icon-placeholder::before {
      border-radius: 50%;
      background-color: ${({ maincolor }) => maincolor};
      display: grid;
      place-items: center;
      font-size: 3rem;
    }

    @media(max-width: 480px) {
      width: 50px;
      height: 50px;
      left: 55%;
      top: 45%;

      .vjs-icon-placeholder::before {
        border-radius: 50%;
        
        background-color: ${({ maincolor }) => maincolor};
        display: grid;
        place-items: center;
        font-size: 1.5rem;
      }
    }
  }

  // control bar container
  .vjs-control-bar {
    width: 100%;
    height: 80px;

    padding-inline: 1rem;
    background-color: transparent;

    background: rgb(0,0,0);
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3477766106442577) 100%);

    display: grid;
    grid-template-columns: max-content max-content max-content 1fr max-content max-content max-content;

    grid-template-areas: 
      'progress progress progress progress progress progress progress progress progress progress'
      'backward play forward . time volume pictureInPicture quality playback fullscreen';

    @media(max-width: 480px) {
      height: 60px;
      padding-inline: 0;
    }
  }

  // video speed selection menu
  .vjs-menu-button-popup {
    .vjs-menu-content {
      background-color: #000000;
      width: 250px;
      max-height: 16rem;
      border-radius: 5px;
      font-size: 0.75rem;
      bottom: 4.5rem;
      text-align: start;
      padding-top: 1rem;

      @media(max-width: 480px) {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        height: 100vh;
        width: 100%;
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
          width: 1rem;
          height: 1rem;
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

  // ⚙
  .vjs-quality-selector {
    grid-area: quality;
    position: relative;

    background-image: url('/player/quality-selector.svg');
    background-repeat: no-repeat;
    background-size: 26px;
    background-position: 50% calc(50% - 10px);

    @media(max-width: 480px) {
      background-size: 20px;
    }

    .vjs-icon-placeholder:before {
      content: "";
      display: none;
    }

    @media(min-width: 480px) {
      & > .vjs-menu > .vjs-menu-content {
        position: absolute;
        z-index: 10;
        right: 2rem;
      }

      & > .vjs-menu:after {
        content: '';
        width: 14px;
        height: 14px;
        background-color: red;
        background-color: #000000;
        position: absolute;
        bottom: 4.2rem;
        right: 2.8rem;
        z-index: 10;
        transform: rotate(45deg);
      }
    }
    
   
    & > .vjs-menu > .vjs-menu-content:before {
      height: 24px;
      padding: 0 1rem 0 0;
      content: 'Qualidade de reprodução';
      border-bottom: 1px solid #E3E5E833;
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      text-align: start;
      justify-content: flex-start;
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
      color: ${({ maincolor }) => maincolor};

      @media(max-width: 480px) {
        height: 4px;
      }
    }
  }

  // progress video
  .vjs-play-progress {
    background-color: ${({ maincolor }) => maincolor};
  }

  .vjs-play-progress:before {
    color: ${({ maincolor }) => maincolor};
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

  .vjs-skip-backward-10 {
    grid-area: backward;

    background-image: url('/player/backward.svg');
    background-repeat: no-repeat;
    background-size: 26px;
    background-position: 50% calc(50% - 10px);

    @media(max-width: 480px) {
      background-size: 20px;
    }

    .vjs-icon-placeholder:before {
      content: "";
      display: none;
    }
  }

  .vjs-skip-forward-10 {
    grid-area: forward;

    background-image: url('/player/forward.svg');
    background-repeat: no-repeat;
    background-size: 26px;
    background-position: 50% calc(50% - 10px);

    @media(max-width: 480px) {
      background-size: 20px;
    }

    .vjs-icon-placeholder:before {
      content: "";
      display: none;
    }
  }

  // Play pause icons
  .vjs-play-control {
    grid-area: play;
    background-image: url('/player/play.svg');

    &.vjs-paused {
      background-image: url('/player/play.svg');
    }

    &.vjs-playing {
      background-image: url('/player/pause.svg');
    }

    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 50% calc(50% - 10px);

    @media(max-width: 480px) {
      background-size: 20px;
    }
    
    .vjs-icon-placeholder:before {
      content: "";
      display: none;
    }
  }

  // picture in picture icon
  .vjs-picture-in-picture-control {
    grid-area: pictureInPicture;
    margin-left: -9px;
    margin-top: 1px;

    background-image: url('/player/picture-in-picture.svg');
    background-repeat: no-repeat;
    background-size: 28px;
    background-position: 50% calc(50% - 10px);

    @media(max-width: 480px) {
      background-size: 22px;
    }

    .vjs-icon-placeholder:before {
      content: "";
      display: none;
    }
  }

  // fullscreen icon
  .vjs-fullscreen-control {
    grid-area: fullscreen;

    background-image: url('/player/fullscreen.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 50% calc(50% - 12px);

    @media(max-width: 480px) {
      background-size: 15px;
      margin-top: 1px;
    }

    .vjs-icon-placeholder:before {
      content: "";
      display: none;
    }
  }

  .vjs-playback-rate-value {
    display: none;
  }

  .vjs-playback-rate {
    grid-area: playback;
    position: relative;
    padding: 0;

    background-image: url('/player/fast-forward.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 50% calc(50% - 10px);

    @media(max-width: 480px) {
      background-size: 18px;
      width: 25px;
    }

    &.vjs-icon-placeholder:before {
      content: "";
      display: none;
    }

    @media(min-width: 480px) {
      & > .vjs-menu > .vjs-menu-content {
        position: absolute;
        z-index: 10;
        right: 0;
      }
  
      & > .vjs-menu:after {
        content: '';
        width: 14px;
        height: 14px;
        background-color: red;
        background-color: #000000;
        position: absolute;
        bottom: 4.2rem;
        right: 0.8rem;
        z-index: 10;
        transform: rotate(45deg);
      }
    }


    & > .vjs-menu > .vjs-menu-content:before {
      height: 24px;
      padding: 0 1rem 0 0;
      content: 'Velocidade de reprodução';
      border-bottom: 1px solid #E3E5E833;
      position: absolute;
      left: 0.5rem;
      right: 0.5rem;
      text-align: start;
      justify-content: flex-start;
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
        content: ${({ timetotal }) => `'${timetotal}'`};
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
      background-color: ${({ maincolor }) => maincolor};

      &:before {
        color: ${({ maincolor }) => maincolor };
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
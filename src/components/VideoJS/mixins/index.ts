import { css } from "styled-components";

export const size = ({height = 'initial', width =  'initial'}) => css`
  width: ${width};
  height: ${height};
`

export const grid = css`
  display: grid;
  grid-template-columns: max-content max-content max-content 1fr max-content max-content max-content ;

  grid-template-areas: 
    'progress progress progress progress progress progress progress progress progress progress'
    'backward play forward . time volume quality playback pictureInPicture fullscreen';
`

export const arrow = ({ right }: {right: string}) =>css`
  content: '';

  width: 14px;
  height: 14px;
  
  background-color: #000000;
  position: absolute;
  bottom: 4.2rem;
  right: ${right};
  z-index: 10;
  transform: rotate(45deg);
`

export const menuContent = ({ title = '' }) => css`
  height: 24px;
  padding: 0 1rem 0 0;
  content: ${`'${title}'`};
  border-bottom: 1px solid #E3E5E833;
  position: absolute;
  left: 0.5rem;
  right: 0.5rem;
  text-align: start;
  justify-content: flex-start;
`

export const image = ({ size, img }: { img: string, size: string }) => css`
  background-image: ${`url(${img})`};
  background-repeat: no-repeat;
  background-size: ${size};
  background-position: 50% calc(50% - 10px);
`

export const insideIcon = css`
  content: "";
  display: none;
`
import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

function AdsVideoUploader(props:any) {
  const videoId = props.videoId;
  // const { t } = useTranslation();
  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  const opts: YouTubeProps['opts'] = {
    height: '300px',
    width: '100%',
    // height:props.height,
    // width:props.width,

    
    playerVars: {
        videoId: videoId,
        autoplay: 1,
        controls: 0,
         disablekb: 1
    }
};
  return(
    <div style={{borderRadius:"8px"}}>
    <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />
    </div>
  );
}

export default AdsVideoUploader;

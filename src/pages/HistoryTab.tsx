import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import React, { useEffect } from 'react';
import moment from 'moment'
import { useHistory } from 'react-router';
import YouTubePlayer from 'youtube-player';

const HistoryTab: React.FC<{ history: any[] }> = ({ history }) => {
    const hist = useHistory()

    useEffect(() => {
        const YTPlayer = require('yt-player')
        const player = new YTPlayer('#player', {
            autoplay: true,
        })
        player.load('Wk1oClYJE58')
        player.on('paused', () => {
            player.play()
        })
        // const player = YouTubePlayer('video-player');
        // player.loadVideoById('Wk1oClYJE58');
        // player.playVideo();
        // player.on('stateChange', e => {
        //     console.log(e.data)
        //     e.target.playVideo()
        // })
    }, [])

    const playHistory = (link) => {
        hist.replace({
            pathname: '/listen',
            search: '?link=' + link
        })
    }


    // const onPauseYT = event => {
    //     console.log(event)
    //     // event.target.playVideo()
    // }

    // const onReady = event => {
    //     event.target.playVideo()
    //     document.addEventListener('visibilitychange', () => {
    //         event.target.playVideo()
    //         console.log(document.hidden)
            
    //     })
    //     console.log(event.target)
    // }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>History</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">History</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div id='player'></div>
                {/* <YouTube id='yt-player' videoId='Wk1oClYJE58' opts={opts} onReady={onReady} onStateChange={onPauseYT}/> */}
                {history.map((item, index) => (
                    <IonItem onClick={() => playHistory(item.link)} key={index}>
                        <IonThumbnail slot="start">
                            <img src={item['thumbnail_url']} alt='thumbnail' />
                        </IonThumbnail>
                        <IonLabel>
                            <h3>{item['title']}</h3>
                            <p>{item['author_name']}</p>
                            <p>{moment(item['timestamp']).fromNow()}</p>
                        </IonLabel>
                    </IonItem>
                ))}

            </IonContent>
        </IonPage>
    );
};

export default HistoryTab;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import React from 'react';
import moment from 'moment'
import { useHistory } from 'react-router';
import YouTube, { Options } from 'react-youtube';

const HistoryTab: React.FC<{ history: any[] }> = ({ history }) => {
    const hist = useHistory()

    const playHistory = (link) => {
        hist.replace({
            pathname: '/listen',
            search: '?link=' + link
        })
    }

    const onPauseYT = event => {
        console.log(event)
        // event.target.playVideo()
    }

    const onReady = event => {
        event.target.playVideo()
        document.addEventListener('visibilitychange', () => {
            event.target.playVideo()
            console.log(document.hidden)
            
        })
        console.log(event.target)
    }


    const opts: Options = {
      height: '390',
      width: '640',
    };
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
                <YouTube id='yt-player' videoId='Wk1oClYJE58' opts={opts} onReady={onReady} onStateChange={onPauseYT}/>
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

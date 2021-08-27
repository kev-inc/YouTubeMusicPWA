import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import cheerio from 'cheerio'
import './Tab1.css';

const Tab1: React.FC = (props) => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const link = params.get('link') || ''
    const [videoId, setVideoId] = useState(link)
    const [audioSrc, setAudioSrc] = useState('')
    const [videoMetadata, setVideoMetadata] = useState({})


    const retrieveMp3 = () => {
        setAudioSrc('')
        const youtube = require('youtube-metadata-from-url');
        youtube.metadata(videoId).then(json => {
            setVideoMetadata(json)
        })
        const id = videoId.split('/')[3]
        fetch("https://www.yt-download.org/api/button/mp3/" + id)
            .then(resp => resp.text())
            .then(resp => {
                const $ = cheerio.load(resp)
                const links = $('div.download')
                setAudioSrc(links.children().get(3).attribs.href)
            })
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>YouTube Music</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-text-center" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel position="stacked">YouTube Link</IonLabel>
                    <IonInput value={videoId} placeholder="Enter YouTube Link" onIonChange={e => setVideoId(e.detail.value!)}></IonInput>

                </IonItem>
                <IonButton expand="block" onClick={retrieveMp3}>Play!</IonButton>

                <img src={videoMetadata['thumbnail_url']} width={videoMetadata['thumbnail_width']} alt='thumbnail'/>
                <h3>{videoMetadata['title']}</h3>
                {audioSrc.length > 0 && (
                    <audio controls autoPlay>
                        <source type="audio/mpeg" src={audioSrc} />
                    </audio>
                )}
            </IonContent>
        </IonPage>
    );

};

export default Tab1;

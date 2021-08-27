import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = (props) => {
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const link = params.get('link') || ''
    const [videoId, setVideoId] = useState(link)
    const [audioSrc, setAudioSrc] = useState('')
    const [videoMetadata, setVideoMetadata] = useState({})

    useEffect(() => {
        if (videoId.length > 0) {
            retrieveMp3()
        }
    }, [videoId])


    const retrieveMp3 = () => {
        setAudioSrc('')
        const youtube = require('youtube-metadata-from-url');
        youtube.metadata(videoId).then(json => {
            setVideoMetadata(json)
        })
        const id = videoId.split('/')[3]
        fetch("https://py-youtube-dl.vercel.app/api?id=" + id)
            .then(resp => resp.json())
            .then(json => setAudioSrc(json['link']))
    }

    const onPlay = () => {
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
                        <IonTitle size="large">YouTube Music</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {audioSrc.length > 0 ? (
                    <div>
                        <img src={videoMetadata['thumbnail_url']} width={videoMetadata['thumbnail_width']} alt='thumbnail' />
                        <h3>{videoMetadata['title']}</h3>
                        <audio controls autoPlay src={audioSrc} onPlay={onPlay} />
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </IonContent>
        </IonPage>
    );

};

export default Tab1;

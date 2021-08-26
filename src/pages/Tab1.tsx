import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonButton } from '@ionic/react';
import cheerio from 'cheerio'
import './Tab1.css';

interface Tab1Props { }
interface Tab1State {
    videoId: string,
    audioSrc: string
}
const Tab1: React.FC = () => {
    const [videoId, setVideoId] = useState('fYvo4oZacbY')
    const [audioSrc, setAudioSrc] = useState('')

    useEffect(() => {
        retrieveMp3()
    }, [])

    const retrieveMp3 = () => {
        setAudioSrc('')
        fetch("https://www.yt-download.org/api/button/mp3/" + videoId)
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
            <IonContent  class="ion-text-center" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel position="stacked">YouTube Link</IonLabel>
                    <IonInput value={videoId} placeholder="Enter YouTube Link" onIonChange={e => setVideoId(e.detail.value!)}></IonInput>

                </IonItem><IonButton expand="block" onClick={retrieveMp3}>Play!</IonButton>

                {audioSrc.length > 0 && (

                    <audio controls>
                        <source type="audio/mpeg" src={audioSrc} />
                    </audio>
                )}
            </IonContent>
        </IonPage>
    );

};

export default Tab1;

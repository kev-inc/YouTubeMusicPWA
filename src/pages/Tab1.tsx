import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRange, IonLabel, IonFooter } from '@ionic/react';
import { play, pause, playForward, playBack } from 'ionicons/icons';

import './Tab1.css';

const Tab1: React.FC<{ videoLink: string }> = ({ videoLink }) => {
    // const [videoId] = useState(link)
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const link = params.get('link') || videoLink
    const [audioSrc, setAudioSrc] = useState('')
    const [videoMetadata, setVideoMetadata] = useState({})
    const [audio, setAudio] = useState(new Audio())
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [duration, setDuration] = useState(0)

    var positionUpdater

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))

    useEffect(() => {

        const retrieveMp3 = () => {
            setAudioSrc('')
            const youtube = require('youtube-metadata-from-url');
            youtube.metadata(link).then(json => {
                setVideoMetadata(json)
            })
            const id = link.split('/')[3]
            fetch("https://py-youtube-dl.vercel.app/api?id=" + id)
                .then(resp => resp.json())
                .then(json => {
                    const newAudio = new Audio(json['link'])
                    setAudioSrc(json['link'])
                    setAudio(newAudio)
                })
        }
        if (link.length > 0) {
            retrieveMp3()
        }
    }, [videoLink, link])

    const playSong = () => {
        setIsPlaying(true)
        audio.play()
        positionUpdater = setInterval(() => setCurrentDuration(audio.currentTime), 1000)
    }

    const pauseSong = () => {
        setIsPlaying(false)
        audio.pause()
        clearInterval(positionUpdater)
    }

    const forwardSong = () => {
        audio.currentTime += 10
        setCurrentDuration(audio.currentTime)
    }

    const backwardSong = () => {
        audio.currentTime -= 10
        setCurrentDuration(audio.currentTime)
    }

    const seekSong = (e) => {
        const position = e.detail.value
        if (Math.abs(position - audio.currentTime) > 1.5) {
            audio.currentTime = position
        }
    }

    const convertToTime = (time) => {
        return Math.floor(time / 60) + ":" + Math.round(time % 60).toString().padStart(2, '0')
    }


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Now Playing</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-text-center" fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Now Playing</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {'thumbnail_url' in videoMetadata && (
                    <img src={videoMetadata['thumbnail_url']} width={videoMetadata['thumbnail_width']} alt='thumbnail' />
                )}
                
            </IonContent>

            <IonFooter class="ion-text-center ion-padding">
                <h3>{videoMetadata['title']}</h3>
                <IonRange value={audio.currentTime} max={duration} onIonChange={seekSong}>
                    <IonLabel slot="start">{convertToTime(currentDuration)}</IonLabel>
                    <IonLabel slot="end">{convertToTime(duration)}</IonLabel>
                </IonRange>
                <IonButton onClick={backwardSong} fill="clear" disabled={duration === 0}><IonIcon slot="icon-only" icon={playBack} /></IonButton>
                {isPlaying ? (
                    <IonButton onClick={pauseSong} size="large" fill="clear" disabled={duration === 0}><IonIcon slot="icon-only" icon={pause} /></IonButton>
                ) : (
                        <IonButton onClick={playSong} size="large" fill="clear" disabled={duration === 0}><IonIcon slot="icon-only" icon={play} /></IonButton>
                    )}
                <IonButton onClick={forwardSong} fill="clear" disabled={duration === 0}><IonIcon slot="icon-only" icon={playForward} /></IonButton>                
            </IonFooter>
        </IonPage>
    );

};

export default Tab1;

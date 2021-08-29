/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRange, IonLabel, IonFooter } from '@ionic/react';
import { play, pause, playForward, playBack } from 'ionicons/icons';

const Tab1: React.FC<{ videoLink: string, addToHistory: (json: {}, videoId: string, link: string) => void }> = ({ videoLink, addToHistory }) => {
    const [videoMetadata, setVideoMetadata] = useState({})
    const [audio] = useState(new Audio())
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [duration, setDuration] = useState(0)

    // var positionUpdater

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('loadeddata', () => playSong())
    audio.addEventListener('play', () => setIsPlaying(true))
    audio.addEventListener('pause', () => setIsPlaying(false))
    useEffect(() => {
        setInterval(() => setCurrentDuration(audio.currentTime), 1000)
    },[])

    useEffect(() => {
        const retrieveMp3 = () => {

            const youtube = require('youtube-metadata-from-url');
            youtube.metadata(videoLink).then(json => {
                setVideoMetadata(json)
                addToHistory(json, id, videoLink)
            })
            const id = videoLink.split('/')[3]
            fetch("https://py-youtube-dl.vercel.app/api?id=" + id)
                .then(resp => resp.json())
                .then(json => {
                    audio.src = json['link']
                })
        }
        if (videoLink.length > 0) {
            pauseSong()
            audio.currentTime = 0
            setCurrentDuration(0)
            setDuration(0)
            retrieveMp3()
        }
    }, [videoLink])

    const playSong = () => {
        audio.play()
    } 

    const pauseSong = () => {
        audio.pause()
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
                <IonRange value={currentDuration} min={0} max={duration} onIonChange={seekSong} disabled={duration === 0}>
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

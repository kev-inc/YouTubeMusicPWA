/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonRange, IonLabel, IonFooter } from '@ionic/react';
import { play, pause, playForward, playBack } from 'ionicons/icons';

const Tab1: React.FC<{ 
    videoLink: string, 
    history: any[],
    addToHistory: (item: {}) => void 
}> = ({ videoLink, history, addToHistory }) => {

    const [videoMetadata, setVideoMetadata] = useState({})
    const [audio] = useState(new Audio())
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentDuration, setCurrentDuration] = useState(0)
    const [duration, setDuration] = useState(0)

    // audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    // audio.addEventListener('loadeddata', () => playSong())
    // audio.addEventListener('play', () => setIsPlaying(true))
    // audio.addEventListener('pause', () => setIsPlaying(false))
    audio.oncanplay = () => {
        setDuration(audio.duration)
        playSong()
    }
    audio.onplay = () => setIsPlaying(true)
    audio.onpause = () => setIsPlaying(false)
    
    useEffect(() => {
        audio.play()
        setInterval(() => setCurrentDuration(audio.currentTime), 1000)
    },[])

    useEffect(() => {
        const retrieveMp3 = () => {
            const id = videoLink.split('/')[3]
            const videoIndex = history.findIndex(hist => hist.id === id)
            if (videoIndex === -1) {
                const youtube = require('youtube-metadata-from-url');
                youtube.metadata(videoLink).then(json => {
                    setVideoMetadata(json)
                    fetch("https://py-youtube-dl.vercel.app/api?id=" + id)
                        .then(resp => resp.json())
                        .then(resp => {
                            audio.src = resp['link']
                            addToHistory({
                                id: id,
                                title: json.title,
                                author_name: json.author_name,
                                thumbnail_url: json.thumbnail_url,
                                link: videoLink,
                                audioSrc: resp['link'],
                                timestamp: new Date()
                            })
                        })
                })
                
            } else {
                setVideoMetadata(history[videoIndex])
                audio.src = history[videoIndex]['audioSrc']
                addToHistory(history[videoIndex])
            }
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
                <p>{videoMetadata['author_name']}</p>                
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

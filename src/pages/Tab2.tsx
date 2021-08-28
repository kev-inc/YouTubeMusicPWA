import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import './Tab2.css';

const Tab2: React.FC = () => {
    const [videoId, setVideoId] = useState('')
    const history = useHistory()

    const toPlayer = () => {
        history.replace("/temp")
        history.replace("/tab1?link=" + videoId)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Search</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem>
                    <IonLabel position="stacked">YouTube Link</IonLabel>
                    <IonInput value={videoId} placeholder="Enter YouTube Link" onIonChange={e => setVideoId(e.detail.value!)}></IonInput>
                </IonItem>
                <IonButton expand="block" onClick={toPlayer}>Play!</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;

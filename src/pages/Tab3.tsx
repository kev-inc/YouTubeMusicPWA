import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonThumbnail, IonLabel } from '@ionic/react';
import React from 'react';
import moment from 'moment'
import { useHistory } from 'react-router';

const Tab3: React.FC<{ history: any[] }> = ({ history }) => {
    const hist = useHistory()
    
    const playHistory = (link) => {
        hist.replace({
            pathname: '/listen',
            search: '?link=' + link
        })
    }
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
                {history.map((item, index) => (
                    <IonItem onClick={() => playHistory(item.link)} key={index}>
                        <IonThumbnail slot="start">
                            <img src={item['thumbnail']} alt='thumbnail' />
                        </IonThumbnail>
                        <IonLabel>
                            <h3>{item['title']}</h3>
                            <p>{item['author']}</p>
                            <p>{moment(item['timestamp']).fromNow()}</p></IonLabel>
                    </IonItem>
                ))}

            </IonContent>
        </IonPage>
    );
};

export default Tab3;

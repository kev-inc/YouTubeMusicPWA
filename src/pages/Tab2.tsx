/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSpinner, IonThumbnail } from '@ionic/react';

const Tab2: React.FC<{ searchResults: any[], setSearchResults: (result: any) => void }> = ({ searchResults, setSearchResults }) => {
    const history = useHistory()
    const [query, setQuery] = useState('')
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (searchResults.length === 0) {
            setIsSearching(true)
            fetch("https://py-youtube-dl.vercel.app/api/search?query=music")
                .then(resp => resp.json())
                .then(data => {
                    setSearchResults(data['result'])
                    setIsSearching(false)
                })
        }

    }, [])

    const toPlayer = (link) => {
        history.replace({
            pathname: '/listen',
            search: '?link=https://youtu.be/' + link
        })
    }

    const search = (e) => {
        setSearchResults([])
        setIsSearching(true)
        e.preventDefault()
        fetch("https://py-youtube-dl.vercel.app/api/search?query=" + query)
            .then(resp => resp.json())
            .then(data => {
                setSearchResults(data['result'])
                setIsSearching(false)
            })
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
                    <form onSubmit={search}>
                        <IonInput value={query} placeholder="Search YouTube" onIonChange={e => setQuery(e.detail.value!)}></IonInput>
                    </form>
                </IonItem>
                {searchResults.length > 0 && searchResults.map((item, index) => (
                    <IonItem onClick={() => toPlayer(item['id'])} key={index}>
                        <IonThumbnail slot="start">
                            <img src={item['thumbnails'][0]['url']} alt='thumbnail' />
                        </IonThumbnail>
                        <IonLabel>
                            <h3>{item['title']}</h3>
                            <p>{item['channel']['name']}</p>
                            <p>{item['duration']} • {item['publishedTime']}</p>
                        </IonLabel>
                    </IonItem>
                ))}
                {isSearching && <div className="ion-text-center ion-padding"><IonSpinner /></div>}
            </IonContent>
        </IonPage>
    );
};

export default Tab2;

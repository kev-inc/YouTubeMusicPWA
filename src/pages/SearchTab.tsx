/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonSpinner, IonThumbnail } from '@ionic/react';

const SearchTab: React.FC<{
    searchQuery: string, 
    setSearchQuery: (result: any) => void, 
    searchResults: any[], 
    setSearchResults: (result: any) => void 
}> = ({ searchQuery, setSearchQuery, searchResults, setSearchResults }) => {
    const history = useHistory()
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (searchResults.length === 0) {
            setIsSearching(true)
            fetch(process.env.REACT_APP_YT_API + "/trending")
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
        const stripped = searchQuery.replace('https://youtu.be/', '')
        setSearchResults([])
        setIsSearching(true)
        e.preventDefault()
        fetch(process.env.REACT_APP_YT_API + "/search?query=" + stripped)
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

                <form onSubmit={search}>
                    <IonItem>
                        <IonInput value={searchQuery} placeholder="Search YouTube (or enter https://youtu.be/<id> link)" onIonChange={e => setSearchQuery(e.detail.value!)} clearInput></IonInput>
                    </IonItem>
                </form>

                {searchResults.length > 0 && searchResults.map((item, index) => (
                    <IonItem onClick={() => toPlayer(item['id'])} key={index}>
                        <IonThumbnail slot="start">
                            <img src={item['thumbnails'][0]['url']} alt='thumbnail' />
                        </IonThumbnail>
                        <IonLabel>
                            <h3>{item['title']}</h3>
                            <p>{item['channel']['name']}</p>
                            <p>{item['duration']}</p>
                        </IonLabel>
                    </IonItem>
                ))}
                {isSearching && <div className="ion-text-center ion-padding"><IonSpinner /></div>}
            </IonContent>
        </IonPage>
    );
};

export default SearchTab;

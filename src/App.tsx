import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { play, search, list } from 'ionicons/icons';
import NowPlayingTab from './pages/NowPlayingTab';
import SearchTab from './pages/SearchTab';
import HistoryTab from './pages/HistoryTab';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React, { useState, useEffect } from 'react';
import ListenerPage from './pages/Listener';

const App: React.FC = () => {

    const [videoLink, setVideoLink] = useState('')
    const [history, setHistory] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])
    

    useEffect(() => {
        var list = JSON.parse(localStorage.getItem("history"))
        if (!list) {
            list = []
        }
        setHistory(list)
    }, [])

    const playSong = (link) => {
        setVideoLink(link)
    }

    const addToHistory = (item) => {
        var list = JSON.parse(localStorage.getItem('history'))
        if (!list) {
            list = []
        }
        list = list.filter(obj => obj.id !== item.id)
        list.unshift(item)
        localStorage.setItem('history', JSON.stringify(list))
        setHistory(list)
    }


    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/nowplaying">
                            <NowPlayingTab videoLink={videoLink} history={history} addToHistory={addToHistory} />
                        </Route>
                        <Route exact path="/search">
                            <SearchTab searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResults={searchResults} setSearchResults={setSearchResults}/>
                        </Route>
                        <Route path="/history">
                            <HistoryTab history={history}/>
                        </Route>
                        <Route path="/listen">
                            <ListenerPage playSong={playSong}/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/search" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/nowplaying">
                            <IonIcon icon={play} />
                            <IonLabel>Now Playing</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/search">
                            <IonIcon icon={search} />
                            <IonLabel>Search</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/history">
                            <IonIcon icon={list} />
                            <IonLabel>History</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;

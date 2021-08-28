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
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

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

    const addToHistory = (json, videoId, link) => {
        var list = JSON.parse(localStorage.getItem('history'))
        if (!list) {
            list = []
        }
        list = list.filter(obj => obj.id !== videoId)
        list.unshift({timestamp: new Date(), link: link, id: videoId, thumbnail: json.thumbnail_url, title: json.title, author: json.author_name})
        localStorage.setItem('history', JSON.stringify(list))
        setHistory(list)
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/tab1">
                            <Tab1 videoLink={videoLink} addToHistory={addToHistory}/>
                        </Route>
                        <Route exact path="/tab2">
                            <Tab2 searchResults={searchResults} setSearchResults={setSearchResults}/>
                        </Route>
                        <Route path="/tab3">
                            <Tab3 history={history}/>
                        </Route>
                        <Route path="/listen">
                            <ListenerPage playSong={playSong}/>
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab2" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="bottom">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={play} />
                            <IonLabel>Now Playing</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={search} />
                            <IonLabel>Search</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
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

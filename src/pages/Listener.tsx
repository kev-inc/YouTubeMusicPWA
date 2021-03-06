/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { IonPage } from '@ionic/react';
import { useLocation, useHistory } from 'react-router';

const ListenerPage: React.FC<{playSong: (link: any) => void}> = ({playSong}) => {

    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const link = params.get('link') || ''
        playSong(link)
        history.replace("/nowplaying")
    }, [])

    return (
        <IonPage>

        </IonPage>
    )
}   

export default ListenerPage
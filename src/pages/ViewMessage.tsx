import { useState } from 'react';
import { Character } from '../data/characterTypes';
import { getFuturamaCharacters } from '../services/futuramaService';
import {IonBackButton,IonButtons,IonContent,IonHeader,IonPage,IonToolbar,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonItem, IonLabel,IonAvatar, IonLoading, useIonViewWillEnter,} 
from '@ionic/react';
import { useParams } from 'react-router';
import './ViewMessage.css';

function ViewMessage() {
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ id: string }>();

  useIonViewWillEnter(() => {
    loadCharacterDetails();
  });

  const loadCharacterDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const chars = await getFuturamaCharacters();
      const char = chars.find(c => c.id === parseInt(params.id, 10));
      setCharacter(char);
    } catch (err) {
      console.error('Error loading character:', err);
      setError('Error al cargar el personaje. Verifica tu conexión y vuelve a intentarlo.');
      setCharacter(undefined);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Personajes" defaultHref="/home"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Cargando personaje..." />

        {/* Detalles cuando estén disponibles */}
        {!loading && character && (
          <>
            <IonCard>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                <IonAvatar style={{ width: '200px', height: '200px', borderRadius: '10px', overflow: 'hidden' }}>
                  <img
                    alt={character.name}
                    src={character.image}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </IonAvatar>
              </div>
              <IonCardHeader>
                <IonCardTitle>{character.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem lines="inset">
                  <IonLabel>
                    <h2>Especie</h2>
                    <p>{character.species}</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="inset">
                  <IonLabel>
                    <h2>Género</h2>
                    <p>{character.gender}</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="inset">
                  <IonLabel>
                    <h2>Estado</h2>
                    <p>{character.status}</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="inset">
                  <IonLabel>
                    <h2>ID</h2>
                    <p>{character.id}</p>
                  </IonLabel>
                </IonItem>
                <IonItem lines="inset">
                  <IonLabel>
                    <h2>Fecha de Creación</h2>
                    <p>{new Date(character.createdAt).toLocaleDateString('es-ES')}</p>
                  </IonLabel>
                </IonItem>
              </IonCardContent>
            </IonCard>
          </>
        )}

        {/* Error o no encontrado, mostrado sólo después de la carga */}
        {!loading && error && (
          <IonCard color="danger" style={{ margin: '10px' }}>
            <IonCardHeader>
              <IonCardTitle>❌ Error</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{error}</p>
            </IonCardContent>
          </IonCard>
        )}

        {!loading && !error && !character && (
          <div style={{ padding: '20px', textAlign: 'center' }}>Personaje no encontrado</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ViewMessage;

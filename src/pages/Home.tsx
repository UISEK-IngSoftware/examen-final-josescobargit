import CharacterListItem from '../components/CharacterListItem';
import { useState } from 'react';
import { Character } from '../data/characterTypes';
import { getFuturamaCharacters } from '../services/futuramaService';
import {IonContent,IonHeader,IonList,IonPage,IonRefresher,IonRefresherContent,IonTitle,IonToolbar,IonLoading,IonCard,IonCardHeader,IonCardTitle,IonCardContent,useIonViewWillEnter} 
from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useIonViewWillEnter(() => {
    loadCharacters();
  });

  const loadCharacters = async () => {
    setLoading(true);
    setError(null);
    try {
      const chars = await getFuturamaCharacters();
      setCharacters(chars);
    } catch (error) {
      console.error('Error loading characters:', error);
      setError('Error al cargar los personajes. Por favor, intenta nuevamente.');
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async (e: CustomEvent) => {
    setError(null);
    try {
      const chars = await getFuturamaCharacters();
      setCharacters(chars);
    } catch (error) {
      console.error('Error refreshing characters:', error);
      setError('Error al actualizar los personajes. Por favor, intenta nuevamente.');
      setCharacters([]);
    } finally {
      e.detail.complete();
    }
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Personajes Futurama</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonLoading isOpen={loading} message="Cargando personajes..." />
        
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Personajes Futurama
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Estado de Error */}
        {error && !loading && (
          <IonCard color="danger" style={{ margin: '10px' }}>
            <IonCardHeader>
              <IonCardTitle>❌ Error al cargar los personajes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ marginBottom: '8px' }}>{error}</p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Estado Vacío */}
        {!loading && characters.length === 0 && !error && (
          <IonCard style={{ margin: '10px' }}>
            <IonCardHeader>
              <IonCardTitle>No hay personajes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p style={{ color: '#666', marginBottom: '8px' }}><strong>No hay personajes para mostrar</strong></p>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>Desliza hacia abajo para actualizar</p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Lista de Personajes */}
        {characters.length > 0 && (
          <IonList>
            {characters.map(character => (
              <CharacterListItem key={character.id} character={character} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;

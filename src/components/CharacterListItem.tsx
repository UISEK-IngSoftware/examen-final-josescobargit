import { IonItem, IonAvatar, IonLabel } from '@ionic/react';
import { Character } from '../data/characterTypes';
import './CharacterListItem.css';

interface Props {
  character: Character;
}

const CharacterListItem: React.FC<Props> = ({ character }) => {
  return (
    <IonItem routerLink={`/character/${character.id}`} detail>
      <IonAvatar slot="start">
        <img alt={character.name} src={character.image} />
      </IonAvatar>
      <IonLabel>
        <h2>{character.name}</h2>
        <p><strong>Género:</strong> {character.gender}</p>
        <p><strong>Estado:</strong> {character.status}</p>
      </IonLabel>
    </IonItem>
  );
};

export default CharacterListItem;

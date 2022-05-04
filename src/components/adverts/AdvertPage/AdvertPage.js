import Button from '../../common/Button';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../layout/Page';
import Advert from '../AdvertsPage/Advert';
import { getAdvert, deleteAdvert } from '../service';
import './AdvertPage.css';
import Confirmation from '../../common/Confirmation';

const AdvertPage = () => {
  const [advert, setAdvert] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    // se busca anuncio, si no se encuentra manda a 404
    getAdvert(id)
      .then(advert => setAdvert(advert))
      .catch(() => {
        navigate('/404');
      });
  }, [id, navigate]);

  const handleDeleteAdvert = e => {
    e.preventDefault();
    setIsDelete(true);
  };

  const handleCancellationDelete = e => {
    e.preventDefault();
    setIsDelete(false);
  };
  // Al eliminar el anuncio manda index
  const handleConfirmationDelete = async e => {
    e.preventDefault();
    await deleteAdvert(id);
    navigate('/adverts');
  };
  return (
    <Page title="Detalle del anuncio">
      <Advert {...advert} isPhoto={true} />
      <div className="advertPage-div-button">
        {!isDelete && (
          <Button variant="delete" onClick={handleDeleteAdvert}>
            Eliminar
          </Button>
        )}
        {isDelete && (
          <Confirmation
            label={'Está seguro de elminar el anuncio?'}
            handleConfirmation={handleConfirmationDelete}
            handleCancellation={handleCancellationDelete}
          />
        )}
      </div>
    </Page>
  );
};

export default AdvertPage;

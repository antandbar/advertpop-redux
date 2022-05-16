import Button from '../../common/Button';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../../layout/Page';
import Advert from '../AdvertsPage/Advert';
import './AdvertPage.css';
import Confirmation from '../../common/Confirmation';
import { useDispatch, useSelector } from 'react-redux';
import { advertLoaded, advertDeleted } from '../../../store/actions';
import { getAdvert } from '../../../store/selectors';

const AdvertPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const advert = useSelector(getAdvert(id));

  useEffect(() => {
    dispatch(advertLoaded(id));
  }, [dispatch, id]);

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
    dispatch(advertDeleted(id));
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

import React from 'react';
import Photo from '../../common/Photo';
import './Advert.css';

const Advert = ({ name, sale, price, tags, photo, isPhoto }) => {
  return (
    <article className="advert bordered">
      {/* Se especifica si se requiere con o sin foto */}
      {isPhoto && (
        <div className="left">
          <Photo className="advert-photo" photo={photo} />
        </div>
      )}

      <div>
        <div className="advert-content">
          <span> El artículo </span>
          <span className="advert-data">{name}</span>
          <span> se </span>
          <span className="advert-data"> {sale ? 'vende' : 'compra'}</span>
          <span> a un precio de </span>
          <span className="advert-data">{price}€</span>
        </div>
        <div className="advert-content">
          <span>Tags asociados: </span>
          <span className="advert-data">
            {/* Se formatena los tags */}
            {JSON.stringify(tags)?.replace(/["'[\]]/g, '')}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Advert;

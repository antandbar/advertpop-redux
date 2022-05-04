import React from 'react';
import classNames from 'classnames';
import defaultPhoto from '../../assets/Imagen_no_disponible.png';
import './Photo.css';

const Photo = ({ className, photo, ...props }) => (
  <img
    className={classNames('photo', className)}
    src={photo?photo:defaultPhoto}
    alt="advertphoto"
    {...props}
  />
);

export default Photo;

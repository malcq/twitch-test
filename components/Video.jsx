import styled from 'styled-components';


const Video = ({ _id, title, url, preview, isFavorite, setFavorite, unSetFavorite }) =>  {
  const onSetFavorite = (e) => setFavorite(_id);
  const onUnSetFavorite = (e) => unSetFavorite(_id);
  return (
    <Preview isFavorite={isFavorite}>
      <span className='preview__favorites' 
        onClick={isFavorite ? onUnSetFavorite : onSetFavorite} />
      <a href={url} target='_blank'>
        <img className='preview__img' src={preview.large} alt={title} />
        <span className='preview__title'>{title}</span>
      </a> 
    </Preview>);
};

const Preview = styled.li`
  position: relative;
  list-style: none;
  flex: 0 0 30%;
  margin: 10px;
  cursor: pointer;

  :hover {
    .preview__title {
      text-align: center;
      margin: 0 auto;
      padding: 8px 15px;
    }

    .preview__favorites,
    .preview__title {
      visibility: visible;
      opacity: 0.9;
    }
  }

  .preview {
    &__img {
      max-width: 100%;
    }

    &__title,
    &__favorites {
      position: absolute;
      right: 0;
      left: 0;
      opacity: 0;
      visibility: hidden;
      -webkit-transition: visibility 0s, opacity 0.5s linear; 
      transition: visibility 0s, opacity 0.5s linear;
    }

    &__title {
      bottom: 10px;
      background: #000;
      color: #fff;
    }

    &__favorites {
      padding: 10px;
      background: url(
        ${props => props.isFavorite 
        ? '/favorites-remove.png' : '/favorites-add.png'
        }) no-repeat 95% 50%;
      background-size: contain;
      top: 10px;
      z-index: 1;

      :active {
        transform: scale(1)
      }
    }
  }
`;

export default Video;
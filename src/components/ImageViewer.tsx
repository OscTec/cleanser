import { Image } from "../interfaces/Image";

import "../css/App.css";

export default function ImageViewer({ images, imageIndex }: { images: Image[], imageIndex: number }) {
  return (
    <div style={ styles.container }>
      { images.length > 0 && 
        <img
          key={images[imageIndex].name}
          src={`${images[imageIndex].srcBlob}`}
          style={ styles.image as React.CSSProperties }
        />
      }
    </div>
  );
}

const styles = {
  container: {
    width: '640px',
    height: '480px',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: 'black',
    backgroundColor: '#FAF9F6'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'scale-down'
  },
}
import { Dispatch, forwardRef } from 'react'

import { Image } from '../interfaces/Image'

import "../App.css"

interface Props {
  images: Image[]
  imageIndex: number
  setImageIndex: Dispatch<number>
}

export default forwardRef(function ImageScrollBar(props: Props, ref) {
  const { images, imageIndex, setImageIndex } = props
  return (
    <div ref={ref} style={styles.container as React.CSSProperties }>
      { images.length > 0 &&
        images.map((image: any, index: number) => (
          <a key={image.name}>
            <img className="logo vite" style={{...styles.image, ...(imageIndex === index && styles.active)}} src={image.srcBlob} onClick={() => setImageIndex(index)} />
          </a>
        ))
      }
    </div>
  );
})

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FAF9F6',
    overflow: 'auto',
  },
  image: {
    borderStyle: 'solid',
    borderWidth: '5px',
    borderColor: 'black',
  },
  active: {
    borderColor: 'green',
    borderWidth: '10px',
    animationDuration: '0s',
    animationDelay: '0s'
  }
}
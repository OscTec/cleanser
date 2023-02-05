import { useEffect, useRef, useState } from "react";

import { fetchFilesFromDirectory, fetchImageDirectories } from "../helpers/FileStystem";

import DirectoryList from "../components/DirectoryList";
import ImageScrollBar from "../components/ImageScrollBar";
import ImageViewer from '../components/ImageViewer'

import { Directory } from "../interfaces/Directory";
import { Image } from '../interfaces/Image'

import "../App.css";

export default function Folder() {
  const [dirs, setDirs] = useState<Directory[]>([])
  const [activeDir, setActiveDir] = useState('')
  const [images, setImages] = useState<Image[]>([])
  const [imageIndex, setImageIndex] = useState(0)
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    (async() => {
      const files = await fetchFilesFromDirectory(activeDir)
      setImages(files)
    })()
  }, [activeDir])

  useEffect(() => {
    (async() => {
      const directories = await fetchImageDirectories()
      setDirs(directories)
      setActiveDir(directories[0].name)
    })()
  }, [])

  const handleKeyDown = (e: { key: string; }) => {
    let nextRenderIndex = imageIndex
    // if (e.repeat) return
    if (e.key === 'ArrowRight') {
      if (imageIndex + 1 >= images.length) {
        nextRenderIndex = 0
        setImageIndex(0)
      } else {
        nextRenderIndex = imageIndex + 1
        setImageIndex(imageIndex + 1)
      }
    }
    if (e.key === 'ArrowLeft') {
      if (imageIndex - 1 < 0) {
        nextRenderIndex = images.length - 1
        setImageIndex(images.length - 1)
      } else {
        nextRenderIndex = imageIndex - 1
        setImageIndex(imageIndex - 1)
      }
    }
  };

  useEffect(() => {
    listRef.current?.children[imageIndex]?.scrollIntoView({ inline: 'center', behavior: 'smooth' });
  }, [imageIndex])

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div style={styles.container as React.CSSProperties} ref={ref} tabIndex={-1} onKeyDown={handleKeyDown}>
      <DirectoryList directories={dirs} activeDir={activeDir} setActiveDir={setActiveDir} setImageIndex={setImageIndex} setDirs={setDirs} />
      <div style={styles.content as React.CSSProperties}>
        <ImageViewer images={images} imageIndex={imageIndex}/>
        <ImageScrollBar images={images} imageIndex={imageIndex} setImageIndex={setImageIndex} ref={listRef} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100vw'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#313639',
    flexGrow: 0,
    maxWidth: '75%'
  }
}
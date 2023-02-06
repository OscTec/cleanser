import { readDir, BaseDirectory, readBinaryFile, createDir, removeDir, copyFile, removeFile } from '@tauri-apps/api/fs'

import { Directory } from '../interfaces/Directory';
import { Image } from '../interfaces/Image'

const baseDirectory = BaseDirectory.Picture
const hostDirectory = 'images'

export const fetchImageDirectories = async (): Promise<Directory[]> => {
  const entries = await readDir(hostDirectory, { dir: baseDirectory, recursive: false })

  const directories = entries.map((entry) => {
    return {
      path: entry.path,
      name: entry.name
    }
  })

  return directories
}

const getBlob = async (directory: string): Promise<string> => {
  const contents = await readBinaryFile(directory, { dir: baseDirectory })
  const blob = new Blob([contents])
  const srcBlob = URL.createObjectURL(blob)

  return srcBlob
}

export const fetchFilesFromDirectory = async (directory: string): Promise<Image[]> => {
  const entries = await readDir(`${hostDirectory}/${directory}`, { dir: baseDirectory, recursive: false })

  const files = await  Promise.all(entries.map(async (entry) => {
    return {
      path: entry.path,
      name: entry.name,
      directory,
      srcBlob: await getBlob(`${hostDirectory}/${directory}/${entry.name}`)
    }
  }))

  return files
}

export const createDirectory = async (directoryName: string) => {
  await createDir(`${hostDirectory}/${directoryName}`, { dir: baseDirectory, recursive: true });
}

export const deleteDirectory = async (directoryName: string) => {
  await removeDir(`${hostDirectory}/${directoryName}`, { dir: baseDirectory });
}

export const moveFile = async (file: string, currentDir: string, targetDir: string) => {
  const sourcePath = `${hostDirectory}/${currentDir}/${file}`
  const targetPath = `${hostDirectory}/${targetDir}/${file}`

  await copyFile(sourcePath, targetPath, { dir: baseDirectory })
  await removeFile(sourcePath, { dir: baseDirectory });
}
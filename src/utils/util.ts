export function loopArrayIndex(index: number, length: number, incr: number = 1) {
    let newIndex = index + incr

    if (newIndex >= length) {
      newIndex = 0
    }
    if (newIndex < 0) {
      newIndex = length - 1
    }
    
    return newIndex
  }
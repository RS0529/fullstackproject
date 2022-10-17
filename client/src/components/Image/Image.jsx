import React from 'react'

const Image = () => {
  return (
    <div className='image' style={{
        backgroundImage: `url(${props.imageUrl})`,
        backgroundSize:  props.contain ? 'contain' : 'cover',
        backgroundPosition: props.left ? 'left' : 'center'
    }}>
      
    </div>
  )
}

export default Image

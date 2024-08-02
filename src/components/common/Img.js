import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Img = ({ src, className, alt }) => {
    return (
        <LazyLoadImage
            className={`${className} `}
            alt={alt || 'Image'}
            effect='blur'
            wrapperProps={{
                // If you need to, you can tweak the effect transition using the wrapper style.
                style: {transi: "0.2s"},
            }}
        
            src={src}
        />
    )
}


export default Img
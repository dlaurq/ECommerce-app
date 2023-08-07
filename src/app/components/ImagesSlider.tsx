'use client'

import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import { useState } from "react"

export default function ImagesSlider({images}:{images: any}) {

    const [imageNo, setImageNo] = useState(0)

  return (
    <section>
        <Image 
            className='aspect-square object-contain'
            src={process.env.NEXT_PUBLIC_API_URL + images[imageNo].attributes.url} 
            alt='shoes image'
            width={500}
            height={500}
            sizes="(min-width: 1120px) 500px, calc(46.75vw - 14px)"
            />

        <section className="flex justify-between items-center">
            <button className=" text-4xl cursor-pointer" onClick={() => imageNo == 0 ? setImageNo(images.length -1 ) : setImageNo(imageNo - 1)}> <FontAwesomeIcon icon={faLeftLong} /> </button>
            <button className=" text-4xl cursor-pointer" onClick={() => imageNo == images.length -1 ? setImageNo(0) : setImageNo(imageNo + 1)}> <FontAwesomeIcon icon={faRightLong} /> </button>
        </section>

    </section>
  )
}

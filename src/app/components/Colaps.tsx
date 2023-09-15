'use client'

import { useEffect, useState } from "react"
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Colaps({children, title}: {children: React.ReactNode, title: string}) {

  useEffect(() => {

    setWidth(window.innerWidth)

  }, [window.innerWidth])

  const [width, setWidth] = useState(innerWidth)
  const [toggle, setToggle] = useState(width < 768 ? true : false)


  return (
    <section className="p-5 md:min-w-[20rem]">
        <section className="flex flex-row justify-between items-center text-2xl" onClick={() => setToggle(!toggle)}>
        <h4>{title}</h4>
        <FontAwesomeIcon icon={toggle ? faCaretUp : faCaretDown} />
      </section>
        {!toggle && children}

        {toggle && <hr className="border-b-2 border-black mt-5"/>}
    </section>
  )
}

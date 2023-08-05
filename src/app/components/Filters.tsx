'use client'

import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter, useSearchParams } from "next/navigation"
import qs from "query-string"
import { useState, useEffect } from "react"

type BooleanObject = {
  [key: string]: boolean
}


export default function Filters({data, name, valueKey}:{data: Array<any>, name: string, valueKey: string}) {

  const searchParams = useSearchParams()
  const router = useRouter()

  const [checked, setChecked] = useState<BooleanObject>({})
  const [toggle, setToggle] = useState(true)

  useEffect(() => {
    
    let x = ''

    Object.entries(checked).forEach(entry => {
      const [key, value] = entry
      if(value) 
        if(!x) x = key
        else x = x + ' ' + key
    })

    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: x
    };

    const url = qs.stringifyUrl({
      url: window.location.href,
      query,
    }, { skipNull: true });

    router.push(url);
    
  }, [checked, router, searchParams, valueKey])
  

  return (
    <section className=" py-5 border-b-2 border-black">
      <section className="flex flex-row justify-between items-center text-2xl" onClick={() => setToggle(!toggle)}>
        <h3>{name}</h3>
        <FontAwesomeIcon icon={toggle ? faCaretUp : faCaretDown} />
      </section>
        {!toggle && data.map(item => 
          <fieldset key={item.id} className="py-1 text-xl">
            <input type="checkbox" defaultChecked={checked[item.attributes.name]} name={item.attributes.name} id={item.id} onChange={(e) => setChecked({...checked, [e.target.name]: e.target.checked})}/>
            <label htmlFor={item.id} className="ml-2">{item.attributes.name}</label>
          </fieldset>
        )}
    </section>
  )
}

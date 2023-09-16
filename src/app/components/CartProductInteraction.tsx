'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { CartProduct } from "../../../types"
import { useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMinus, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons"

export default function CartProductInteraction({cartProduct}:{cartProduct:CartProduct}) {

    const router = useRouter()

    const [quantity, setQuantity] = useState<number>(cartProduct.quantity!) 

    const handleDelete = async () => {
        const res = await fetch('/api/product', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: cartProduct.id})
        })
        router.refresh()
    }

    const submitChange = async () => {
        const res = await fetch('/api/product', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: cartProduct.id, quantity: quantity})
        })

        console.log(await res.json())

        router.refresh()
    }

    const debounced = useDebouncedCallback(submitChange, 1000)

    const handleChange = (e:ChangeEvent<HTMLInputElement> | string) => {
        
        if(typeof e === 'string'){
            if(e === '-') setQuantity(prevQuant => prevQuant - 1 <= 0 ? 1 : prevQuant- 1)
            if(e === '+') setQuantity(prevQuant => prevQuant + 1)
        }else{
            const newQuant = e.target.value ? parseInt(e.target.value) < 0 ? 1 : parseInt(e.target.value) : 1
            setQuantity(newQuant)
        }

          
        debounced()
    } 

    

    return(
        <section className="flex flex-row justify-between items-start">
            <section>
                <section className="flex flex-row">
                    <button 
                        className="border-gray-200 border-2 text-sm font-bold w-7 h-7 disabled:opacity-50 disabled:bg-gray-200"
                        onClick={() => handleChange('-')}
                        disabled={quantity === 1 ? true : false}                        
                    > 
                        <FontAwesomeIcon icon={faMinus} /> 
                    </button>
                    <input 
                        className="border-gray-200 border-y-2 text-sm font-bold w-7 h-7 text-center" 
                        type="number" 
                        name={"quantity" + cartProduct.id} 
                        id={"quantity" + cartProduct.id} 
                        min={1} 
                        value={quantity} 
                        onChange={(e) => handleChange(e)}
                    />
                    <button 
                        className=" border-gray-200 border-2 text-sm font-bold w-7 h-7"
                        onClick={() => handleChange('+')}
                        
                    >
                        <FontAwesomeIcon icon={faPlus} className=""/>
                    </button>
                </section>
            </section>
            <button onClick={handleDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
        </section>
    )
}
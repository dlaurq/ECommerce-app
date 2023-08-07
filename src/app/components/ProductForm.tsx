'use client'

export default function ProductForm({sizes}: {sizes:Size[]}) {

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-2"></div>
      <fieldset>
          <select className="text-xl border-2 border-black px-2 py-1 w-full text-center" name="sizes" id="sizes" required>
              <option value="">Choose a size</option>
              {sizes.map(size => <option key={size.id} value={size.attributes.name}>{size.attributes.name}</option>)}
          </select>
      </fieldset>
      <div className="p-2"></div>
      <button className="p-2 font-bold bg-blue-950 text-white text-xl w-full" type="submit">Add to cart</button>
    </form>
  )
}

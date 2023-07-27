
export default function Page({params}: {params: { name: string}}) {
  return (
    <section>{params.name}</section>
  )
}

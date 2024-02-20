import { useRef } from "react"
import { useSearchParams } from "react-router-dom"

const ModalSearchRoom = () => {

    const form = useRef(null)
    const [searchParams, setSearchParams] = useSearchParams()
  
    const handlerSearch = (e:  React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = new FormData(form.current!).forEach((val: any, i: string) => {
        if (val) {
          searchParams.set(i, val)
        }
        setSearchParams(searchParams)
      })  
  
      data
    }
  
    return (
      <div>
        <form ref={form} className='flex flex-col gap-2' onSubmit={(e) => handlerSearch(e)}>
          <div className='flex gap-2'>
            <label>name</label>
            <input type="text" name='name' />
          </div>
          <div className='flex gap-2'>
            <label>No Ruang</label>
            <input type="number" name='no_room' />
          </div>
          <div className='flex gap-2'>
            <label>Lebar</label>
            <input type="number" name='wide' />
          </div>
          <div className='flex gap-2'>
            <label>Panjang</label>
            <input type="number" name='long' />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }

  export default ModalSearchRoom
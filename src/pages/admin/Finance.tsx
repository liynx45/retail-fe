import { Modal } from 'antd'
import { useEffect, useState } from 'react'
import { Bar, Chart } from 'react-chartjs-2'

function Finance() {

  const [layout, setLayout] = useState<{ id: number, user: "X" | "Y" }[]>([])
  const [user, setUser] = useState<"X" | "Y">("X")
  const [winner, setWinner] = useState<"X" | "Y">()
  const [toggle, setToggle] = useState<boolean>(false)

  const validate = (num_1: number, num_2: number, num_3: number) => {
    const arr = layout.filter((data) => data.user === user).map((data) => data.id)
    return arr.includes(num_1) && arr.includes(num_2) && arr.includes(num_3)
  }

  const tapUser = (id: number, user: "X" | "Y") => {
    setLayout([...layout, { id: id, user: user }])
  }

  const winnerSet = () => {
    setWinner(user)
    setToggle(pv => !pv)
  }

  const clear = () => {
    setLayout([])
    setUser("X")
  }

  useEffect(() => {

    if (validate(0, 1, 2)) {
      winnerSet()
    } else if (validate(3, 4, 5)) {
      winnerSet()
    } else if (validate(6, 7, 8)) {
      winnerSet()
    } else if (validate(0, 3, 6)) {
      winnerSet();
    } else if (validate(1, 4, 7)) {
      winnerSet()
    } else if (validate(2, 5, 8)) {
      winnerSet()
    } else if (validate(0, 4, 8)) {
      winnerSet()
    } else if (validate(2, 4, 6)) {
      winnerSet()
    } else[
      setUser(user === "X" ? "Y" : "X")
    ]
  }, [layout])

  return (
    <div>
      <span>Giliran user {user}</span>
      <button onClick={clear}>Clear</button>
      <div className='grid grid-cols-3 max-w-[7rem]'>
        {
          [...Array(9)].map((_: any, i: number) => (
            <button
              onClick={() => tapUser(i, user)}
              disabled={layout.map((data: any) => data.id).includes(i)}
              className='size-8 border border-black'>
              {layout.map((data: any) => data.id === i ? data.user : "")}
            </button>
          ))
        }
        <Modal
          open={toggle}
          onCancel={() => setToggle(pv => !pv)}
          footer={false}
        >
          <span className='text-3xl text-center font-semibold'>You "{winner}"" Winner</span>
        </Modal>
      </div>
    </div>
  )
}

export default Finance

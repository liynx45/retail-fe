import { Carousel } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../libs/redux/store'
import { IBannerCompany } from '../../../types/schema'


function CarouselRoom() {

  const { company } = useSelector((state: RootState) => state)

  return (
    <div>
      <div className='relative'>
        <div className='text-center flex flex-col gap-3 max-w-md absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 z-40'>
          <span className='text-xl font-semibold text-slate-100'>{company.data.name}</span>
          <p className='text-slate-300'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates ducimus nesciunt dolorum quisquam iure sapiente est.</p>
        </div>
        <Carousel autoplay>
          {
            company.data.banner.map((data: IBannerCompany) => (
              <img key={data.id} src={data.url} className='w-full h-[300px] bg-slate-400 object-cover' alt="" />
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}

export default CarouselRoom

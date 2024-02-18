import { Carousel } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '../../../libs/redux/store'
import { IBannerCompany } from '../../../types/schema'


function IndexRoom() {
  const { company } = useSelector((state: RootState) => state)
  return (
    <div>
      <div>
        <Carousel autoplay>
          {
            company.data.banner.map((data: IBannerCompany) => (
              <img src={data.url} className='w-full h-[300px] bg-slate-400 object-cover' alt="" />
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}

export default IndexRoom

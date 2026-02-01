import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import React from 'react'
import Title from '../Title';
import { Label } from '../ui/label';

const priceArray = [
  {title:"Under ₹30",value:"0-30"},
  {title:"₹30 - ₹70",value:"30-70"},
  {title:"₹70 - ₹100",value:"70-100"},
  {title:"₹100 - ₹120",value:"100-120"},
  {title:"₹120 - ₹150",value:"120-150"},
  // {title:"₹150 - ₹180",value:"150-180"},
  // {title:"₹180 - ₹210",value:"180-210"},
  // {title:"₹210 - ₹240",value:"210-240"},
]
interface Props{
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const PriceList = ({selectedPrice,setSelectedPrice}:Props) => {
  return (
    <div className='w-full bg-white p-5'>
      <Title className='text-base font-black'>Product Categories</Title>
      <RadioGroup value={selectedPrice || ""} onValueChange={setSelectedPrice} className='mt-2 space-y-1'>
        {priceArray?.map((price,index)=>(
          <div key={index} className='flex items-center space-x-2 hover:cursor-pointer'>
            <RadioGroupItem value={price?.value} id={price?.value} className='rounded-sm'/>
            <Label htmlFor={price?.value} className={`${selectedPrice === price?.value ? "font-semibold text-shop-warmterracotta":"font-normal"}`}>{price?.title}</Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (<button onClick={()=>setSelectedPrice(null)} className='text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop-warmterracotta hoverEffect text-left'>
        Reset Selection
      </button>)}
    </div>
  )
}

export default PriceList
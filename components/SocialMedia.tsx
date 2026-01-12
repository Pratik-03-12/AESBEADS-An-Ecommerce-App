import { Instagram, Mail, Youtube } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import Link from 'next/link'
import { cn } from '@/lib/utils';

interface Props{
    className?:string;
    iconClassName?:string;
    tooltipClassName?:string;
}

const socialLink = [
    {
        title:"Youtube",
        href:"",
        icon:<Youtube className='w-5 h-5'/>
    },
    {
        title:"Instagram",
        href:"",
        icon:<Instagram className='w-5 h-5'/>
    },
    {
        title:"Gmail",
        href:"",
        icon:<Mail className='w-5 h-5'/>
    }
]

const SocialMedia = ({className,iconClassName,tooltipClassName}:Props) => {
  return (
    <TooltipProvider>
        <div className={cn("flex items-center gap-3.5",className)}>
            {socialLink?.map((item)=>(
                <Tooltip key={item?.title}>
                    <TooltipTrigger asChild>
                        <Link key={item?.title} target="_blank" rel='noopener noreferrer' href={item?.href} className={cn("p-2 border rounded-full hover:text-amber-800 hover:border-amber-800 hoverEffect",iconClassName)}>
                            {item?.icon}
                        </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                        {item?.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </TooltipProvider>
  )
}

export default SocialMedia
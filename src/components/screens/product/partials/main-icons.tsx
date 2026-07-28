import { MessagesSquare, Star } from 'lucide-react'
import ShareModal from '../../../modules/share-modal'
import Favorite from '../../../modules/favorite'

const MainIcons = ({ className, productCode, isFave, star }: { star: number, className?: string, productCode: number, isFave: boolean }) => {
    return (
        <div className={`${className ?? ''} flex gap-0.5 sm:!gap-5`}>
            <Favorite productCode={productCode} isFave={isFave} />
            <ShareModal link={location.href} />
            {star !== 0 ? <a href="#comments" className='bg-white flex gap-1 items-center rounded-xl sm:shadow-xl hover:opacity-55 transition-opacity cursor-pointer p-2'>
                <span className='text-sm relative top-0.5'>{star}</span> <Star className='fill-yellow-400 stroke-yellow-400' size={20} />
            </a> : ''}
            <a href="#comments" className='bg-white block rounded-xl sm:shadow-xl hover:opacity-55 transition-opacity cursor-pointer p-2'>
                <MessagesSquare size={20} />
            </a>
        </div>
    )
}

export default MainIcons
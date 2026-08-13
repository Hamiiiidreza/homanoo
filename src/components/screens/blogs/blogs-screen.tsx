import Container from '../../modules/container'
import Breadcrumb from '../../modules/breadcrumb'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import BlogCard from '../../modules/blog-card'
import useBlogs from '../../../endpoints/useBlogs'
import { BlogItem } from '../../../types/blog.types'
import BlogsSkeleton from '../home/partials/blogs/blogs-skeleton'
import { useQueryParams } from '../../../endpoints/useQueryParams'
import { useEffect, useState } from 'react'
import SearchInput from '../shop/partials/search-input'
import PaginationWrapper from '../../modules/pagination-wrapper'
import { useNavigate } from 'react-router-dom'

const BlogsScreen = () => {
    const { data, isPending } = useBlogs()
    const { setParams } = useQueryParams();
    const [sortBy, setSortBy] = useState('all')
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            if (data.totalPages < data.page) {
                navigate('/blogs', { replace: true });
            }
        }
    }, [data])

    return (
        <Container>
            <div className='pt-5 pb-20'>
                <Breadcrumb title='مقالات' />
                <div className='w-max mx-auto text-center sm:!px-0 px-3 pb-12 pt-10'>
                    <p className='text-2xl pb-5'>دنبال چه مقاله ای هستی؟</p>
                    <SearchInput trashClassName="top-4" className='shadow-m w-[290px] sm:!w-[400px] h-13 rounded-xl border border-gray-300 [&>*]:!border-0' />
                </div>
                <div className="space-y-2">
                    <label className='pb-1 block'>مرتب‌سازی بر اساس</label>
                    <Select
                        value={sortBy}
                        onValueChange={(val) => {
                            setSortBy(val)
                            setParams({ sortBy: val })
                        }}
                    >
                        <SelectTrigger className={"sm:!w-[300px] w-full sm:!mx-0 mx-auto mb-5 !h-11"}>
                            <SelectValue placeholder="مرتب‌سازی" />
                        </SelectTrigger>
                        <SelectContent dir="rtl">
                            <SelectItem value="all">همه</SelectItem>
                            <SelectItem value="-createdAt">جدیدترین</SelectItem>
                            <SelectItem value="createdAt">قدیمی‌ترین</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {data && !isPending ? (
                    data.articles.length > 0 ? (
                        <div className='space-y-5'>
                            <div className="grid grid-cols-1 sm:!grid-cols-2 md:!grid-cols-3 lg:!grid-cols-4 gap-x-[25px] gap-y-[40px]">
                                {data.articles.map((blog: BlogItem) => (
                                    <BlogCard key={blog.slug} {...blog} />
                                ))}
                            </div>
                            <PaginationWrapper limit={4} key={'blogs'} page={data.page} totalItems={data.total} />

                        </div>
                    ) : <p className='text-center pt-20 w-full text-3xl'>مقاله ای یافت نشد</p>


                ) : <BlogsSkeleton />}

            </div>
        </Container>
    )
}

export default BlogsScreen 

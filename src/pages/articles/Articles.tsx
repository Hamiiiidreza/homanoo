import React from 'react'
import Topbar from '../../components/modules/topbar/topbar';
import Navbar from '../../components/modules/navbar/navbar';
import Header from '../../components/templates/header/header';
import Breadcrumb from '../../components/modules/breadcrumb/breadcrumb';
import FilterAndSortpanel from '../../components/ui/filter-and-sortpanel';
import BlogSection from '../../components/modules/blog-section/blog-section';
import Footer from '../../components/modules/footer/footer';

function Articles() {
    return (
        <div>
            <Topbar />
            <div className="px-3 sm:!px-8 xl:!px-40">
            <Navbar />
            <Header
                singleImage="/Images/img-placeholder-4.png"
                isSlidable={false}
                withGradient={false}
                height="h-[350px]"
            >ّ
                <Breadcrumb
                    title="Blog"
                    name="Our Blog"
                    desc="Home ideas and design inspiration"
                />
            </Header>
            <div className="mt-6">
                <FilterAndSortpanel
                    mode='blog'
                    defaultActiveButton={1}
                />
            </div>
            <BlogSection
                showHeader={false}
                count={9}
                showFullCards={true}
            />
            <Footer />
            </div>
        </div>
    )
}

export default Articles;

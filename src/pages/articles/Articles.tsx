import React from 'react'
import Header from '../../components/screens/home/partials/header/header';
import Breadcrumb from '../../components/modules/breadcrumb/breadcrumb';
import FilterAndSortpanel from '../../components/ui/filter-and-sortpanel';
import BlogSection from '../../components/modules/blog-section/blog-section';
import Container from '../../components/modules/container';

function Articles() {
    return (
        <div>
            <Container>
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
            </Container>
        </div>
    )
}

export default Articles;

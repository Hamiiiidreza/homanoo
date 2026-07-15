import React from 'react'
import Topbar from '../../components/modules/topbar/topbar';
import Navbar from '../../components/modules/navbar/navbar';
import ArticlesSample from '../../components/templates/articles-details/articles-sample';
import PageHierarchy from '../../components/modules/Page-Hierarchy/page-hierarchy'
import Footer from '../../components/modules/footer/footer';

function ArticlesDetails() {


    return (
        <div>
            <Topbar />
            <div className="px-3 sm:!px-8 xl:!px-40">
                <Navbar />
                <PageHierarchy
                    items={[
                        "خانه",
                        "بلاگ",
                        "چگونه یک سرویس بهداشتی شلوغ را به فضایی آرامش‌بخش تبدیل کنیم",
                    ]}
                />
                <div className="mb-10">
                    <ArticlesSample />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ArticlesDetails;

import React from 'react'
import ArticlesSample from '../../components/templates/articles-details/articles-sample';
import PageHierarchy from '../../components/modules/Page-Hierarchy/page-hierarchy'
import Container from '../../components/modules/container';

function ArticlesDetails() {


    return (
        <div>
            <Container>
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
            </Container>
        </div>
    )
}

export default ArticlesDetails;

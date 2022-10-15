import { Suspense } from 'react';
import {
  useShopQuery,
  useLocalization,
  Seo,
  gql,
  Image,
  useRouteParams,
} from '@shopify/hydrogen';

import Layout from '../../components/Layout.server';

export default function Article() {
  const { handle } = useRouteParams();
  const {
    language: { isoCode: languageCode },
    country: { isoCode: coutryCode },
  } = useLocalization();

  const data = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });

  const {
    data: {
      blog: { articleByHandle: article },
    },
  } = data;

  if (!article) {
    return (
      <Layout>
        <div className="container">
          <div>Article not found</div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Intl.DateTimeFormat(
    `${languageCode}-${coutryCode}`,
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  ).format(new Date(article.publishedAt));

  return (
    <Layout>
      <Suspense>
        <Seo type="article" data={article} />
        <div className="article-page container">
          <div className="article-page-header">
            <h1>{article.title}</h1>
            <span>
              {formattedDate} - {article.authorV2.name}
            </span>
          </div>
          <article>
            <Image data={article.image} alt={article.image.altText} />
            <div
              classname="article-body"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </article>
        </div>
      </Suspense>
    </Layout>
  );
}

const QUERY = gql`
  query Article($handle: String!) {
    blog(handle: "journal") {
      articleByHandle(handle: $handle) {
        title
        publishedAt
        authorV2 {
          name
        }
        image {
          url
          altText
        }
        contentHtml
      }
    }
  }
`;

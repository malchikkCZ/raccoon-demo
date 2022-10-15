import { Suspense } from 'react';
import {
  useShopQuery,
  useRouteParams,
  CacheLong,
  gql,
} from '@shopify/hydrogen';

import Layout from '../../components/Layout.server';
import ProductCard from '../../components/ProductCard.server';

export default function Collection() {
  const { handle } = useRouteParams();

  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
    variables: {
      handle,
    },
  });

  const {
    data: { collection },
  } = data;

  const {
    products: { nodes },
  } = collection;

  return (
    <Layout>
      <Suspense>
        <div className="catalog-page container">
          <h1>{collection.title}</h1>
          <div className="product-grid">
            {nodes.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </div>
      </Suspense>
    </Layout>
  );
}

const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      products(first: 9) {
        nodes {
          title
          handle
          featuredImage {
            url
            altText
            height
            width
          }
          variants(first: 1) {
            nodes {
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
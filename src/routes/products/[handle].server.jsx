import { Suspense } from 'react';
import {
  useShopQuery,
  useRouteParams,
  CacheLong,
  gql,
  Seo,
} from '@shopify/hydrogen';

import Layout from '../../components/Layout.server';
import ProductDetails from '../../components/ProductDetails.client';

export default function Product() {
  const { handle } = useRouteParams();

  const data = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    variables: {
      handle,
    },
  });

  const {
    data: { product },
  } = data;

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <div className="product-page container">
        <ProductDetails product={product} />
      </div>
    </Layout>
  );
}

const QUERY = gql`
  query Product($handle: String!) {
    product(handle: $handle) {
      title
      descriptionHtml
      media(first: 1) {
        nodes {
          ... on MediaImage {
            id
            image {
              url
              width
              height
              altText
            }
          }
        }
      }
      variants(first: 100) {
        nodes {
          id
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;

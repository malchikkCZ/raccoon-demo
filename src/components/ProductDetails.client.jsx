import {
  ProductOptionsProvider,
  useProductOptions,
  Image,
  ProductPrice,
  AddToCartButton,
  Money,
} from '@shopify/hydrogen';

export default function ProductDetails({ product }) {
  return (
    <ProductOptionsProvider data={product}>
      <Image
        data={product.media.nodes[0].image}
        className="product-page-image"
      />
      <ProductForm product={product} />
    </ProductOptionsProvider>
  );
}

function ProductForm({ product }) {
  const { options, selectedVariant, selectedOptions, setSelectedOption } =
    useProductOptions();

  return (
    <div>
      <h1>{product.title}</h1>
      <ProductPrice
        withoutTrailingZeros
        className="product-page-price"
        data={product}
        variantId={selectedVariant.id}
      />

      <div className="product-options">
        {options.map(({ name, values }) => {
          if (values.length === 1) return null;

          return (
            <div className="product-option-group" key={name}>
              <legend className="product-option-name">{name}</legend>
              {values.map((value) => {
                const id = `option-${name}-${value}`;
                const checked = selectedOptions[name] === value;

                return (
                  <div className="product-option-value" key={id}>
                    <input
                      type="radio"
                      checked={checked}
                      name={name}
                      value={value}
                      id={id}
                      onChange={() => setSelectedOption(name, value)}
                    />
                    <label htmlFor={id}>{value}</label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div
        className="product-description"
        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
      ></div>
    </div>
  );
}

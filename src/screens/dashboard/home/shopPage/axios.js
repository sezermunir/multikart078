import axios from 'axios';

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `https://your-shopify-api-endpoint/products.json?collection_id=${categoryId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Access-Token': 'your-access-token', // Shopify API için gerekli olan erişim anahtarı
          },
        }
      );
      const productData = response.data.products.map(product => ({
        id: product.id,
        image: product.images[0]?.src,
        title: product.title,
        price: product.variants[0]?.price,
        discountPrice: product.variants[0]?.compare_at_price || null,
        discount: product.variants[0]?.compare_at_price
          ? Math.round(
              (1 - product.variants[0].price / product.variants[0].compare_at_price) * 100
            )
          : null,
        newProduct: product.published_at > new Date(new Date().setDate(new Date().getDate() - 30)).toISOString(),
      }));
      setProducts(productData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [categoryId]);

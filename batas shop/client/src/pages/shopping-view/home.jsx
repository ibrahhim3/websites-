import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";


const categoriesWithIcon = [
  { id: "Baklava", label: "Baklava" },
  { id: "Turkish delight", label: "Turkish delight" },
  { id: "Chocolate", label: "Chocolate" },
  { id: "Spices", label: "Spices" },
  { id: "Teas", label: "Teas" },
  { id: "Nuts", label: "Nuts" },
  { id: "Coffee", label: "Coffee" },
  { id: "Oil", label: "Oil" },
  { id: "Cosmetics", label: "Cosmetics" },
  { id: "Honey", label: "Honey" },
  { id: "Perfumes", label: "Perfumes" },
];
function ShoppingHome() {
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 3000,
        });
      }
    });
  }
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[400px] overflow-hidden">
      {featureImageList && featureImageList.length > 0
          ? featureImageList.map((slide, index) => (
              <img
                src={slide?.image}
                key={index}
                className={`${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 "
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800 tracking-wide">
  Shop by category
</h2>


          <div className="flex items-center justify-center gap-36 flex-wrap ">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                key={categoryItem.id}
                className=" hover:scale-110  cursor-pointer transition-shadow w-24 h-24 flex items-center justify-center"
              >
                <div className="hover:bg-red-600 w-24 h-24 flex items-center justify-center rounded-full bg-red-500 text-white text-lg font-semibold text-center">
                  {categoryItem.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6">
    {productList && productList.length > 0 ? (
      // Group products by category
      Object.entries(
        productList.reduce((acc, product) => {
          const category = product.category || "Uncategorized"; // Default category
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {})
      ).map(([category, products]) => (
        <div key={category} className="mb-12">
          {/* Category Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {category}
          </h2>

          {/* Auto-Moving Row */}
          <div className="relative overflow-hidden group">
            <div
              className="flex gap-6 animate-scroll"
              style={{
                animationDuration: `${products.length * 6}s`, // Increased duration for slower scroll
              }}
            >
              {products.concat(products).map((productItem, index) => (
                <div
                  key={`${productItem.id}-${index}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 min-w-[300px]" // Ensure consistent width for items
                >
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                </div>
              ))}
            </div>

            {/* Left Arrow */}
            <button
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-blue-600 bg-white p-2 rounded-full shadow-md hidden group-hover:block"
            >
              &lt;
            </button>

            {/* Right Arrow */}
            <button
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-blue-600 bg-white p-2 rounded-full shadow-md hidden group-hover:block"
            >
              &gt;
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">No products available.</p>
    )}
  </div>
</section>









      
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;

import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.png";
import bannerTwo from "../../assets/banner-2.png";
import bannerThree from "../../assets/banner-3.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
const categoriesWithIcon = [
  { id: "Sweets", label: "Sweets" },
  { id: "Teas", label: "Teas" },
  { id: "Spices", label: "Spices" },
  { id: "Honey", label: "Honey" },
  { id: "Perfumes", label: "Perfumes" },
];
function ShoppingHome() {
  const slides = [bannerOne, bannerTwo, bannerThree];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();

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
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full h-[400px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 "
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>

          <div className="flex items-center justify-center gap-36 flex-wrap ">
            {categoriesWithIcon.map((categoryItem) => (
              <div
                key={categoryItem.id}
                className="cursor-pointer  transition-shadow w-24 h-24 flex items-center justify-center"
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-red-500 text-white text-lg font-semibold">
                  {categoryItem.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile product={productItem} />
                ))
              : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShoppingHome;

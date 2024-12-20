import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { shoppingViewHeaderMenuItems } from "@/config";
import UserCartWrapper from "@/components/shopping-view/cart-wrapper";


/////////



function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [ setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row text-red-600">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}


function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);

    const dispatch = useDispatch();
  
   
    useEffect(() => {
      dispatch(fetchCartItems(user?.id));
    }, [dispatch]);
  
    console.log(cartItems, "sangam");
  
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
              {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>
          <UserCartWrapper
            setOpenCartSheet={setOpenCartSheet}
            cartItems={
              cartItems && cartItems.items && cartItems.items.length > 0
                ? cartItems.items
                : []
            }
          />
        </Sheet>
  
        
      </div>
    );
  }





function ShoppingHomeunsigned() {
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);

  // Fetch products when the component is mounted
  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  // Set up auto-slide for featured images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  // Open the product details dialog if product details are available
  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  // Handle fetching product details
  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  // Handle adding a product to the cart
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

  // Fetch feature images when the component is mounted
  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-3">
          <img
            src="/images/logo.png" // Path to the logo in the public folder
            alt="BATAŞ Logo"
            className="h-16 w-16 rounded-full object-cover bg-black" // Bigger size and circular shape
          />

          <span className="flex flex-col items-center text-red-600">
            <span className="text-4xl  font-bold">BATAŞ</span>
            <span className="text-lg font-medium ">spice shop</span>
          </span>
        </Link>
       
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full max-w-xs bg-white text-black transition-all duration-300"
          >
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>

      <div className="relative w-full h-[400px] overflow-hidden">
        {/* Image slider */}
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

        {/* Buttons for Sign In and Sign Up */}
        <div className="absolute top-4 right-4 flex gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/auth/login")}
            className="bg-white text-black"
          >
            Sign In
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/auth/register")}
            className="bg-white text-black"
          >
            Sign Up
          </Button>
        </div>

        {/* Slide navigation buttons */}
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
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    key={productItem.id} // Ensure unique key for each product
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHomeunsigned;

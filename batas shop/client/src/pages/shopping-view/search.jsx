import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchProducts() {
  const [keyword, setKeyword] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [ setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { searchResults } = useSelector((state) => state.shopSearch);
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { toast } = useToast();

  const debouncedKeyword = useDebounce(keyword, 1000);

  useEffect(() => {
    if (debouncedKeyword && debouncedKeyword.trim() !== "") {
      setSearchParams(new URLSearchParams(`?keyword=${debouncedKeyword}`));
      dispatch(getSearchResults(debouncedKeyword));
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${debouncedKeyword}`));
      dispatch(resetSearchResults());
    }
  }, [debouncedKeyword, setSearchParams, dispatch]);

  function handleAddtoCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity >= getTotalStock) {
          toast({
            title: `Only ${getTotalStock} quantity available for this item`,
            variant: "destructive",
          });
          return;
        }
      }
    }

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
          title: "Product added to cart",
          style: {
            backgroundColor: "white",
            color: "black",
          },
          duration: 3000,
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-3xl">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-4 px-6 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 w-full"
            placeholder="Search Products..."
          />
        </div>
      </div>
  
      {/* No results found message */}
      {!searchResults?.length ? (
        <p className="font-extrabold text-center text-gray-300 text-3xl">No results found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {/* Displaying Product Tiles */}
          {searchResults.map((item) => (
            <ShoppingProductTile
              key={item.id} // Ensure unique key
              handleAddtoCart={handleAddtoCart}
              product={item}
              handleGetProductDetails={handleGetProductDetails}
            />
          ))}
        </div>
      )}
  
      {/* Product Details Dialog */}
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
  
  
}

export default SearchProducts;

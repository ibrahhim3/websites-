import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);

  
  function handleAddToCart(getCurrentProductId) {
  /*  let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `Only ${getQuantity} quantity can be added for this item`,
            variant: "destructive",
          });

          return;
        }
      }
    }*/
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
        });
      }
    });
  }
  
  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
   
  }
  
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] bg-white">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className=" text-gray-500 text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold  text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold  text-gray-500">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>

          <div className=" flex item-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-black" />

              <StarIcon className="w-5 h-5 fill-black" />

              <StarIcon className="w-5 h-5 fill-black" />

              <StarIcon className="w-5 h-5 fill-black" />

              <StarIcon className=" w-5 h-5 fill-black" />
            </div>

            <span className="text-gray-500">(4.5)</span>
          </div>

          <div className="mt-5 mb-5">
            <Button  onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                 
                  )
                } className="w-full bg-red-600 hover:bg-red-700 text-black">
              Add to Cart
            </Button>
          </div>

          <Separator className="bg-gray-200" />

          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>

                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">user name</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className=" w-5 h-5 fill-black" />
                  </div>
                  
                  <p className="text-gray-500"> this is an awsome products</p>
                </div>
                
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>

                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">user name</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className=" w-5 h-5 fill-black" />
                  </div>
                  
                  <p className="text-gray-500"> this is an awsome products</p>
                </div>
                
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>

                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">user name</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className="w-5 h-5 fill-black" />

                    <StarIcon className=" w-5 h-5 fill-black" />
                  </div>
                  
                  <p className="text-gray-500"> this is an awsome products</p>
                </div>
                
              </div>
            </div>
            <div className="mt-6 flex gap-2">
            <Input placeholder="write a review..."/>
            <Button className='bg-gray-700 text-white'>submit</Button>


            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;

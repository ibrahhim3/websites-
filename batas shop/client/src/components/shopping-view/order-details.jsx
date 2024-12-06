import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView() {

  return (
    <DialogContent className="bg-white sm:max-w-[600px]">
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>12345</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>12/01/2024</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Price</p>
          <Label>$1000</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Label>in Process</Label>
        </div>
      </div>
      <Separator className="bg-gray-200" />
      <div className=" grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span>product one </span>
              <span> $1000</span>
            </li>
          </ul>
        </div>
      </div>
      <div className=" grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shipping Info</div>
          <div className="text-gray-500 grid gap-0.5 text-muted-foreground">
            <span  >Ibrahim</span>
            <span>Adress</span>
            <span>City</span>
            <span>Pincode</span>
            <span>phone num</span>
            <span>Note</span>
          </div>
        </div>
      </div> 
    </div>
  </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
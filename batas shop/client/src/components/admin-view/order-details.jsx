import { Label } from "../ui/label";
import { DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import CommonForm from "../common/form";
import { useState } from "react";


const initialFormData = {
    status: "",
  };
  
function AdminOrderDetailsView() {
    const [formData, setFormData] = useState(initialFormData);

    function handleUpdateStatus(event) {
        event.preventDefault();
    }

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


        <CommonForm
      formControls={[
        {
          label: "Order Status",
          name: "status",
          componentType: "select",
          options: [
            { id: "pending", label: "Pending" },
            { id: "inProcess", label: "In Process" },
            { id: "inShipping", label: "In Shipping" },
            { id: "delivered", label: "Delivered" },
            { id: "rejected", label: "Rejected" },
          ],
        },
      ]}

      formData={formData}
      setFormData={setFormData}
      buttonText={"Update Order Status"}
      onSubmit={handleUpdateStatus}
        
        />
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetailsView;

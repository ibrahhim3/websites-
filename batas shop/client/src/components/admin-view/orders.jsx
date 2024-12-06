import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";

function AdminOrdersView() {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1234556</TableCell>
              <TableCell>27/11/2024</TableCell>
              <TableCell>In Process</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog   open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}  >

                <Button  onClick={() =>
                           setOpenDetailsDialog(true)
                          } className="bg-red-600 text-white hover:bg-red-700 hover:text-gray-100">
                  View Details
                </Button>
                <AdminOrderDetailsView/>
                </Dialog>
              
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;

import ProductImageUpload from "@/components/admin-view/image-uplaod";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
     ;
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button
        onClick={handleUploadFeatureImage}
        className="bg-gray-400 hover:bg-black text-white mt-5 w-full"
      >
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList.length > 0 ? (
          featureImageList.map((featureImgItem) => (
            <div key={featureImgItem.id} className="relative">
              <img
                src={featureImgItem.image}
                alt={`Feature image ${featureImgItem.id}`}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
          ))
        ) : (
          <p>No feature images available</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

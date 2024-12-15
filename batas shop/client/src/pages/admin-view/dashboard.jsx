import ProductImageUpload from "@/components/admin-view/image-uplaod";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages, deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "@/components/ConfirmationModal"; // Ensure the file has .jsx or .tsx extension

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [imageToDelete, setImageToDelete] = useState(null); // Store image ID to delete
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  // Handle upload
  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    });
  }

  // Open confirmation modal
  const openDeleteModal = (id) => {
    setImageToDelete(id);
    setIsModalOpen(true);
  };

  // Close confirmation modal
  const closeModal = () => {
    setIsModalOpen(false);
    setImageToDelete(null);
  };

  // Handle delete with confirmation
  const handleDeleteFeatureImage = () => {
    dispatch(deleteFeatureImage(imageToDelete)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages()); // Refresh list after deletion
        closeModal(); // Close the modal after successful deletion
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

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
            <div key={featureImgItem._id} className="relative border rounded-lg">
              <img
                src={featureImgItem.image}
                alt={`Feature image ${featureImgItem._id}`}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <Button
                onClick={() => openDeleteModal(featureImgItem._id)} // Open modal when clicking delete
                className="bg-red-600 hover:bg-red-700 text-white mt-2 w-full"
              >
                Delete
              </Button>
            </div>
          ))
        ) : (
          <p>No feature images available</p>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this image?"
        onConfirm={handleDeleteFeatureImage}
        onCancel={closeModal}
      />
    </div>
  );
}

export default AdminDashboard;

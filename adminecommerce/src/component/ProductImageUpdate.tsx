import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNotify, useRedirect } from "react-admin";
import axios from "axios";
import "./css/ProductImageUpdate.css"; // Import your CSS file for styling

const ProductImageUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const notify = useNotify();
  const redirect = useRedirect();
  const token = localStorage.getItem("jwt-token");

  // Fetch current image when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/admin/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCurrentImage(response.data.image); // Assuming the response contains an 'image' field
      } catch (error) {
        notify("Error fetching product data.");
        console.error(error);
      }
    };

    fetchProduct();
  }, [id, token, notify]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setPreview(previewUrl);
      }
    }
  };
  const handleUpload = async () => {
    if (!file) {
      notify("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.put(
        `http://localhost:8080/api/admin/products/${id}/image`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      notify("Image updated successfully.");
      redirect("/products");
    } catch (error) {
      notify("Error updating image.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Cập nhật hình ảnh cho sản phẩm {id}</h2>
      <div className="image-preview">
        {preview ? (
          <img src={preview} alt="Image preview" className="preview-img" />
        ) : currentImage ? (
          <img
            src={`http://localhost:8080/api/public/products/image/${currentImage}`}
            alt="Current Product"
            className="preview-img"
          />
        ) : (
          <p>Chưa có hình ảnh</p>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleUpload} className="upload-button">
        Cập nhật
      </button>
    </div>
  );
};

export default ProductImageUpdate;

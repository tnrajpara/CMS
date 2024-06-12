"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { db, storage } from "../../../../firebase";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CloseIcon from "@mui/icons-material/Close";

import Skeleton from "../../components/Skeleton";

const Page: React.FC = () => {
  const path = usePathname();
  const id = path.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    sizes: [
      { name: "XS", quantity: 0 },
      { name: "S", quantity: 0 },
      { name: "M", quantity: 0 },
      { name: "L", quantity: 0 },
      { name: "XL", quantity: 0 },
      { name: "XXL", quantity: 0 },
    ] as { name: string; quantity: number }[],
    price: "",
    coverImage: "",
    category: "T-shirt",
    images: [] as string[],
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const fetchProduct = async () => {
    const productRef = doc(db, "products", id);
    const docRef = await getDoc(productRef);

    if (docRef.exists()) {
      setLoading(false);
      setProduct(docRef.data() as any);
    } else {
      setProduct({
        name: "",
        description: "",
        price: "",
        coverImage: "",
        category: "T-shirt",
        images: [],
        sizes: [
          { name: "XS", quantity: 0 },
          { name: "S", quantity: 0 },
          { name: "M", quantity: 0 },
          { name: "L", quantity: 0 },
          { name: "XL", quantity: 0 },
          { name: "XXL", quantity: 0 },
        ],
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedImageIndex !== null) {
      const storageRef = ref(
        storage,
        `${product.name}/cover ${selectedImageIndex}`
      );

      // Upload new image
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(
        ref(storageRef, `cover ${selectedImageIndex}`)
      );

      setProduct((prevProduct) => {
        const updatedImages = [...prevProduct.images];
        updatedImages[selectedImageIndex] = downloadURL;
        return {
          ...prevProduct,
          images: updatedImages,
        };
      });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleCoverImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `${product.name} cover`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(ref(storageRef));
      setProduct((prevProduct) => ({
        ...prevProduct,
        coverImage: downloadURL,
      }));
    }
  };

  const updateProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name: product.name,
        description: product.description,
        price: +product.price,
        category: product.category,
        sizes: product.sizes,
        images: product.images,
        coverImage: product.coverImage,
      });
      alert("Product updated successfully");
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <div className="mx-auto bg-gray-900 text-white p-8 ">
            <form onSubmit={updateProduct}>
              <div className="mb-6">
                <label className="block text-xl font-bold mb-3">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="block w-full p-4 rounded bg-gray-800 text-white text-xl"
                  value={product.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-xl font-bold mb-3">
                  Description
                </label>
                <textarea
                  name="description"
                  className="block w-full h-5/6 lg:h-[20rem]  p-4 rounded bg-gray-800 text-white text-xl"
                  value={product.description}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-xl font-bold mb-3">Price</label>
                <input
                  type="number"
                  name="price"
                  className="block w-full p-4 rounded bg-gray-800 text-white text-xl"
                  value={product.price.toString()}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-6">
                <label className="block text-xl font-bold mb-3">
                  Cover Image
                </label>
                {product.coverImage && (
                  <div className="relative h-48 w-48 mb-3">
                    <span
                      className="absolute right-2 top-2 cursor-pointer text-red-500"
                      onClick={() =>
                        setProduct((prevProduct) => ({
                          ...prevProduct,
                          coverImage: "",
                        }))
                      }
                    >
                      <CloseIcon />
                    </span>
                    <img
                      className="h-48 w-48 rounded-lg object-cover"
                      src={product.coverImage}
                      alt="Cover"
                    />
                  </div>
                )}

                {product.coverImage === "" && (
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-xl bg-gray-800 text-white p-4 rounded"
                    onChange={handleCoverImage}
                  />
                )}
              </div>
              <div className="mb-6">
                <label className="block text-xl font-bold mb-3">Category</label>
                <select
                  name="category"
                  className="block w-full p-4 rounded bg-gray-800 text-white text-xl"
                  value={product.category}
                  onChange={handleChange}
                >
                  <option value="T-shirt">T-shirt</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Hoodie">Hoodie</option>
                </select>
              </div>

              <div className="mb-6  ">
                <label className="block text-xl font-bold mb-3">Sizes</label>
                <div className="space-x-2 flex">
                  {product.sizes.map((size, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <label htmlFor={`size-${size.name}`} className="text-xl">
                        {size.name}
                      </label>
                      <input
                        type="number"
                        id={`size-${size.name}`}
                        className="w-16 px-4 py-2 rounded bg-gray-800 text-white text-xl"
                        value={size.quantity}
                        onChange={(e) => {
                          const newSizes = [...product.sizes];
                          if (newSizes[index].quantity >= 0) {
                            newSizes[index].quantity = +e.target.value;
                            setProduct((prevProduct) => ({
                              ...prevProduct,
                              sizes: newSizes,
                            }));
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xl font-bold mb-3">
                  Update Specific Cover Image
                </label>
                <div className="grid grid-cols-3  gap-4">
                  {product.images.map((img, index) => (
                    <div key={index} className=" flex flex-col space-y-2">
                      <img
                        src={img}
                        alt={`Cover ${index}`}
                        className=" object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        className=" bg-red-600 p-1 rounded-full text-white"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        Update
                      </button>
                    </div>
                  ))}
                </div>
                {selectedImageIndex !== null && (
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-xl bg-gray-800 text-white p-4 rounded mt-4"
                    onChange={handleImageChange}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded text-xl"
              >
                Update
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Page;

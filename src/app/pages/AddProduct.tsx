import { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddProduct: React.FC = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [images, setImages] = useState<FileList | null>(null);
  const [category, setCategory] = useState<string>("T-shirt");
  const [sizes, setSizes] = useState([
    { name: "XS", quantity: 0 },
    { name: "S", quantity: 0 },
    { name: "M", quantity: 0 },
    { name: "L", quantity: 0 },
    { name: "XL", quantity: 0 },
    { name: "XXL", quantity: 0 },
  ]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (images && coverImage) {
      const storageRef = ref(storage, `${productName}`);
      const imageUploadPromises: Promise<void>[] = [];

      Array.from(images).forEach((image, index) => {
        const imageRef = ref(storageRef, `cover ${index}`);
        const uploadTask = uploadBytesResumable(imageRef, image).then();
        imageUploadPromises.push(uploadTask);
      });

      await Promise.all(imageUploadPromises);

      const urls = await Promise.all(
        Array.from(images).map(async (_, index) => {
          const imageRef = ref(storageRef, `cover ${index}`);
          return getDownloadURL(imageRef);
        })
      );

      const coverImageRef = ref(storage, `${productName} cover`);
      await uploadBytesResumable(coverImageRef, coverImage);
      const coverImageUrl = await getDownloadURL(coverImageRef);

      try {
        const docRef = await addDoc(collection(db, "products"), {
          name: productName,
          description,
          price: +price,
          category,
          images: urls,
          coverImage: coverImageUrl,
          sizes,
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Product added successfully");
      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("T-shirt");
        setSizes([
          { name: "XS", quantity: 0 },
          { name: "S", quantity: 0 },
          { name: "M", quantity: 0 },
          { name: "L", quantity: 0 },
          { name: "XL", quantity: 0 },
          { name: "XXL", quantity: 0 },
        ]);
        setImages(null);
        setCoverImage(null);
      }
    }
  };

  return (
    <div className="mx-auto bg-gray-900 text-white p-8 ">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="product-name"
            className="block text-xl font-bold mb-3"
          >
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            className="w-full px-4 py-2  rounded  bg-gray-800 text-white text-xl"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="product-price"
            className="block text-xl font-bold mb-3"
          >
            Price
          </label>
          <input
            type="number"
            id="product-price"
            className="w-full px-4 py-2  rounded  bg-gray-800 text-white text-xl"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block text-xl font-bold mb-3">
            Description
          </label>
          <textarea
            id="description"
            className="w-full lg:h-[20rem] h-5/6 px-4 py-2  rounded  bg-gray-800 text-white text-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="category" className="block text-xl font-bold mb-3">
            Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2  rounded  bg-gray-800 text-white text-xl"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {["T-shirt", "Shirt", "Hoodie"].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6  ">
          <label className="block text-xl font-bold mb-3">Sizes</label>
          <div className="flex space-x-2">
            {sizes.map((size, index) => (
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
                    const newSizes = [...sizes];
                    if (newSizes[index].quantity >= 0) {
                      newSizes[index].quantity = +e.target.value;
                      setSizes(newSizes);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-xl font-bold mb-3">
            Image (1 to 5)
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="w-full px-4 py-2  rounded  bg-gray-800 text-white text-xl"
            multiple
            onChange={handleImageChange}
          />
        </div>

        {images && (
          <div className="flex mb-3 items-center space-x-2">
            {Array.from(images).map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                className="rounded-md w-44 h-44 object-cover"
                alt={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="cover-image" className="block text-xl font-bold mb-3">
            Upload Cover Image
          </label>
          <input
            type="file"
            id="cover-image"
            accept="image/*"
            className="w-full px-4 py-2  rounded f bg-gray-800 text-white text-xl"
            onChange={(e) => {
              if (e.target.files) {
                setCoverImage(e.target.files[0]);
              }
            }}
          />
        </div>

        {coverImage && (
          <div className="flex mb-3 items-center">
            <img
              src={URL.createObjectURL(coverImage)}
              className="rounded-md w-44 h-44 object-cover"
              alt="Cover"
            />
          </div>
        )}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-4 mb-4 font-semibold py-2 px-4 rounded "
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

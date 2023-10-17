import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsCreate } from "../../slices/sliceProducts";
import { useNavigate } from "react-router-dom";

export default function CreateProducts() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.products);
    const { stateCategoryProducts } = useSelector((state) => state.categoryProducts);
    const navigate = useNavigate();

    const [nameProducts, setNameProducts] = useState("");
    const [categoryProducts, setCategoryProducts] = useState(0);
    const [priceProducts, setPriceProducts] = useState(0);
    const [descriptionProducts, setDescriptionProducts] = useState("");
    const [dateProducts, setDateProducts] = useState("");

    const handleCreateProducts = async (e) => {
        e.preventDefault();
        // console.log(nameProducts);
        // console.log(categoryProducts);
        // console.log(priceProducts);
        // console.log(descriptionProducts);
        // console.log(dateProducts);
        const catP = parseInt(categoryProducts, 10);
        const priceP = parseInt(priceProducts, 10);
        
        dispatch(productsCreate({
            productName: nameProducts,
            categoryId: catP,
            price: priceP,
            description: descriptionProducts,
            createdAt: dateProducts,
        }));

        setNameProducts("");
        setCategoryProducts("");
        setPriceProducts("");
        setDescriptionProducts("");
        setDateProducts("");
        navigate("/products");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Produk Baru</h1>
                <form onSubmit={handleCreateProducts}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Produk :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Produk"
                            value={nameProducts}
                            onChange={(e) => setNameProducts(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kategori Produk :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setCategoryProducts(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Kategori
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateCategoryProducts.map((item) => (
                                <option key={item.category_id} value={item.category_id}>
                                    {item.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Harga Produk :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Produk"
                            value={priceProducts}
                            onChange={(e) => setPriceProducts(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Deskripsi Produk :
                        </label>
                        <textarea
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Deskripsi Produk"
                            rows="3"
                            value={descriptionProducts}
                            onChange={(e) => setDescriptionProducts(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Dibuat :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Dibuatnya Produk"
                            value={dateProducts}
                            onChange={(e) => setDateProducts(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>

                    {/* <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                    </div>
                    <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div> */}
                </form>
            </div>
            <div>
                <div className="w-[400px] h-[400px] bg-gray-400 rounded-lg shadow-md mt-[45px] ml-[30px]">
                    <div className="p-4">
                        <div className="flex items-center justify-center h-[368px]">
                            {/* {productImg ? (
                                <img src={productImg} alt="Product Preview" className="max-w-full" />
                            ) : ( */}
                            <p className="text-gray-100 text-lg">
                                Gambar akan muncul disini!
                            </p>
                            {/* )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

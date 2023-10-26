import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bomCreate } from "../../../slices/sliceBom";
import { useNavigate } from "react-router-dom";

export default function CreateBom() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.bom);
    const { stateProducts } = useSelector((state) => state.products);
    const { stateMaterials } = useSelector((state) => state.materials);
    const navigate = useNavigate();

    const [nameProducts, setNameProducts] = useState(0);
    const [nameMaterials, setNameMaterials] = useState(0);
    const [satuan, setSatuan] = useState("");
    const [jumlah, setJumlah] = useState(0);

    const [foundProd, setFoundProd] = useState({});

    useEffect(() => {
        setFoundProd(stateProducts.find(foundProd => foundProd.product_id === parseInt(nameProducts)));
    }, [nameProducts]);

    const handleCreateBom = async (e) => {
        e.preventDefault();

        const jmlBom = parseInt(jumlah, 10);

        dispatch(bomCreate({
            productsName: nameProducts,
            materialsName: nameMaterials,
            satuan: satuan,
            jumlah: jmlBom,
        }));

        setNameProducts("");
        setNameMaterials("");
        setSatuan("");
        setJumlah("");
        navigate("/bom");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Bill of Materials</h1>
                <form onSubmit={handleCreateBom}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Produk :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameProducts(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Produk
                            </option>
                            {/* memanggil isi dari produk menggunakan state */}
                            {stateProducts.map((item) => (
                                <option key={item.product_id} value={item.product_id}>
                                    {item.product_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Bahan Baku :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameMaterials(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Bahan Baku
                            </option>
                            {/* memanggil isi dari material menggunakan state */}
                            {stateMaterials.map((item) => (
                                <option key={item.material_id} value={item.material_id}>
                                    {item.material_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Satuan Bahan Baku :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Jenis Satuan Bahan Baku"
                            value={satuan}
                            onChange={(e) => setSatuan(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Jumlah :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Jumlah Bahan Baku"
                            value={jumlah}
                            onChange={(e) => setJumlah(e.target.value)}
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
                <div className="w-[400px] h-[400px] bg-gray-200 rounded-lg shadow-md mt-[45px] ml-[30px]">
                    <div className="p-4">
                        <div className="flex items-center justify-center h-[368px]">
                            {(foundProd ? foundProd.image:"") ? (
                                <img src={require(`../../../../../API_Wardrobe/uploads/${foundProd.image}`)} alt="Product Preview" className="w-full" />
                            ) : (
                                <p className="text-dark text-lg">
                                    Gambar akan muncul disini!
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { materialsEdit } from "../../slices/sliceMaterials";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMaterials() {
    const dispatch = useDispatch();
    const { createStatus, stateMaterials } = useSelector((state) => state.materials);
    const { stateSupplier } = useSelector((state) => state.supplier);
    const { mId } = useParams();

    const navigate = useNavigate();

    const [nameMaterials, setNameMaterials] = useState("");
    const [supMaterials, setSupMaterials] = useState([]);
    const [priceMaterials, setPriceMaterials] = useState(0);
    const [qtyMaterials, setQtyMaterials] = useState(0);
    const selectedMat = stateMaterials.find((item) => item.material_id === parseInt(mId, 10));

    useEffect(() => {
        // const selectedMat = stateMaterials.find((item) => item.material_id === parseInt(mId, 10));
        if (selectedMat) {
            setNameMaterials(selectedMat.material_name)
            setSupMaterials(selectedMat.supplier_id);
            setPriceMaterials(selectedMat.price);
            setQtyMaterials(selectedMat.quantity_in_stock);
        }
    }, [mId, stateMaterials]);

    const handleEditMaterials = async (e) => {
        e.preventDefault();
        const supM = parseInt(supMaterials, 10);
        const priceM = parseInt(priceMaterials, 10);

        dispatch(materialsEdit({
            material: {
                materialId: parseInt(mId, 10),
                materialName: nameMaterials,
                supId: supM,
                price: priceM,
                quantity: qtyMaterials,
            }
        }));
        navigate("/materials");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat Bahan Baku</h1>
                <form onSubmit={handleEditMaterials}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Bahan Baku :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            placeholder="Isi Nama Bahan Baku"
                            value={nameMaterials}
                            onChange={(e) => setNameMaterials(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Supplier :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSupMaterials(e.target.value)}
                            required
                            defaultValue={selectedMat.supplier_id}
                        >
                            <option value="cat" disabled hidden>
                                Pilih Supplier
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateSupplier.map((item) => (
                                <option key={item.supplier_id} value={item.supplier_id}>
                                    {item.supplier_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Harga Bahan Baku :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Bahan Baku"
                            value={priceMaterials}
                            onChange={(e) => setPriceMaterials(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Stok :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Bahan Baku"
                            value={qtyMaterials}
                            onChange={(e) => setQtyMaterials(e.target.value)}
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

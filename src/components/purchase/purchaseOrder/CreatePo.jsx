import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { poCreate } from "../../../slices/slicePo";

export default function CreatePo() {
    const dispatch = useDispatch();
    const { createStatus } = useSelector((state) => state.po);
    const { stateSupplier } = useSelector((state) => state.supplier);
    const { stateMaterials } = useSelector((state) => state.materials);
    const navigate = useNavigate();

    const [nameSupplier, setNameSupplier] = useState(0);
    const [nameMaterial, setNameMaterial] = useState(0);
    const [priceUnit, setPriceUnit] = useState(0);
    const [qtyDemand, setQtyDemand] = useState(0);
    const [totalPo, setTotalPo] = useState(0);
    const [tglPo, setTglPo] = useState("");

    const [filteredMat, setFilteredMat] = useState("");
    const [selectedMat, setSelectedMat] = useState("");

    useEffect(() => {
        setFilteredMat(nameSupplier ? stateMaterials.filter((item) => item.supplier_id === parseInt(nameSupplier, 10)) : "");
        setNameMaterial(0);
    }, [nameSupplier, stateMaterials]);

    useEffect(() => {
        setSelectedMat(nameMaterial && filteredMat ? filteredMat.filter((item) => item.material_id === parseInt(nameMaterial, 10)) : "");
    }, [nameMaterial, filteredMat]);

    useEffect(() => {
        const price = selectedMat ? selectedMat.map((item) => item.price) : 0;
        setPriceUnit(price);
    }, [selectedMat]);

    useEffect(() => {
        setTotalPo(qtyDemand * priceUnit);
    }, [priceUnit, qtyDemand]);

    const handleCreatePo = async (e) => {
        e.preventDefault();

        dispatch(poCreate({
            supplierId: nameSupplier,
            materialId: nameMaterial,
            quantityDemand: qtyDemand,
            total: totalPo,
            tanggal: tglPo,
            orderStatus: "RFQ",
            paymentStatus: "Nothing to Bill",
        }));

        setNameSupplier("");
        setNameMaterial("");
        setQtyDemand("");
        setTotalPo("");
        setTglPo("");
        navigate("/po");
    };

    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Membuat PO</h1>
                <form onSubmit={handleCreatePo}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Supplier :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameSupplier(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" disabled hidden>
                                Pilih Supplier
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {stateSupplier && stateSupplier.map((item) => (
                                <option key={item.supplier_id} value={item.supplier_id}>
                                    {item.supplier_name}
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
                            onChange={(e) => setNameMaterial(e.target.value)}
                            required
                            defaultValue="cat"
                        >
                            <option value="cat" hidden>
                                Pilih Bahan Baku
                            </option>
                            {/* memanggil isi dari kategori menggunakan state */}
                            {filteredMat && filteredMat.map((item) => (
                                <option key={item.material_id} value={item.material_id}>
                                    {item.material_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Harga Per Unit :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={priceUnit}
                            onChange={(e) => setPriceUnit(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kuantitas :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Bahan Baku"
                            value={qtyDemand}
                            onChange={(e) => setQtyDemand(e.target.value)}
                            required
                            min={0}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={totalPo}
                            onChange={(e) => setTotalPo(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Order :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Order"
                            value={tglPo}
                            onChange={(e) => setTglPo(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {createStatus === "pending" ? "Submitting" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

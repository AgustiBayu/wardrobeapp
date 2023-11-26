import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { poEdit } from "../../../slices/slicePo";
import { materialsEdit } from "../../../slices/sliceMaterials";

export default function EditReceiveDemand() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createStatus, statePo } = useSelector((state) => state.po);
    const { stateMaterials } = useSelector((state) => state.materials);
    const { poId } = useParams();
    const selectedPo = statePo.find((item) => item.orderPO_id === parseInt(poId, 10));
    const selectedMat = stateMaterials.find((item) => item.material_id === selectedPo.material_id);

    const [nameSupplier, setNameSupplier] = useState(0);
    const [nameMaterial, setNameMaterial] = useState(0);
    const [qtyDemand, setQtyDemand] = useState(0);
    const [qtyReceive, setQtyReceive] = useState(0);
    const [totalPo, setTotalPo] = useState(0);
    const [tglPo, setTglPo] = useState("");

    console.log(selectedPo);
    console.log(selectedMat);

    useEffect(() => {
        if (selectedPo) {
            setNameSupplier(selectedPo.supplier_id);
            setNameMaterial(selectedPo.material_id);
            setQtyDemand(selectedPo.quantity_demand);
            setQtyReceive(selectedPo.quantity_receive);
            setTotalPo(selectedPo.total);
            setTglPo(selectedPo.tanggal);
        }
    }, [poId, statePo]);

    const handleReceiveDemand = async () => {
        dispatch(poEdit({
            po: {
                poId: parseInt(poId, 10),
                supplierId: nameSupplier,
                materialId: nameMaterial,
                quantityDemand: qtyDemand,
                quantityReceive: qtyReceive,
                total: totalPo,
                tanggal: tglPo,
                orderStatus: "PO",
                paymentStatus: qtyReceive < qtyDemand ? "Nothing to Bill" : "Waiting Bills",
            }
        }));
        dispatch(materialsEdit({
            material: {
                materialId: selectedMat.material_id,
                materialName: selectedMat.material_name,
                supId: selectedMat.supplier_id,
                price: selectedMat.price,
                quantity: qtyReceive < qtyDemand ? selectedMat.quantity_in_stock : selectedMat.quantity_in_stock + parseInt(qtyReceive, 10),
            }
        }));
        navigate("/po/receive-demand");
    };
    return (
        <div className="grid grid-cols-2">
            <div className="w-[400px]">
                <h1 className="font-bold text-xl mb-3">Receive Demand</h1>
                <form onSubmit={handleReceiveDemand}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kuantitas :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder={qtyDemand}
                            onChange={(e) => setQtyDemand(e.target.value)}
                            required
                            readOnly
                            min={0}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Diterima :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            value={qtyReceive}
                            onChange={(e) => setQtyReceive(e.target.value)}
                            required
                            min={0}
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
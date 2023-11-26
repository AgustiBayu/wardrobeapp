import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { poEdit } from "../../../slices/slicePo";

export default function EditConfirmRfq() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createStatus, statePo } = useSelector((state) => state.po);
    const { poId } = useParams();
    const selectedPo = statePo.find((item) => item.orderPO_id === parseInt(poId, 10));

    const [nameSupplier, setNameSupplier] = useState(0);
    const [nameMaterial, setNameMaterial] = useState(0);
    const [priceUnit, setPriceUnit] = useState(0);
    const [qtyDemand, setQtyDemand] = useState(0);
    const [totalPo, setTotalPo] = useState(0);
    const [tglPo, setTglPo] = useState("");

    useEffect(() => {
        if (selectedPo) {
            setNameSupplier(selectedPo.supplier_id);
            setNameMaterial(selectedPo.material_id);
            setPriceUnit(selectedPo.price);
            setQtyDemand(selectedPo.quantity_demand);
            setTotalPo(selectedPo.total);
            setTglPo(selectedPo.tanggal);
        }
    }, [poId, statePo]);

    const handleUpdate = async () => {
        dispatch(poEdit({
            po: {
                poId: parseInt(poId, 10),
                supplierId: nameSupplier,
                materialId: nameMaterial,
                quantityDemand: qtyDemand,
                quantityReceive: selectedPo.quantity_receive,
                total: totalPo,
                tanggal: tglPo,
                orderStatus: "PO",
                paymentStatus: "Nothing to Bill",
            }
        }));
        navigate("/po/confirm-rfq");
    };
    return (
        <div className="flex items-center justify-center">
            <div className="flex w-[400px] h-[250px] bg-gray-200 rounded-lg shadow-md">
                <div className="flex p-4 w-[100%] h-[100%]">
                    <div className="flex flex-col items-center justify-center h-[100%] w-[100%]">
                        <div className="flex w-[100%] h-[50px] justify-center item-center">
                            <h1 className="text-xl font-bold">Anda Yakin?</h1>
                        </div>
                        <div className="flex w-[100%] h-[50px]">
                            <button onClick={handleUpdate} className="w-[100%] focus:outline-none text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                {createStatus === "pending" ? "Submitting" : "Ya"}
                            </button>
                        </div>
                        <div className="flex w-[100%] h-[50px] mt-[15px]">
                            <button onClick={() => navigate("/po/confirm-rfq")} className="w-[100%] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
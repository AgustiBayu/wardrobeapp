import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { moEdit } from "../../../slices/sliceMo";
import { useEffect, useState } from "react";
import { materialsEdit } from "../../../slices/sliceMaterials";

export default function EditCheckAvailability() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { createStatus, stateMo } = useSelector((state) => state.mo);
    const { stateBom } = useSelector((state) => state.bom);
    const { stateMaterials } = useSelector((state) => state.materials);
    const { moId } = useParams();
    const selectedMo = stateMo.find((item) => item.orderMO_id === parseInt(moId, 10));

    const [prodId, setProdId] = useState(0);
    const [moQty, setMoQty] = useState(0);
    const [moTotal, setMoTotal] = useState(0);
    const [moDate, setMoDate] = useState("");

    const pId = selectedMo.product_id;
    const filteredBom = stateBom.filter((bomItem) => bomItem.product_id === pId);
    const filteredJmlMat = filteredBom.map((filBom) => {
        return {
            material_id: filBom.material_id,
            jumlah: filBom.jumlah * selectedMo.quantity
        };
    });

    const updatedMaterials = stateMaterials.map((item) => {
        const selectedMat = filteredJmlMat.find((updateItem) => updateItem.material_id === item.material_id);
        if (selectedMat) {
            return {
                ...item,
                quantity_in_stock: item.quantity_in_stock - selectedMat.jumlah,
            };
        }
        return item;
    });

    console.log(updatedMaterials);

    useEffect(() => {
        if (selectedMo) {
            setProdId(selectedMo.product_id);
            setMoQty(selectedMo.quantity);
            setMoTotal(selectedMo.total);
            setMoDate(selectedMo.tanggal);
        }
    }, [moId, stateMo]);

    const handleUpdate = async () => {
        stateMo.filter((item) => item)
        dispatch(moEdit({
            mo: {
                moId: parseInt(moId, 10),
                productId: prodId,
                quantity: moQty,
                total: moTotal,
                statusMo: "Available",
                tanggal: moDate,
            }
        }));

        updatedMaterials.map((item)=>{
            dispatch(materialsEdit({
                material: {
                    materialId: item.material_id,
                    materialName: item.material_name,
                    supId: item.supplier_id,
                    price: item.price,
                    quantity: item.quantity_in_stock,
                }
            }));
        })
        navigate("/mo/check-availability")
    }
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
                            <button onClick={() => navigate("/materials")} className="w-[100%] text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moFetch } from "../../../slices/sliceMo";

export default function CheckAvailability() {
    const dispatch = useDispatch();
    const { stateMo, stateRefreshMo } = useSelector((state) => state.mo); //deklarasi state yang diambil dari sliceMo.js
    const { stateBom } = useSelector((state) => state.bom);
    const { stateMaterials } = useSelector((state) => state.materials);
    const navigate = useNavigate();

    const [availability, setAvailability] = useState(false);

    console.log(stateBom);

    useEffect(() => {
        dispatch(moFetch());
    }, [stateRefreshMo]);

    // mengeluarkan isi data dari dalam state material
    const rows =
        stateMo &&
        stateMo.map((item) => {

            return {
                id: item.orderMO_id,
                idP: item.product_id,
                moNameProd: item.product_name,
                moQty: item.quantity,
                moTotal: item.total,
                moDate: item.tanggal,
                moStatus: item.status,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "idP", headerName: "ID Product", width: 60, hide: true, filterable: false },
        { field: "moNameProd", headerName: "Nama Produk", width: 110 },
        { field: "moQty", headerName: "Jumlah Order", width: 110 },
        { field: "moTotal", headerName: "Total Order", width: 100 },
        { field: "moDate", headerName: "Tanggal Terjadwal", width: 200 },
        { field: "moStatus", headerName: "Status Order", width: 110 },
        {
            field: "availability",
            headerName: "Ketersediaan Bahan",
            width: 150,
            renderCell: (params) => {
                const moId = params.row.id;
                const pId = params.row.idP;

                const filteredMo = stateMo.find((moItem) => moItem.orderMO_id === moId);

                const filteredBom = stateBom.filter((bomItem) => bomItem.product_id === pId);
                const filteredJmlMat = filteredBom.map((filBom) => {
                    return {
                        material_id: filBom.material_id,
                        jumlah: filBom.jumlah * filteredMo.quantity,
                    };
                });

                const allAmountsInStock = filteredJmlMat.every(({ material_id, jumlah }) => {
                    const correspondingItem = stateMaterials.find((item) => item.material_id === material_id);
                    return correspondingItem && jumlah <= correspondingItem.quantity_in_stock;
                });
                allAmountsInStock ? setAvailability(allAmountsInStock) : "";

                console.log(filteredMo);

                return (
                    <div>
                        {allAmountsInStock ? (
                            <span className="text-green-600 font-bold">Available</span>
                        ) : allAmountsInStock || filteredMo.status === "Available" || filteredMo.status === "Finished" ? (
                            <span className="text-green-600 font-bold">Available</span>
                        ) : (
                            <span className="text-red-600 font-bold">Insufficient</span>
                        )}
                    </div>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 280,
            renderCell: (params) => {
                const moId = params.row.id;

                const filteredMo = stateMo.filter((moItem) => moItem.orderMO_id === moId);
                const statusMo = filteredMo.find((moStatus) => moStatus.status);

                return (
                    <div>
                        {statusMo && statusMo.status === "Pending" ? (
                            <span className="text-red-600 font-bold">Order Isn't Confirmed Yet</span>
                        ) : statusMo && statusMo.status === "Confirmed" && availability ? (
                            <button onClick={() => navigate(`/mo/check-availability-edit/${moId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded">
                                Confirm Availability
                            </button>
                        ) : statusMo && statusMo.status === "Confirmed" && !availability ? (
                            <span className="text-red-600 font-bold">Insufficient Materials</span>
                        ) : statusMo && statusMo.status === "Available" ? (
                            <span className="text-blue-600 font-bold">Starting Manufacture</span>
                        ) : statusMo && statusMo.status === "Finished" ? (
                            <span className="text-green-600 font-bold">Finished</span>
                        ) : (
                            <span className="font-bold">Disabled</span>
                        )}
                        <button onClick={() => navigate(`/mo/detail-availability/${moId}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-[15px] mr-[15px]">
                            Detail
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl mb-[20px]">Check Availability</h1>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-mo")}>
                Create
            </button> */}
            <DataGrid
                rows={validRows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    );
}
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moFetch } from "../../../slices/sliceMo";

export default function MoList() {
    const dispatch = useDispatch();
    const { stateMo, stateRefreshMo } = useSelector((state) => state.mo); //deklarasi state yang diambil dari sliceMo.js
    const navigate = useNavigate();

    console.log(stateMo);

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    useEffect(() => {
        dispatch(moFetch());
    }, [stateRefreshMo]);

    // mengeluarkan isi data dari dalam state material
    const rows =
        stateMo &&
        stateMo.map((item) => {
            return {
                id: item.orderMO_id,
                moNameProd: item.product_name,
                moQty: item.quantity,
                moTotal: item.total,
                moDate: formatDate(item.tanggal),
                moStatus: item.status,
            };
        });
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "moNameProd", headerName: "Nama Produk", width: 130 },
        { field: "moQty", headerName: "Jumlah Order", width: 130 },
        { field: "moTotal", headerName: "Total Order", width: 130 },
        { field: "moDate", headerName: "Tanggal Terjadwal", width: 200 },
        { field: "moStatus", headerName: "Status Order", width: 130 },
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
                            <div>
                                <button onClick={() => navigate(`edit-mo/${moId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                                    Edit
                                </button>
                                <button onClick={() => navigate(`delete-mo/${moId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        ) : statusMo && statusMo.status === "Confirmed" ? (
                            <span className="text-yellow-600 font-bold">Order Confirmed</span>
                        ) : statusMo && statusMo.status === "Available" ? (
                            <span className="text-blue-600 font-bold">Confirmed, Starting Manufacture</span>
                        ) : statusMo && statusMo.status === "Unavailable" ? (
                            <span className="text-red-600 font-bold">Insufficient Materials</span>
                        ) : statusMo && statusMo.status === "Finished" ? (
                            <span className="text-green-600 font-bold">Finished</span>
                        ) : (
                            <span className="font-bold">Disabled</span>
                        )}

                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Manufacturing Orders</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-mo")}>
                Create
            </button>
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
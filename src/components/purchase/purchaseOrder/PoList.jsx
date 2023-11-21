import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { poFetch } from "../../../slices/slicePo";

export default function PoList() {
    const dispatch = useDispatch();
    const { statePo, stateRefreshPo } = useSelector((state) => state.po); //deklarasi state yang diambil dari slicePo.js
    const navigate = useNavigate();

    console.log(statePo);

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
        dispatch(poFetch());
    }, [stateRefreshPo]);

    // mengeluarkan isi data dari dalam state po
    const rows =
        statePo &&
        statePo.map((item) => {
            return {
                id: item.orderPO_id,
                supName: item.supplier_name,
                matName: item.material_name,
                qtyDemand: item.quantity_demand,
                qtyReceive: item.quantity_receive,
                poTotal: item.total,
                poTanggal: formatDate(item.tanggal),
                poOrderStat: item.order_status,
                poPaymentStat: item.payment_status,
            };
        });

    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "supName", headerName: "Supplier", width: 90 },
        { field: "matName", headerName: "Bahan Baku", width: 100 },
        { field: "qtyDemand", headerName: "Permintaan", width: 100 },
        { field: "qtyReceive", headerName: "Diterima", width: 90 },
        { field: "poTotal", headerName: "Total", width: 70 },
        { field: "poTanggal", headerName: "Tanggal Order", width: 120 },
        { field: "poOrderStat", headerName: "Status Order", width: 110 },
        { field: "poPaymentStat", headerName: "Status Payment", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const poId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate(`edit-po/${poId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                            Edit
                        </button>
                        <button onClick={() => navigate(`delete-po/${poId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Delete
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Purchase Order</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-po")}>
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
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { soFetch } from "../../../slices/sliceSo";

export default function SoList() {
    const dispatch = useDispatch();
    const { stateSo, stateRefreshSo } = useSelector((state) => state.so); //deklarasi state yang diambil dari slicePo.js
    const navigate = useNavigate();

    console.log(stateSo);

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
        dispatch(soFetch());
    }, [stateRefreshSo]);

    // mengeluarkan isi data dari dalam state po
    const rows =
        stateSo &&
        stateSo.map((item) => {
            return {
                id: item.order_id,
                cusName: item.customer_name,
                prodName: item.product_name,
                qtyDemand: item.quantity_demand,
                qtyReceive: item.quantity_receive,
                soTotal: item.total,
                soTanggal: formatDate(item.order_date),
                soOrderStat: item.order_status,
                soInvoiceStat: item.invoice_status,
            };
        });

    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "cusName", headerName: "Customer", width: 90 },
        { field: "prodName", headerName: "Produk", width: 100 },
        { field: "qtyDemand", headerName: "Permintaan", width: 100 },
        { field: "qtyReceive", headerName: "Diterima", width: 90 },
        { field: "soTotal", headerName: "Total", width: 70 },
        { field: "soTanggal", headerName: "Tanggal Order", width: 120 },
        { field: "soOrderStat", headerName: "Status Order", width: 110 },
        { field: "soInvoiceStat", headerName: "Status Invoice", width: 150 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const soId = params.row.id;
                const filteredSo = stateSo.filter((soItem) => soItem.order_id === soId);
                const statusSo = filteredSo.find((soStatus) => soStatus.order_status);
                return (
                    <div>
                        {statusSo && statusSo.order_status === "Quotation" && statusSo.invoice_status === "Nothing to Invoice" ? (
                            <div>
                                <button onClick={() => navigate(`edit-so/${soId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                                    Edit
                                </button>
                                <button onClick={() => navigate(`delete-so/${soId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        ) : statusSo && statusSo.order_status === "SO" && statusSo.invoice_status === "Nothing to Invoice" ? (
                            <span className="text-yellow-600 font-bold">Quotation Confirmed</span>
                        ) : statusSo && statusSo.order_status === "SO" && statusSo.invoice_status === "Fully Invoiced" ? (
                            <span className="text-green-600 font-bold">Done</span>
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
            <h1 className="font-bold text-xl">Sales Order</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-so")}>
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
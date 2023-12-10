import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { soFetch } from "../../../slices/sliceSo";
import { paySoFetch } from "../../../slices/slicePaymentSo";

export default function SoReceiveDemand() {
    const dispatch = useDispatch();
    const { stateSo, stateRefreshSo } = useSelector((state) => state.so);
    const { stateRefreshPaySo } = useSelector((state) => state.paySo);
    const { statePaySo } = useSelector((state) => state.paySo);
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

    useEffect(() => {
        dispatch(paySoFetch());
    }, [stateRefreshPaySo]);

    // mengeluarkan isi data dari dalam state po
    const rows =
        stateSo &&
        stateSo.map((item) => {
            return {
                id: item.order_id,
                supName: item.customer_name,
                matName: item.product_name,
                qtyDemand: item.quantity_demand,
                qtyReceive: item.quantity_receive,
                soTotal: item.total,
                soTglInvoice: formatDate(item.invoice_date),
                soOrderStat: item.order_status,
                soPaymentStat: item.invoice_status,
            };
        });

    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "supName", headerName: "Customer", width: 90 },
        { field: "matName", headerName: "Produk", width: 100 },
        { field: "qtyDemand", headerName: "Permintaan", width: 100 },
        { field: "qtyReceive", headerName: "Diterima", width: 90 },
        { field: "soTotal", headerName: "Total", width: 70 },
        { field: "soTglInvoice", headerName: "Tanggal Invoice", width: 120 },
        { field: "soOrderStat", headerName: "Status Order", width: 110 },
        { field: "soPaymentStat", headerName: "Status Invoice", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => {
                const soId = params.row.id;
                const filteredSo = stateSo.filter((soItem) => soItem.order_id === soId);
                const statusSo = filteredSo.find((soStatus) => soStatus.order_status);
                const filteredPaySo = statePaySo && statePaySo.find((paySoItem) => paySoItem.order_id === soId);
                console.log(filteredPaySo);
                return (
                    <div>
                        {statusSo && statusSo.order_status === "Quotation" && statusSo.invoice_status === "Nothing to Invoice" ? (
                            <span className="text-red-600 font-bold">Confirm Quotation First</span>
                        ) : statusSo && statusSo.order_status === "SO" && statusSo.invoice_status === "Nothing to Invoice" ? (
                            <span className="text-red-600 font-bold">Complete Invoice First</span>
                        ) : statusSo && statusSo.order_status === "SO" && statusSo.invoice_status === "Fully Invoiced" && statusSo.quantity_receive > 0 ? (
                            <div>
                                <span className="text-green-600 font-bold mr-[15px]">Done</span>
                            </div>
                        ) : statusSo && statusSo.order_status === "SO" && statusSo.invoice_status === "Fully Invoiced" && statusSo.quantity_receive < statusSo.quantity_demand ? (
                            <button onClick={() => navigate(`/so/receive-demand-edit/${soId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                                Validate
                            </button>
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
            <h1 className="font-bold text-xl mb-[20px]">Receive Demand</h1>
            {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("create-po")}>
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
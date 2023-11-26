import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { poFetch } from "../../../slices/slicePo";
import { payPoFetch } from "../../../slices/slicePaymentPo";

export default function ReceiveDemand() {
    const dispatch = useDispatch();
    const { statePo, stateRefreshPo } = useSelector((state) => state.po);
    const { stateRefreshPayPo } = useSelector((state) => state.payPo);
    const { statePayPo } = useSelector((state) => state.payPo);
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

    useEffect(() => {
        dispatch(payPoFetch());
    }, [stateRefreshPayPo]);

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
                const filteredPo = statePo.filter((poItem) => poItem.orderPO_id === poId);
                const statusPo = filteredPo.find((poStatus) => poStatus.order_status);
                const filteredPayPo = statePayPo.find((payPoItem) => payPoItem.orderPO_id === poId);
                console.log(filteredPayPo);
                return (
                    <div>
                        {statusPo && statusPo.order_status === "RFQ" && statusPo.payment_status === "Nothing to Bill" ? (
                            <span className="text-red-600 font-bold">RFQ Isn't Confirmed Yet</span>
                        ) : statusPo && statusPo.order_status === "PO" && statusPo.payment_status === "Nothing to Bill" ? (
                            <button onClick={() => navigate(`/po/receive-demand-edit/${poId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                                Validate
                            </button>
                        ) : statusPo && statusPo.order_status === "PO" && statusPo.payment_status === "Waiting Bills" ? (
                            <div>
                                <span className="text-green-600 font-bold mr-[15px]">Done</span>

                                {filteredPayPo ? (
                                    <span className="text-yellow-600 font-bold mr-[15px]">Bill Created</span>
                                ) : (
                                    <button onClick={() => navigate(`/po/create-payment-po/${poId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                                        Create Bill
                                    </button>   
                                )}

                            </div>
                        ) : statusPo && statusPo.order_status === "PO" && statusPo.payment_status === "Fully Billed" ? (
                            <div>
                                <span className="text-green-600 font-bold mr-[15px]">Done</span>

                                {filteredPayPo ? (
                                    <span className="text-blue-600 font-bold mr-[15px]">Bill Paid</span>
                                ) : (
                                    <button onClick={() => navigate(`/po/create-payment-po/${poId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                                        Create Bill
                                    </button>   
                                )}

                            </div>
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
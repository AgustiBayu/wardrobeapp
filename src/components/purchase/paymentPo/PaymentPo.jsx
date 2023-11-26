import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { payPoFetch } from "../../../slices/slicePaymentPo";

export default function PaymentPo() {
    const dispatch = useDispatch();
    const { statePayPo, stateRefreshPayPo } = useSelector((state) => state.payPo); //deklarasi state yang diambil dari slicePo.js
    const navigate = useNavigate();

    console.log(statePayPo);

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
        dispatch(payPoFetch());
    }, [stateRefreshPayPo]);

    // mengeluarkan isi data dari dalam state po
    const rows =
        statePayPo &&
        statePayPo.map((item) => {
            return {
                id: item.paymentPO_id,
                supName: item.supplier_name,
                orderPoId: item.orderPO_id,
                payPoTotal: item.total,
                payPoBank: item.bank === null ? "-" : item.bank,
                payPoTanggal: formatDate(item.tanggal),
                payPoPaymentStat: item.payment_status,
            };
        });

    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "supName", headerName: "Supplier", width: 90 },
        { field: "orderPoId", headerName: "PO ID", width: 100 },
        { field: "payPoTotal", headerName: "Total", width: 100 },
        { field: "payPoBank", headerName: "Bank", width: 90 },
        { field: "payPoTanggal", headerName: "Tanggal Payment", width: 140 },
        { field: "payPoPaymentStat", headerName: "Status Payment", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 350,
            renderCell: (params) => {
                const payPoId = params.row.id;
                const filteredPayPo = statePayPo.filter((payPoItem) => payPoItem.paymentPO_id === payPoId);
                const statusPayPo = filteredPayPo.find((payPoStatus) => payPoStatus.payment_status);
                console.log(statusPayPo);
                return (
                    <div>
                        {statusPayPo && statusPayPo.payment_status === "Waiting Bills" ? (
                            <div>
                                {/* <button onClick={() => navigate(`edit-po/${poId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                                    Edit
                                </button>
                                <button onClick={() => navigate(`delete-po/${poId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                                    Delete
                                </button> */}
                                <button onClick={() => navigate(`/po/edit-payment-po/${payPoId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                                    Register Payment
                                </button>
                            </div>
                        ) : statusPayPo && statusPayPo.payment_status === "Fully Billed" ? (
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
            <h1 className="font-bold text-xl mb-[20px]">Payment PO</h1>
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
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paySoFetch } from "../../../slices/slicePaymentSo";

export default function PaymentSo() {
    const dispatch = useDispatch();
    const { statePaySo, stateRefreshPaySo } = useSelector((state) => state.paySo); //deklarasi state yang diambil dari slicePo.js
    const navigate = useNavigate();

    console.log(statePaySo);

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
        dispatch(paySoFetch());
    }, [stateRefreshPaySo]);

    // mengeluarkan isi data dari dalam state po
    const rows =
        statePaySo &&
        statePaySo.map((item) => {
            return {
                id: item.paymentSO_id,
                cusName: item.customer_name,
                orderId: item.order_id,
                paySoTotal: item.total,
                paySoBank: item.bank === null ? "-" : item.bank,
                paySoTanggal: formatDate(item.tanggal),
                paySoPaymentStat: item.payment_status,
            };
        });

    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "cusName", headerName: "Customer", width: 90 },
        { field: "orderId", headerName: "SO ID", width: 100 },
        { field: "paySoTotal", headerName: "Total", width: 100 },
        { field: "paySoBank", headerName: "Bank", width: 90 },
        { field: "paySoTanggal", headerName: "Tanggal Payment", width: 140 },
        { field: "paySoPaymentStat", headerName: "Status Payment", width: 130 },
        {
            field: "actions",
            headerName: "Actions",
            width: 350,
            renderCell: (params) => {
                const paySoId = params.row.id;
                const filteredPaySo = statePaySo.filter((paySoItem) => paySoItem.paymentSO_id === paySoId);
                const statusPaySo = filteredPaySo.find((paySoStatus) => paySoStatus.payment_status);
                console.log(statusPaySo);
                return (
                    <div>
                        {statusPaySo && statusPaySo.payment_status === "Waiting Bills" ? (
                            <div>
                                {/* <button onClick={() => navigate(`edit-po/${poId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                                    Edit
                                </button>
                                <button onClick={() => navigate(`delete-po/${poId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
                                    Delete
                                </button> */}
                                <button onClick={() => navigate(`/so/edit-payment-so/${paySoId}`)} className="bg-yellow-500 hover:bg-yellow-700 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                                    Register Payment
                                </button>
                            </div>
                        ) : statusPaySo && statusPaySo.payment_status === "Fully Billed" ? (
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
            <h1 className="font-bold text-xl mb-[20px]">Payment SO</h1>
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
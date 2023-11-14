import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moEdit } from "../../../slices/sliceMo";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

export default function DetailAvailability() {
    const dispatch = useDispatch();
    const { stateMo } = useSelector((state) => state.mo);
    const { stateProducts } = useSelector((state) => state.products);
    const { stateBom } = useSelector((state) => state.bom);
    const { createStatus } = useSelector((state) => state.mo);
    const { moId } = useParams();
    const navigate = useNavigate();

    const [selectedProd, setSelectedProd] = useState("");

    const [nameProd, setNameProd] = useState("");
    const [jumlahProd, setJumlahProd] = useState(0);
    const [totalProd, setTotalProd] = useState(0);
    const [dateProd, setDateProd] = useState(0);
    const [newJumlah, setNewJumlah] = useState(0);

    const selectedMo = stateMo.find((item) => item.orderMO_id === parseInt(moId));

    const handleCreateMo = async (e) => {
        e.preventDefault();

        dispatch(moEdit({
            mo: {
                moId: parseInt(moId, 10),
                productId: nameProd,
                quantity: jumlahProd,
                total: totalProd,
                statusMo: "Pending",
                tanggal: dateProd,
            }
        }));

        setNameProd("");
        setJumlahProd("");
        setDateProd("");
        navigate("/mo");
    };
    console.log(stateBom);

    useEffect(() => {
        if (selectedMo) {
            setNameProd(selectedMo.product_id);
            setJumlahProd(selectedMo.quantity);
            setTotalProd(selectedMo.total);
            setDateProd(new Date(new Date(selectedMo.tanggal).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]);
        }
    }, [moId, stateMo, selectedMo]);

    useEffect(() => {
        const filteredBom = stateBom.filter((bomItem) => bomItem.product_id === parseInt(nameProd, 10));
        const price = filteredBom.map((item) => item.price);
        const jumlah = filteredBom.map((item) => item.jumlah);

        const newJmlBahan = jumlah.map((jml) => jml * jumlahProd);
        const updatedBom = filteredBom.map((item, index) => ({
            ...item,
            jumlah: newJmlBahan[index],
        }));

        const total = price.reduce((acc, price, index) => acc + price * newJmlBahan[index], 0);

        console.log(updatedBom);
        setTotalProd(total);
        setNewJumlah(newJmlBahan);
        setSelectedProd(updatedBom);
    }, [nameProd, jumlahProd]);

    // useEffect(()=>{
    //     const price = filteredBom.map((item) => item.price);
    //     const jumlah = filteredBom.map((item) => item.jumlah);
    //     const total = price.reduce((acc, price, index) => acc + price * jumlah[index], 0);
    //     setNewJumlah();
    // },[jumlahProd])

    // mengeluarkan isi data dari dalam selectedProd
    const rows =
        selectedProd &&
        selectedProd.map((item) => {

            return {
                id: item.material_products_id,
                bomNameProd: item.product_name,
                bomNameMat: item.material_name,
                bomSatuan: item.satuan,
                bomJumlah: item.jumlah,
                bomHrg: item.price,
                bomTotal: item.jumlah * item.price,
            };
        });

    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "bomNameProd", headerName: "Nama Produk", width: 110 },
        { field: "bomNameMat", headerName: "Nama Bahan Baku", width: 140 },
        { field: "bomSatuan", headerName: "Satuan Bahan Baku", width: 150 },
        { field: "bomJumlah", headerName: "Jumlah", width: 70 },
        { field: "bomHrg", headerName: "Harga Per Bahan", width: 130 },
        { field: "bomTotal", headerName: "Total", width: 90 },
        // {
        //     field: "actions",
        //     headerName: "Actions",
        //     width: 200,
        //     renderCell: (params) => {
        //         const bomId = params.row.id;
        //         return (
        //             <div>
        //                 <button onClick={() => navigate(`edit-bom/${bomId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-[15px]">
        //                     Edit
        //                 </button>
        //                 <button onClick={() => navigate(`delete-bom/${bomId}`)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        //                     Delete
        //                 </button>
        //             </div>
        //         );
        //     },
        // },
    ];

    return (
        <div className="flex flex-row">
            <div className="flex flex-col w-[500px] pr-[50px]">
                <h1 className="font-bold text-xl mb-3">Manufacturing Orders Details</h1>
                <form onSubmit={handleCreateMo}>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Products :
                        </label>
                        <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setNameProd(e.target.value)}
                            required
                            defaultValue={selectedMo.product_id}
                        >
                            <option value="cat" disabled hidden>
                                Pilih Produk
                            </option>
                            {/* memanggil isi dari produk menggunakan state */}
                            {stateProducts && stateProducts.map((item) => (
                                <option key={item.product_id} value={item.product_id} disabled>
                                    {item.product_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Jumlah :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Bahan Baku"
                            value={jumlahProd}
                            onChange={(e) => setJumlahProd(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Total :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            placeholder="Isi Harga Bahan Baku"
                            value={totalProd}
                            required
                            readOnly
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Tanggal Terjadwal :
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="date"
                            placeholder="Isi Tanggal Dibuatnya Produk"
                            value={dateProd}
                            onChange={(e) => setDateProd(e.target.value)}
                            required
                            readOnly
                        />
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("/mo/check-availability")}>
                        Back
                    </button>
                </form>
            </div>
            <div className="flex h-[400px] w-[100%]">
                <DataGrid
                    rows={validRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}

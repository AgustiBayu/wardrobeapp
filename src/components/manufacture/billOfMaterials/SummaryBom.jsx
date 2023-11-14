import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function SummaryBom() {
    const { stateBom } = useSelector((state) => state.bom); //deklarasi state yang diambil dari sliceMaterials.js
    const navigate = useNavigate();
    console.log(stateBom);

    const mergedData = stateBom.reduce((result, item) => {
        const existingItem = result.find((x) => x.product_id === item.product_id);
        if (existingItem) {
          existingItem.material_name += `, ${item.material_name}`;
          existingItem.jumlah += `, ${item.jumlah}`;
          existingItem.satuan += `, ${item.satuan}`;
          existingItem.price += `, ${item.price}`;
          existingItem.total += item.jumlah * item.price;
        } else {
          result.push({
            product_id: item.product_id,
            product_name: item.product_name,
            material_name: item.material_name,
            jumlah: item.jumlah,
            satuan: item.satuan,
            price: item.price,
            total: item.jumlah * item.price,
          });
        }
        return result;
      }, []);

    // useEffect(() => {
    //     dispatch(bomFetch());
    // }, [stateRefreshBom]);

    // mengeluarkan isi data dari dalam state material
    const rows = mergedData.map((item) => ({
        id: item.product_id,
        bomNameProd: item.product_name,
        bomNameMat: item.material_name,
        bomJumlah: item.jumlah,
        bomSatuan: item.satuan,
        bomPrice: item.price,
        bomTotal: item.total,
      }));
    // new Date(new Date(item.created_at).getTime() + 7 * 60 * 60 * 1000).toISOString().split('T')[0]

    const validRows = rows ? rows.filter((row) => row.id !== undefined && row.id !== null) : "";

    //memasukkan data kedalam kolom tampilan tabel
    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "bomNameProd", headerName: "Nama Produk", width: 130 },
        { field: "bomNameMat", headerName: "Nama Bahan Baku", width: 150 },
        { field: "bomJumlah", headerName: "Jumlah", width: 100 },
        { field: "bomSatuan", headerName: "Satuan", width: 150 },
        { field: "bomPrice", headerName: "Harga Per Unit", width: 150 },
        { field: "bomTotal", headerName: "Total", width: 80 },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => {
                const bomId = params.row.id;
                return (
                    <div>
                        <button onClick={() => navigate("/mo/create-mo")} className="bg-yellow-500 hover:bg-yellow-600 text-dark font-bold py-2 px-4 rounded mr-[15px]">
                            Order Produk
                        </button>
                    </div>
                );
            },
        },
    ];

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h1 className="font-bold text-xl">Bill of Materials</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[10px]" onClick={() => navigate("/bom")}>
                Back
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
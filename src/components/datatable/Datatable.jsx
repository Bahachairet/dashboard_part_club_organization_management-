// datatable.jsx
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { tableConfig } from "../../datasource"; // Import tableConfig

const Datatable = ({ tableType }) => {
  const config = tableConfig[tableType]; // Get the configuration based on tableType
  const [data, setData] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, tableType), // Use tableType for collection
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [tableType]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, tableType, id)); // Use tableType for collection
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${tableType}/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {config.title} {/* Use the title from config */}
        <Link to={`/${tableType}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={config.columns.concat(actionColumn)} 
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

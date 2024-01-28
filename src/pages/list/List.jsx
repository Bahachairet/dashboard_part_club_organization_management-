import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"



const List = ({ tableType }) => { // Make sure to receive tableType prop
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable tableType={tableType} /> {/* Pass the tableType prop */}
      </div>
    </div>
  );
}

export default List;

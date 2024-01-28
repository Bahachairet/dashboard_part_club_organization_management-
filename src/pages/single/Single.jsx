import "./single.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

const Single = () => {
  const { tableType, itemId } = useParams();
  console.log(tableType);
  console.log(itemId);
  const [itemData, setItemData] = useState(null);
console.log(itemData);
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const docRef = doc(db, tableType, itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    if (itemId) {
      fetchItemData();
    }
  }, [tableType, itemId]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            {itemData && (
              <div className="item">
                <img
                  src={itemData.image || "default-image-url.jpg"}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                  <h1 className="itemTitle">{itemData.title || "No Title"}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{itemData.email || "N/A"}</span>
                  </div>
                  {/* Add more details as needed */}
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{itemData.phone || "N/A"}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">{itemData.address || "N/A"}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">{itemData.country || "N/A"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;

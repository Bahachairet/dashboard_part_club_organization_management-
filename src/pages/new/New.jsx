import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  addDoc, 
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { tableConfig } from "../../datasource";

const New = ({ tableType }) => {
  const config = tableConfig[tableType];
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
  
      if (user) {
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPerc(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              let newData;
  
              switch (tableType) {
                case "actualites":
                  newData = {
                    title: data.title,
                    description: data.description,
                    img: downloadURL,
                  };
                  break;
                case "teams":
                  newData = {
                    title: data.title,
                    full_name: data.full_name,
                    post: data.post,
                    linkedin: data.linkedin,
                    facebook: data.facebook,
                    email: data.email,
                    img: downloadURL,
                  };
                  break;
                case "sponsors":
                  newData = {
                    title: data.title,
                    link: data.link,
                    img: downloadURL,
                  };
                  break;
                case "users":
                  newData = {
                    username: data.username,
                    displayName: data.displayName,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    address: data.address,
                    img: downloadURL,
                  };
                  break;
                case "projects":
                  newData = {
                    title: data.title,
                    description: data.description,
                    img: downloadURL,
                  };
                  break;
                case "offers":
                  newData = {
                    title: data.title,
                    description: data.description,
                    type: data.type,
                    img: downloadURL,
                  };
                  break;
                default:
                  // Handle any other cases or provide a default behavior
                  console.error(`Unsupported tableType: ${tableType}`);
                  break;
              }
  
              const docRef = await addDoc(collection(db, tableType), newData);
              navigate(-1);
            });
          }
        );
      } else {
        console.log("User is not authenticated");
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New {config.title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {config.inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}

              {tableType === "offers" && (
                <div className="formInput">
                  <label>Type</label>
                  <select
                    id="type"
                    onChange={handleInput}
                  >
                    <option value="formation">Formation</option>
                    <option value="activite">Activite</option>
                    <option value="evenement">Evenement</option>
                  </select>
                </div>
              )}

              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;

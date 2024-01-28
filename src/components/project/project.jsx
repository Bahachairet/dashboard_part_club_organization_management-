import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Table, Button, Form, Popconfirm, Row, Col } from "antd";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./project.scss"; // Import your custom styles here

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [per, setPerc] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projectsData = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setNewProject((prevProject) => ({ ...prevProject, [id]: value }));
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPerc(progress);
          },
          (error) => {
            console.log(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            if (newProject.title && newProject.description) {
              const docRef = await addDoc(collection(db, "projects"), {
                title: newProject.title,
                description: newProject.description,
                image: downloadURL,
                timestamp: serverTimestamp(),
              });

              setProjects((prevProjects) => [
                ...prevProjects,
                { key: docRef.id, ...newProject, image: downloadURL },
              ]);
              setNewProject({ title: "", description: "", image: "" });
              setFile(null);
            }
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteDoc(doc(db, "projects", projectId));
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.key !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (text, record) => (
        <img
          src={text}
          alt={record.title}
          className="img-fluid rounded-circle project-image-small"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDeleteProject(record.key)}
        >
          <Button type="danger">Delete</Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <div className="project">
      <div className="exleft">
        <Sidebar />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            <h1 className="mb-4">Project Dashboard</h1>
          </div>
          <div className="col-md-12">
            <Row gutter={[16, 16]}>
              <Col md={6}>
                <div className="mb-4 p-4 text-center dashboard-section">
                  <div className="image-upload">
                    <img
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                      className="img-fluid rounded-circle mb-3 project-image"
                    />
                    <label htmlFor="file" className="btn btn-primary">
                      Upload{" "}
                      <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </Col>
              <Col md={18}>
                <Form
                  onSubmit={handleAddProject}
                  className="form dashboard-section p-4"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={16}>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="form-control"
                          placeholder="Title"
                          value={newProject.title}
                          onChange={handleInput}
                        />
                      </div>
                    </Col>
                    <Col xs={16}>
                      <div className="mb-3">
                        <label
                          htmlFor="description"
                          className="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="form-control"
                          placeholder="Description"
                          value={newProject.description}
                          onChange={handleInput}
                        />
                      </div>
                    </Col>
                    <Col
                      xs={8}
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <button
                        disabled={per !== null && per < 100}
                        type="submit"
                        className="btn btn-success"
                      >
                        Add Project
                      </button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </div>
          <div className="col-12 mt-4">
        <div className="projectsList">
          <Table dataSource={projects} columns={columns} />
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Project;

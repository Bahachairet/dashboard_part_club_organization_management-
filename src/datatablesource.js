export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "address",
    headerName: "Address",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 200,
  },
 
];

export const actualiteColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    width: 230,
  },


];
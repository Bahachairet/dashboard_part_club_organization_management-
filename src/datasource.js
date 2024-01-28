export const tableConfig = {
    users: {
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "image",
          headerName: "Image",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="avatar" />
              </div>
            );
          },
        },
        {
          field: "username",
          headerName: "Username",
          width: 230,
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
      ],
      inputs: [
       
        {
          id: "username",
          label: "Username",
          type: "text",
          placeholder: "john_doe",
        },
        {
          id: "displayName",
          label: "Name and surname",
          type: "text",
          placeholder: "John Doe",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "john_doe@gmail.com",
        },
        {
          id: "phone",
          label: "Phone",
          type: "text",
          placeholder: "+216",
        },
        {
          id: "password",
          label: "Password",
          type: "password",
        },
        {
          id: "address",
          label: "Address",
          type: "text",
          placeholder: "Gabes",
        },
      ],
      title: "User",
    },
    actualites: {
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "image",
          headerName: "Image",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="avatar" />
              </div>
            );
          },
        },
        {
          field: "title",
          headerName: "Title",
          width: 230,
        },
        {
          field: "description",
          headerName: "Description",
          width: 230,
        },
      ],
      inputs: [
       
        {
          id: "title",
          label: "Title",
          type: "text",
          placeholder: "example",
        },
        {
          id: "description",
          label: "Description",
          type: "text",
          placeholder: "description...",
        },
      ],
      title: "Actualite",
    },
    projects: {
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "image",
          headerName: "Image",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="project" />
              </div>
            );
          },
        },
        {
          field: "title",
          headerName: "Title",
          width: 230,
        },
        {
          field: "description",
          headerName: "Description",
          width: 230,
        },
      ],
      inputs: [
       
        {
          id: "title",
          label: "Title",
          type: "text",
          placeholder: "Project Title",
        },
        {
          id: "description",
          label: "Description",
          type: "text",
          placeholder: "Project Description...",
        },
      ],
      title: "Project",
    },
    offers: {
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "image",
          headerName: "Image",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="offer" />
              </div>
            );
          },
        },
        {
          field: "title",
          headerName: "Title",
          width: 230,
        },
        {
          field: "description",
          headerName: "Description",
          width: 230,
        },
        {
          field: "type",
          headerName: "Type",
          width: 230,
        },
      ],
      inputs: [
       
        {
          id: "title",
          label: "Title",
          type: "text",
          placeholder: "Offer Title",
        },
        {
          id: "description",
          label: "Description",
          type: "text",
          placeholder: "Offer Description...",
        },
      
      ],
      title: "Offer",
    },
    teams: {
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "image",
          headerName: "Image",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="team" />
              </div>
            );
          },
        },
        {
            field: "title",
            headerName: "Title",
            width: 230,
          },
        {
          field: "full_name",
          headerName: "Full Name",
          width: 230,
        },
        {
          field: "post",
          headerName: "Post",
          width: 230,
        },
        {
          field: "linkedin",
          headerName: "LinkedIn",
          width: 230,
        },
        {
          field: "facebook",
          headerName: "Facebook",
          width: 230,
        },
        {
          field: "email",
          headerName: "Email",
          width: 230,
        },
      ],
      inputs: [
        {
            id: "title",
            label: "Title",
            type: "text",
            placeholder: "Offer Title",
          },
        {
          id: "full_name",
          label: "Full Name",
          type: "text",
          placeholder: "Team Member's Full Name",
        },
        {
          id: "post",
          label: "Post",
          type: "text",
          placeholder: "Team Member's Post",
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          type: "text",
          placeholder: "LinkedIn Profile URL",
        },
        {
          id: "facebook",
          label: "Facebook",
          type: "text",
          placeholder: "Facebook Profile URL",
        },
        {
          id: "email",
          label: "Email",
          type: "text",
          placeholder: "Team Member's Email Address",
        },
      ],
      title: "Team",
    },
    sponsors: {
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        {
          field: "image",
          headerName: "Image",
          width: 230,
          renderCell: (params) => {
            return (
              <div className="cellWithImg">
                <img className="cellImg" src={params.row.img} alt="sponsor" />
              </div>
            );
          },
        },
        {
            field: "title",
            headerName: "Title",
            width: 230,
          },
        {
          field: "link",
          headerName: "Link",
          width: 230,
        },
      ],
      inputs: [
        {
            id: "title",
            label: "Title",
            type: "text",
            placeholder: "Offer Title",
          },    
       
        {
          id: "link",
          label: "Link",
          type: "text",
          placeholder: "Sponsor's Website URL",
        },
      ],
      title: "Sponsor",
    },
  };
  
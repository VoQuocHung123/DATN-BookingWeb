export const userColumns = [
  { field: "id", headerName: "ID", width: 70,headerClassName: 'super-app-theme--header', },
  {
    field: "username",
    headerName: "User",
    headerClassName: 'super-app-theme--header',
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    headerClassName: 'super-app-theme--header',
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    headerClassName: 'super-app-theme--header',
    width: 100,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: 'super-app-theme--header',
    width: 160,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:3001/${params.row.avatar}` || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
        </div>
      );
    },
  },
];
export const tourColumns = [
  { field: "id", headerName: "ID", width: 70,headerClassName: 'super-app-theme--header', },
  { field: "title", headerName: "Tiêu Đề", width: 200,headerClassName: 'super-app-theme--header', },
  { field: "timetour", headerName: "Thời Gian", width: 200,headerClassName: 'super-app-theme--header', },
  { field: "category", headerName: "Loại Tour", width: 200,headerClassName: 'super-app-theme--header', },
  {
    field: "image",
    headerName: "Ảnh Tiêu Đề",
    headerClassName: 'super-app-theme--header',
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:3001/${params.row.image}` || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
        </div>
      );
    },
  },
]

export const carColumns = [
  { field: "id", headerName: "ID", width: 70,headerClassName: 'super-app-theme--header', },
  { field: "name", headerName: "Tên Xe", width: 200,headerClassName: 'super-app-theme--header', },
  { field: "price", headerName: "Giá", width: 200,headerClassName: 'super-app-theme--header', },
  { field: "category", headerName: "Loại Xe", width: 200,headerClassName: 'super-app-theme--header', },
  {
    field: "image",
    headerName: "Hình Ảnh",
    headerClassName: 'super-app-theme--header',
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={`http://localhost:3001/${params.row.image}` || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
        </div>
      );
    },
  },
]

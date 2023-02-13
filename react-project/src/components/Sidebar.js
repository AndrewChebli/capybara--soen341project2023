import React, { useState } from "react";
import { Avatar, Divider, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const Sidebar = ({ user }) => {
  const [file, setFile] = useState(null);

  const handlePictureClick = () => {
    document.getElementById("file-input").click();
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    // Upload file here
  };

  return (
    <div style={{ width: 250, height: "100%", backgroundColor: "#fafafa" }}>
      <div style={{ display: "flex", alignItems: "center", padding: 16 }}>
        <Avatar
          src={file ? URL.createObjectURL(file) : user.profilePicture}
          onClick={handlePictureClick}
        />
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div style={{ marginLeft: 16 }}>
          <h2>{user.name}</h2>
        </div>
      </div>
      <Divider />
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <i className="fas fa-user" />
          </ListItemIcon>
          <ListItemText primary="Personal Information" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <i className="fas fa-briefcase" />
          </ListItemIcon>
          <ListItemText primary="Work Experience" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <i className="fas fa-graduation-cap" />
          </ListItemIcon>
          <ListItemText primary="Education" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <i className="fas fa-cog" />
          </ListItemIcon>
          <ListItemText primary="Skills" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <i className="fas fa-edit" />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItem>
      </List>
    </div>
  );
};

export default Sidebar;

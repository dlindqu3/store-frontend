import React from "react";

function FooterComponent() {
  return (
    <div>
      <div style={{ height: "3rem", backgroundColor: "WhiteSmoke", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ marginRight: "3px", marginTop: "10px" }}>
            <a href="https://github.com/dlindqu3/">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              height="25"
              width="25"
            />
            </a>
          </div>
          <div style={{ marginLeft: "3px", marginTop: "10px" }}>
            <a href="https://www.linkedin.com/in/dwight-lindquist/">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
              height="25"
              width="25"
            />
            </a>
          </div>
      </div>
    </div>
  );
}

export default FooterComponent;

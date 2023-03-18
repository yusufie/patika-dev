import React from "react";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: 10px;
  padding: 10px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const IconSpan = styled.span`
  margin-left: 10px;
`;
const Link = styled.a`
  margin-left: 5px;
  text-decoration: none;
  &:visited {
    text-decoration: none;
  }
`;
function Footer() {
  return (
    <StyledFooter>
      <div>
        <span>&copy; 2023</span>
        <Link
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconSpan>
            <BsLinkedin />
          </IconSpan>
        </Link>
        <Link
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconSpan>
            <BsGithub className="icons" />
          </IconSpan>
        </Link>
      </div>
      <div>Copy Right &copy; {new Date().getFullYear()}</div>
      <div>
        Data provided by
        <Link
          href="https://openweathermap.org/api"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenWeather API
        </Link>
      </div>
    </StyledFooter>
  );
}

export default Footer;

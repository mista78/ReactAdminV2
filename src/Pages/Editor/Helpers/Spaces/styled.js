import styled from "styled-components";
const size = "35px";

const Margin = styled.div`
cursor: pointer;
color: #fff;
font-size: 12px;
font-weight: 600;
text-transform: capitalize;
line-height: 1.5;
input {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
}
.margin {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 170px;
    padding: ${size};
    margin-bottom: 1rem;
    .margin-top {
      &:after {
        content: "";
        position: absolute;
        border-bottom: ${size} solid #504f50;
        border-right: ${size} solid transparent;
        top: 0;
        z-index: 3;
      }
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: ${size};
      background: #000;
      width: 100%;
      background: #000;
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .margin-right {
      &:after {
        content: "";
        position: absolute;
        border-top: ${size} solid black;
        border-right: ${size} solid transparent;
        top: 0;
      }
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: ${size};
      height: 100%;
      background: #504f50;
  
      z-index: 1;
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .margin-bottom {
      &:after {
        content: "";
        position: absolute;
        border-top: ${size} solid #504f50;
        border-left: ${size} solid transparent;
        right: 0;
      }
      &:before {
        content: "";
        position: absolute;
        border-top: ${size} solid #504f50;
        border-right: ${size} solid transparent;
        left: 0;
      }
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${size};
      width: 100%;
      background: #000;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
    .margin-left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${size};
      height: 100%;
      background: #504f50;
      &:after {
        content: "";
        position: absolute;
        border-top: ${size} solid black;
        border-left: ${size} solid transparent;
        top: 0;
        z-index: 3;
      }
      display: grid;
      align-items: center;
      color: #fff;
      text-align: center;
    }
  }
  .padding {
    position: absolute;
    top: ${size};
    left: ${size};
    right: ${size};
    bottom: ${size};
    display: flex;
    justify-content: center;
    align-items: center;
    .padding-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: ${size};
      background: #939393;
      width: 100%;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
    .padding-right {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: ${size};
      height: 100%;
      background: #939393;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
    .padding-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: ${size};
      width: 100%;
      background: #939393;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
  
    .padding-left {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: ${size};
      height: 100%;
      background: #939393;
      z-index: 1;
      display: grid;
      align-items: center;
      color: #000;
      text-align: center;
    }
  }
  
  .element {
    position: absolute;
    position: absolute;
    top: ${size};
    left: ${size};
    right: ${size};
    bottom: ${size};
    background: black;
  }

  select {
    background: transparent;
    border: none;
    color: #fff;
    font-weight: 600;
    outline: none;
    line-height: 1;
    text-transform: capitalize;
    &:focus {
        outline: none;
    }
  }

  .input , label {
    margin-bottom: 1rem;
    display: block;
  }
  
`;

export  {
    Margin
};
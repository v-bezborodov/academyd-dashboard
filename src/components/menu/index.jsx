import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { MenuSt } from "./index.styled";

const Menu = () => {
  return (
    <MenuSt>
      <div>
        <img
          style={{
            width: "159px",
            marginLeft: "15px",
            marginBottom: "30px",
          }}
          src="https://res.cloudinary.com/kreamsoda/image/upload/v1642166030/logo.svg"
        />
        <nav>
          <NavLink
            className="linkNav"
            to={"/home"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Главная</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/all-customer"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Все сотрудники</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/all-city"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Все города</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/all-coffee"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Все кофейни</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/blog"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Блог</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/all-test"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Тесты</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/chek-test"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Проверка тестов</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            to={"/event"}
            activeClassName="active_tab"
          >
            <div className="iconNav">
              <p>Мероприятия</p>
            </div>
          </NavLink>

          <NavLink
            className="linkNav"
            onClick={() => localStorage.clear()}
            to={"/"}
          >
            <div className="iconNav">
              <p>Выход</p>
            </div>
          </NavLink>
        </nav>
      </div>
    </MenuSt>
  );
};
export default Menu;

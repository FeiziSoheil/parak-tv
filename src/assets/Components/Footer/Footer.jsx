import React from "react";
import { IoIosSettings } from "react-icons/io";
import { AiFillSound } from "react-icons/ai";
import { BiMoviePlay } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaTelegramPlane } from "react-icons/fa";
import Container from "react-bootstrap/Container";
import { FaDownload } from "react-icons/fa6";
import "./Footer.css";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div class="footer">
      <Container>
        <div class="footer__section footer__section--features">
          <div class="footer__features">
            <div class="footer__feature-item">
              <div
                class="footer__feature-icon"
                style={{ color: "#ffc107", backgroundColor: "#463c25" }}
              >
                <IoIosSettings />
              </div>
              <div class="footer__feature-text">
                <p class="footer__feature-title">Needs</p>
                <p class="footer__feature-subtitle">Video player software</p>
              </div>
            </div>
            <div class="footer__feature-item">
              <div
                class="footer__feature-icon"
                style={{ color: "#6898f8", backgroundColor: "#2d3348" }}
              >
                <AiFillSound />
              </div>
              <div class="footer__feature-text">
                <p class="footer__feature-title">Playe double</p>
                <p class="footer__feature-subtitle">Sound control guide</p>
              </div>
            </div>
            <div class="footer__feature-item">
              <div
                class="footer__feature-icon"
                style={{ color: "#89d64f", backgroundColor: "#323e31" }}
              >
                <BiMoviePlay />
              </div>
              <div class="footer__feature-text">
                <p class="footer__feature-title">Needs</p>
                <p class="footer__feature-subtitle">Format guide</p>
              </div>
            </div>
          </div>

          <div class="footer__social-links">
            <Link to={"https://instagram.com/soheilfeizi_"} class="footer__social-link instaLink">
              <span class="footer__social-icon">
                <FaInstagram />
                Instagram
              </span>
              <IoIosArrowForward class="footer__social-arrow" />
            </Link>

            <Link
              to="https://t.me/soheil_feizi"
              class="footer__social-link telegramLink">
              <span class="footer__social-icon">
                <FaTelegramPlane />
                Telegram
              </span>
              <IoIosArrowForward class="footer__social-arrow" />
            </Link>
          </div>
        </div>

        <div class="footer__section footer__section--menu">
          <div class="footer__logo-menu">
            <div class="footer__logo">
              <img src='/logo.png'alt="Uptv Logo" />
              <p>Uptv</p>
            </div>
            <ul class="footer__menu">
              <li class="footer__menu-item">Download Movie</li>
              <li class="footer__menu-item">Download Series</li>
              <li class="footer__menu-item">Download new movie</li>
              <li class="footer__menu-item">India movie</li>
              <li class="footer__menu-item">Download Animation</li>
              <li class="footer__menu-item">Download irani movie</li>
              <li class="footer__menu-item">Download hindi movie</li>
              <li class="footer__menu-item">Download english movie</li>
            </ul>
          </div>
          <div class="footer__download-app">
            <div class="footer__download-icon">
              <FaDownload />
              <p>Uptv App</p>
            </div>
            <button class="footer__download-button">Download</button>
          </div>
        </div>
        <hr class="footer__divider" />
        <div class="footer__section footer__section--extra">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio,
            veritatis deleniti unde magnam obcaecati eligendi, a dolores dolorum
            id excepturi ipsa. Dolor voluptatum dolorem, laborum tenetur ipsam
            omnis earum ex?
          </p>
        </div>
      </Container>
    </div>
  );
}

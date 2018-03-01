import React from 'react';
import { TimelineMax, TweenMax, Linear } from 'gsap';
import {
  Fish,
  RocksBack,
  RocksLeft,
  RocksRight,
  Content,
  Code,
  Logo,
  Cuttlebelle
} from '../Icon';

import './Header.css';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Header extends React.Component {
  componentDidMount() {
    var bubbles = document.querySelectorAll('.js-header__bubble');
    var x =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth;
    var bubblePlay = new TimelineMax();

    // iterate over all .js-header__bubble DOM nodes
    for (var i = 0; i < bubbles.length; i++) {
      var bubble = TweenMax.fromTo(
        // animate this node
        bubbles[i], // target
        randomBetween(6, 35), // duration
        {
          // from
          x: randomBetween(40, x + 40),
          y: 770
        },
        {
          // to
          x: randomBetween(40, x + 40),
          y: -90,
          repeat: -1,
          ease: Linear.easeNone
        }
      );

      bubblePlay.add(bubble, (i + 1) / 10);
    }

    bubblePlay.time(100); // forward by 100s
  }

  render() {
    const { children } = this.props;
    return (
      <header className="header header--large">
        <div className="header__bubble header__bubble--floater header__bubble--floater2 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater2 js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater3 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater1 js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater2 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater3 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater1 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater2 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater3 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater3 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater1 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater2 js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater3 header__bubble--floater1 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater2 js-header__bubble" />
        <div className="header__bubble header__bubble--floater js-header__bubble" />
        <div className="header__bubble header__bubble--floater header__bubble--floater1 js-header__bubble" />

        <div className="header__fishschool">
          <Fish
            className="header__fishschool__fish header__fishschool__fish--1"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--2"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--3"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--4"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--5"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--6"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--7"
            title=""
            desc=""
          />
          <Fish
            className="header__fishschool__fish header__fishschool__fish--8"
            title=""
            desc=""
          />
        </div>

        <RocksBack
          className="header__rocks header__rocks--back"
          title=""
          desc=""
        />
        <RocksLeft
          className="header__rocks header__rocks--left"
          title=""
          desc=""
        />
        <RocksRight
          className="header__rocks header__rocks--right"
          title=""
          desc=""
        />

        <div className="header__logo">
          <div className="header__bubble header__bubble--left">
            <Content
              className="header__bubble__icon header__bubble__icon--content"
              title="Content"
              desc="Symbolizing content concerns"
            />
          </div>

          <div className="header__bubble header__bubble--right">
            <Code
              className="header__bubble__icon header__bubble__icon--code"
              title="Code"
              desc="Symbolizing code concerns"
            />
          </div>

          <Logo
            className="header__logo__logo"
            title="Cuttlebelle logo"
            desc="A cute, green cuttlefish with a big smile"
          />
          <Cuttlebelle
            className="header__logo__cuttlebelle"
            title="Cuttlebelle"
            desc="The word Cuttlebelle"
          />

          <div className="header__logo__children">{children}</div>
        </div>
      </header>
    );
  }
}

export default Header;

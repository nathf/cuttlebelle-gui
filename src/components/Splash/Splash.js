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

import './Splash.css';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Splash extends React.Component {
  componentDidMount() {
    var bubbles = document.querySelectorAll('.js-splash__bubble');
    var x =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.getElementsByTagName('body')[0].clientWidth;
    var bubblePlay = new TimelineMax();

    // iterate over all .js-splash__bubble DOM nodes
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
      <header className="splash splash--large">
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater2 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater2 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater3 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater1 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater2 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater3 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater1 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater2 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater3 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater3 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater1 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater2 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater3 splash__bubble--floater1 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater2 js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater js-splash__bubble" />
        <div className="splash__bubble splash__bubble--floater splash__bubble--floater1 js-splash__bubble" />

        <div className="splash__fishschool">
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--1"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--2"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--3"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--4"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--5"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--6"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--7"
            title=""
            desc=""
          />
          <Fish
            className="splash__fishschool__fish splash__fishschool__fish--8"
            title=""
            desc=""
          />
        </div>

        <RocksBack
          className="splash__rocks splash__rocks--back"
          title=""
          desc=""
        />
        <RocksLeft
          className="splash__rocks splash__rocks--left"
          title=""
          desc=""
        />
        <RocksRight
          className="splash__rocks splash__rocks--right"
          title=""
          desc=""
        />

        <div className="splash__logo">
          <div className="splash__bubble splash__bubble--left">
            <Content
              className="splash__bubble__icon splash__bubble__icon--content"
              title="Content"
              desc="Symbolizing content concerns"
            />
          </div>

          <div className="splash__bubble splash__bubble--right">
            <Code
              className="splash__bubble__icon splash__bubble__icon--code"
              title="Code"
              desc="Symbolizing code concerns"
            />
          </div>

          <Logo
            className="splash__logo__logo"
            title="Cuttlebelle logo"
            desc="A cute, green cuttlefish with a big smile"
          />
          <Cuttlebelle
            className="splash__logo__cuttlebelle"
            title="Cuttlebelle"
            desc="The word Cuttlebelle"
          />

          <div className="splash__logo__children">{children}</div>
        </div>
      </header>
    );
  }
}

export default Splash;
